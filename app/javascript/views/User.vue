<template>
<div>
  <v-expand-transition v-if="editFlg">
      <v-card  width="100%" class="pa-10" elevation="25">
         <v-form>
          <v-text-field
            label="ユーザー名"
            type="text"
            v-model="user.name"
          >
          </v-text-field>
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
    <v-row>
      <template v-if="user.avatar.url">
        <v-avatar size="128" class="my-5">
          <img :src="user.avatar.url" alt="">
        </v-avatar>
      </template>
      <template v-else>
          <v-avatar color="grey" size="128" class="my-5">
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </template>
    </v-row>
    <v-row v-if="!editFlg">
      <v-card-title class="text-h3">{{user.name}}</v-card-title>
      <v-card-text class="user-card">
      <p>
        質問数 {{user.questions.length}}<br>
        回答数 {{user.answers.length}}
      </p>
      <v-card-actions >
        <v-btn v-if="isCurrentUser" color="blue lighten-1" class="" dark @click="(editFlg = true)">編集</v-btn>
      </v-card-actions>
    </v-card-text> 
    </v-row>
    
  </v-card>  
</div>
  
</template>

<script>
import axios from '../plugins/axios';
import router from '../router/router';
import imageCompression from "browser-image-compression";

export default{
  data: function(){
    return{
      user: {},
      editFlg: false,
      isCurrentUser: false,
      avatar: ""
    }
  },
  created: function () {
    this.getData();
  },
  methods: {
    getData: async function(){
      await axios.get('/api/users/'+ this.$route.params.id)
      .then( res => {
        this.user = res.data
        console.log(res.data)
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
      console.log(compImage)
      console.log(file)
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
      if(this.avatar){
        formData.append('avatar', this.avatar)
      }
      axios.put('/api/users/' + this.$route.params.id,formData,config)
      .then( res => {
        console.log(res)
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
}
</style>