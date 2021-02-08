<template>
  <v-card>
    <v-card-title class="text-h3">新規質問</v-card-title>
    <v-card-text>
      <v-form
        v-model="valid"
        ref="form"
        
      >
        <v-text-field
          label="タイトル"
          v-model="title"
          type="text"
          :rules="titleRules"
          :counter="20"
          required
        />
        <v-textarea
          label="質問内容"
          type="text" 
          v-model="body"
          auto-grow
          filled
          :rules="bodyRules"
          :counter="200"
          required
        ></v-textarea>
        <!-- <vue-tags-input
          v-model="tag"
          :tags="tags"
          @tags-changed="newTags => tags = newTags"
        /> -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-file-input   
              @change="setVideo"
              type="file"
              label="動画"
              accept="video/*"
              v-bind="attrs"
              v-on="on"
              class="video-input"
            />
          </template>
          <span>10秒以内の動画を1つ添付することがができます</span>
        </v-tooltip>
        <v-btn  color="grey darken-4" class="mt-5" large block dark type="submit" @click="createQuestion">質問する</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  
</template>

<script>
import axios from '../plugins/axios';
import router from '../router/router';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data: function() {
    return {
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'この項目は必須です',
        v => v.length <= 20 || '20文字以内で入力してください',
      ],
      body: '',
      bodyRules: [
        v => !!v || 'この項目は必須です',
        v => v.length <= 200 || '200文字以内で入力してください',
      ],
      tag: '',
      tags: [],
      video: '',
      videoRules: [
        v => videoValid == false || '50文字以内で入力してください',
      ],
    }
  },
  methods: {
    setVideo: function(file){
      this.checkDuration(file)
      this.video = file;
      console.log(this.file)
    },
    checkDuration: function(file){
      const video = document.createElement('video');
      const fileURL = URL.createObjectURL(file);
      video.src = fileURL;
      video.ondurationchange = function() {
        if(parseInt(this.duration) > 10) {
          alert("動画の長さが10秒を超えています。");
          this.valid=false
        } 
        // else {
        //   alert(this.duration);
        // }
        URL.revokeObjectURL(this.src);
      };
    },
    createQuestion: async function(){
      // console.log(this.tag)
      // console.log(this.tags)
      if (this.$refs.form.validate() === false){
        this.$store.dispatch('showFlashMessage', {text: '正しく入力してください'});
        return
      }

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      var formData = new FormData();
      formData.append('title', this.title)
      formData.append('body', this.body)
      formData.append('user_id', this.$store.state.currentUser.id)
      // formData.append('tag_list', this.tags)
      formData.append('video', this.video)
      // console.log(this.video)
      console.log(formData)
      axios.post("/api/questions", formData, config)
      // axios.post('/api/questions', { 
      //   question: {
      //      title: this.title, 
      //      body: this.body, 
      //      user_id: this.$store.state.currentUser.id,
      //      tag_list: this.tags
      //   }
      // })
      .then( res => {
        // alert("question posted")
        // this.title = ''
        // this.body = ''
        // this.tags = []
        this.$store.dispatch('showFlashMessage', {text: '質問を投稿しました'})
      })
      .catch( e => {
        alert(e.message)
        this.$store.dispatch('showFlashMessage', {text: e});
      })
      router.push('/') 
    }
  }
}
</script>
<style scoped>
.video-input{
  height: 30px;
  margin-bottom: 55px;
}
</style>