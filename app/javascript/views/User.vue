<template>
  <div>
  <v-expand-transition v-if="editFlg">
      <v-card  width="100%" class="pa-10" elevation="25">
         <v-form>
          <v-text-field
            label="ユーザー名"
            type="text"
            v-model="user.name"
            counter=10
          >
          </v-text-field>
          <v-textarea
            label="プロフィール"
            type="text"
            v-model="user.profile"
            counter=100
          >
          </v-textarea>
          <v-file-input 
            @change="setImage"
            type="file"
            label="プロフィール画像"
            accept="image/*"
          />
        </v-form>
        <v-card-actions>
        <v-btn  color="blue lighten-1" class="" dark @click="(editFlg = false)">戻る</v-btn>
        <v-btn  color="blue lighten-1" class="" dark @click="userUpdate">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  <v-card outlined class="user-card d-flex pa-10" v-else>
    <div class="avatar-wrap">
      <template v-if="user.avatar.url">
        <v-avatar size="120" class="my-5">
          <img :src="user.avatar.url" alt="">
        </v-avatar>
      </template>
      <template v-else>
          <v-avatar color="grey" size="120" class="my-5">
          <v-icon dark color="white">
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </template>
    </div>
    <div
      class="profile-wrap"
      v-if="!editFlg"
    >
      <div class="d-flex profile-header">
        <v-card-title class="user-name text-h4 font-weight-bold">{{user.name}}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-actions >
          <v-btn v-if="isCurrentUser" color="black" outlined small class="" @click="(editFlg = true)">
            <v-icon dark x-small left>
              mdi-wrench
            </v-icon>プロフィールを編集する
        </v-btn>
        </v-card-actions>
      </div>
      <v-card-text class="user-card">
        <p class="subtitle-1">{{user.profile}}</p>
      <p class="subtitle-2">
        質問数 <span class="subtitle-1 font-weight-medium">{{user.questions.length}}</span>
        回答数 <span class="subtitle-1 font-weight-medium">{{user.answers.length}}</span>
      </p>
      
    </v-card-text> 
    </div>
  </v-card> 
  <h2 class="my-5">Questions</h2>
  <question-card :questions="questions"></question-card>
</div>
</template>

<script>
import axios from '../plugins/axios';
import router from '../router/router';
import QuestionCard from '../components/organisms/questionCard.vue';
import imageCompression from "browser-image-compression"

export default {
    data: function() {
    return {
      user: {},
      editFlg: false,
      isCurrentUser: false,
      avatar: "",
      questions: []
    }
  },
  components:{
    QuestionCard,
  },
  created: function () {
    this.getData();
  },
  methods: {
    getData: async function(){
      await axios.get('/api/users/'+ this.$route.params.id)
      .then( res => {
        this.user = res.data
        this.questions = res.data.questions
        // console.log(res.data)
      })
      .catch(e => console.log(e));
      if(this.$store.state.currentUser.id === this.user.id){
        this.isCurrentUser = true
      }
    },
    async getCompressImageFileAsync(file) {
    const options = {
      maxSizeMB: 1, // 最大ファイルサイズ
      maxWidthOrHeight: 800 // 最大画像幅もしくは高さ
    };
    try {
      // 圧縮画像の生成
      return await imageCompression(file, options);
    } catch (error) {
      console.error("getCompressImageFileAsync is error", error);
      throw error;
    }
  },
    async setImage(file){
      const compImage = await this.getCompressImageFileAsync(file);
      // console.log(compImage)
      // console.log(file)
      this.avatar = compImage;
    },
    userUpdate: async function(){
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      var formData = new FormData();
      formData.append('name', this.user.name)
      formData.append('profile', this.user.profile)
      if(this.avatar){
        formData.append('avatar', this.avatar)
      }
      axios.put('/api/users/' + this.$route.params.id,formData,config)
      .then( res => {
        // console.log(res)
        this.$store.state.currentUser = {}
        this.$store.state.currentUser = res.data
        this.editFlg = false
        this.$store.dispatch('showFlashMessage', {text: 'ユーザーを更新しました'});
        router.push('/')
      })
      .catch( e => {
        console.log(e)
        this.$store.dispatch('showFlashMessage', {text: e});
      })
    }
  }
}
</script>
<style scoped>
.user-card{
  margin: 0 auto;
  flex-wrap: wrap;
}
.avatar{
  width: 100%;
}
.avatar-wrap{
  width: 30%;
  text-align: center;
}
.profile-wrap{
  width: 70%;
}
@media (max-width: 767px) {
  .avatar-wrap{
    width: 100%;
    text-align: left;
  }
  .profile-wrap{
    width: 100%;
  }
  .user-name{
    width: 100%;
  }
  .profile-header{
    flex-wrap: wrap;
  }
}
</style>