// もう使わない
<template>
  <v-card width="600px" class="mx-auto mt-10 card">
    <v-card-title>
      <h2 class="display-1">登録</h2>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          prepend-icon="mdi-account-circle"
          type="text"
          label="ユーザー名"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        />
        <v-file-input   
          @change="setImage"
          type="file"
          label="プロフィール画像"
          accept="image/*"
        />
        <v-text-field
          prepend-icon="mdi-email"
          type="email"
          label="email"
          v-model="email"
          :rules="emailRules"
          required
        />
        <v-text-field 
          prepend-icon="mdi-lock"
          label="password"
          v-model="password"
          v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPassword ? 'text' : 'password'" 
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
          required
        />
        <v-checkbox
          v-model="agreeStatement"
          dense
          color="info"
          class="mt-0 pt-0 caption"
          :rules="agreeStatementRules"
        >
          <template v-slot:label class="caption">
            <span style="font-size: 0.7rem;">
              <TermsOfService></TermsOfService>と
              <PrivacyPolicy></PrivacyPolicy>
              に同意する
            </span>
          </template>
        </v-checkbox>
        <v-btn 
          class="grey darken-4" 
          large dark 
          @click="register"
        >送信</v-btn>
        {{avatar}}
      </v-form>
    </v-card-text>
    
  </v-card>
</template>

<script>
import axios from '../plugins/axios';
import imageCompression from "browser-image-compression";
import TermsOfService from '../components/molecules/termsOfService';
import PrivacyPolicy from '../components/molecules/privacyPolicy';


export default {
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'この項目は必須です',
        v => v.length <= 10 || '10文字以内で入力してください',
      ],
      email: '',
      emailRules: [
        v => !!v || 'この項目は必須です',
        v => /.+@.+/.test(v) || 'フォーマットが正しくありません',
      ],
      password:'',
      passwordRules: [
        v => !!v || 'この項目は必須です',
        v => /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,20}$/.test(v) || '半角6~20文字英大文字・小文字・数字それぞれ１文字以上含む必要があります',
      ],
      showPassword: false,
      avatar: "",
      agreeStatement: false,
      agreeStatementRules: [
        v => !!v || '利用規約とプライバシーポリシーに同意してください',
      ],
    };
  },
  components: {
    TermsOfService,
    PrivacyPolicy
  },
  methods: {
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
    async register(){
      if (this.$refs.form.validate() === false){
        this.$store.dispatch('showFlashMessage', {text: '正しく入力してください'});
        return
      }
      this.$store.dispatch('register',{
        email: this.email,
        password: this.password
      })
      .catch(e=>{
        console.log(e)
        this.$store.dispatch('showFlashMessage', {text: '登録に失敗しました'});
        return;
      })
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      var formData = new FormData();
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('avatar', this.avatar)
      // await axios.post("/api/users", { user:  {name: this.name, email: this.email, avatar: this.avatar}})
      await axios.post("/api/users",formData,config)
      .then( res => {
        // console.log(res.data)
        this.$store.state.currentUser = res.data;
        this.$store.dispatch('showFlashMessage', {text: '新規登録しました'});
        this.name = "";
        this.email = "";
        this.password = "";
      })
      .catch( error =>{
        console.log(error.message);
        this.$store.dispatch('showFlashMessage', {text: '登録に失敗しました'});
      })
     
    }
  }
}
</script>
<style scoped>

</style>