<template>
  <div>
    <h2>ログイン</h2>
    <label for="email">Email：</label>
    <input 
      id="email"
      type="email"
      v-model="email"
    >
    <br><br>
    <label for="password">パスワード：</label>
    <input 
      id="password"
      type="password"
      v-model="password"
    >
    <br><br>
    <button @click="login">送信</button>
    <h2>{{ currentUser }}</h2>
  </div>
</template>
<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      email: '',
      password:''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    // change() {
    //   this.$store.state.currentUser = "changed";
    // },
    login(){
      axios.get("/api/user/", {
        params: {
          email: this.email
        }
      })
      .then( res => {
        console.log(res.data)
        this.$store.state.currentUser = res.data;
      })
      .catch( e => console.log(e) ) 

      this.$store.dispatch('login',{
        email: this.email,
        password: this.password
      })
      this.email = "";
      this.password = "";
    }
  }
}
</script>