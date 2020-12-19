<template>
  <div>
    <h2>登録</h2>
    <label for="name">ニックネーム：</label>
    <input 
      id="name"
      type="name"
      v-model="name"
    >
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
    <button @click="register">送信</button>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password:''
    };
  },
  methods: {
    register(){
      axios.post("/api/users", { user:  {name: this.name, email: this.email}})
      .then(
        this.$store.dispatch('register',{
          email: this.email,
          password: this.password
        })
      ).catch( error =>{
        alert(error.message);
      })
      alert("create acount!");

      axios.get("/api/user/", {
        params: {
          email: this.email
        }
      })
      .then( res => {
        this.$store.state.currentUser = res.data;
      })
      .catch( e => console.log(e) ) 
      
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
}
</script>