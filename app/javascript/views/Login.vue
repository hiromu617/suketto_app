<template>
  <v-card class="mx-auto mt-10 card">
    <v-card-title>
      <h2 class="display-1 login-head">ログイン</h2>
    </v-card-title>
    <v-card-text>
      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <v-text-field 
          prepend-icon="mdi-email"
          label="Email"
          type="email"
          v-model="email"
          :rules="emailRules"
          required
        />     
        <v-text-field 
          prepend-icon="mdi-lock"
          label="パスワード"
          v-model="password"
          v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPassword ? 'text' : 'password'" 
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
          required
         />
          <v-btn color="indigo darken-4" large class="" dark @click="login">送信</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'この項目を入力してください',
        v => /.+@.+/.test(v) || 'フォーマットが正しくありません',
      ],
      password:'',
      passwordRules: [
        v => !!v || 'この項目を入力してください',
      ],
      showPassword: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    async login(){
      if (this.$refs.form.validate() === false){
        this.$store.dispatch('showFlashMessage', {text: '正しく入力してください', mode: "error"});
        return
      }

      this.$store.dispatch('login',{
        email: this.email,
        password: this.password
      })  
      
      
      await axios.get("/api/user/", {
        params: {
          email: this.email
        }
      })
      .then( res => {
        console.log(res.data)
        if(!res.data){
          this.$store.dispatch('showFlashMessage', {text: 'ログインに失敗しました', mode: "error"});
          this.$store.dispatch('logout')
          return
        }
        this.$store.state.currentUser = res.data;
        this.$refs.form.reset()
      })
      .catch( e => {
        console.log(e.message)
      }) 
      // this.email = "";
      // this.password = "";
    }
  }
}
</script>
<style scoped>
.card{
      width: 600px;
}
@media (max-width: 1000px) {
  .card{
    width: 100%;
    padding: 50px;
  }
  .login-head{
    font-size: 4rem!important;
    margin-bottom: 20px;
  }
  .v-input{
    margin-bottom: 20px;
  }
}
</style>