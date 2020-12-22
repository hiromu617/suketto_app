<template>
  <v-card width="600px" class="mx-auto mt-10 card">
    <v-card-title>
      <h2 class="display-1">登録</h2>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account-circle"
          type="text"
          label="ユーザー名"
          v-model="name"
        />
        <v-text-field
          prepend-icon="mdi-email"
          type="email"
          label="email"
          v-model="email"
        />
        <v-text-field 
          prepend-icon="mdi-lock"
          label="password"
          v-model="password"
          v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPassword ? 'text' : 'password'" 
          @click:append="showPassword = !showPassword"
        />
        <v-btn class="indigo darken-4" large dark @click="register">送信</v-btn>
      </v-form>
    </v-card-text>
    
  </v-card>
</template>

<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password:'',
      showPassword: false
    };
  },
  methods: {
    register(){
      this.$store.dispatch('register',{
        email: this.email,
        password: this.password
      })
      axios.post("/api/users", { user:  {name: this.name, email: this.email}})
      .then( res => {
        this.$store.state.currentUser = res.data;
      })
      .catch( error =>{
        alert(error.message);
      })
      alert("create acount!");
      
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
}
</script>