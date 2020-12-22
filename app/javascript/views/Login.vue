<template>
  <v-card width="600px" class="mx-auto mt-10 card">
    <v-card-title>
      <h2 class="display-1">ログイン</h2>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field 
          prepend-icon="mdi-email"
          label="Email"
          type="email"
          v-model="email"
        />     
        <v-text-field 
          prepend-icon="mdi-lock"
          label="パスワード"
          v-model="password"
          v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPassword ? 'text' : 'password'" 
          @click:append="showPassword = !showPassword"
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
      email: '',
      password:'',
      showPassword: false
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
<style>
</style>