<template>
  <v-card
  class="pa-10"
  style="text-align: center;"
  >
    <v-btn
      @click="LogIn"
      color=""
      text
      class="mb-5 login-btn"
      x-large
    >
    <!-- <img src="../../assets/btn_google_signin_light_normal_web.png" alt=""> -->
    </v-btn>
    <div style="font-size: 0.7rem;">
      <TermsOfService></TermsOfService>と
      <PrivacyPolicy></PrivacyPolicy>
      に同意した上でログインする
    </div>

    <!-- {{isAuth}}
    {{email}}
    {{name}}<br>
    {{currentUser}} -->
  </v-card>
</template>
<script>
import firebase from 'firebase'
import axios from '../../plugins/axios';
import TermsOfService from '../molecules/termsOfService';
import PrivacyPolicy from '..//molecules/privacyPolicy';

export default {
  data () {
    return {
      isAuth: false,
      email: "",
      name: "" 
    }
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => this.isAuth = !!user)
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  components: {
    TermsOfService,
    PrivacyPolicy
  },
  methods: {
    LogIn: async function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        // console.log(result)
        this.email = result.user.email
        this.name = result.user.displayName
      }).catch((error) => {
        console.log(error)
      });

      await axios.get("/api/user/", {
        params: {
          email: this.email
        }
      })
      .then( res => {
        // console.log(res.data)
        if(res.data == null){
          this.signUp()
        }
        this.$store.dispatch('fetchCurrentUser', res.data);
        this.$store.dispatch('showFlashMessage', {text: 'ログインしました'});
      })
      .catch( e => {
        console.log(e.message)
        this.$store.dispatch('showFlashMessage', {text: e.message, mode: "error"});
      }) 
        this.redirect()
    },
    redirect: function(){
      this.$router.go({path: this.$router.currentRoute.path, force: true});
    },
    signUp: async function(){
       var formData = new FormData();
      formData.append('name', this.name)
      formData.append('email', this.email)
      await axios.post("/api/users",formData)
      .then( res => {
        // console.log(res.data)
        this.$store.dispatch('fetchCurrentUser', res.data);
        this.$store.dispatch('showFlashMessage', {text: '新規登録しました'});
      })
      .catch( error =>{
        console.log(error.message);
        this.$store.dispatch('showFlashMessage', {text: '登録に失敗しました'});
      })
    },
    signOut: function () {
      firebase.auth().signOut()
      this.$store.state.currentUser = {};
      this.$store.dispatch('showFlashMessage', {text: "ログアウトしました"});
    }
  },
}
</script>

<style scoped>
.login-btn{
  padding: 0 95px!important;
  height: 44px!important;
  background-image: url("../../assets/btn_google_signin_light_normal_web.png");
}
</style>
