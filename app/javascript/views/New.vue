<template>
  <v-card>
    <v-card-title class="text-h3">新規質問</v-card-title>
    <v-card-text>
      <v-form
        v-model="valid"
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
          :counter="50"
          required
        ></v-textarea>
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          @tags-changed="newTags => tags = newTags"
        />
        <v-btn  color="indigo darken-4" large block dark type="submit" @click="createQuestion">質問する</v-btn>
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
        v => v.length <= 50 || '50文字以内で入力してください',
      ],
      tag: '',
      tags: []
    }
  },
  methods: {
    createQuestion: function(){
      console.log(this.tag)
      console.log(this.tags)
      if (this.$refs.form.validate() === false){
        return
      }
      axios.post('/api/questions', { 
        question: {
           title: this.title, 
           body: this.body, 
           user_id: this.$store.state.currentUser.id,
           tag_list: this.tags
        }
      })
      .then( res => {
        alert('Question posted!')
        this.title = ''
        this.body = ''
        this.tags = []
        router.replace({ name: 'show', params: {id: res.data.id } })
      })
      .catch( e => {
        alert(e.message)
        console.log(e.message)
        console.log(this.$store.state.currentUser.id)
      })
    }
  }
}
</script>