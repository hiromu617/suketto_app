<template>
  <v-app id="app">
      <v-app-bar 
        app
        color="indigo darken-4"
        dark
        height="100"
      >
        <v-toolbar-title>
          <router-link to="/" class="logo" >SUKETTO🛹</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <temprate v-if="!isAuthenticated">
          <v-btn to="/login" class="nav-item" color="indigo darken-4" width="100" flat>ログイン</v-btn>
          <v-btn to="/register"  class="nav-item" color="indigo darken-4" width="100" flat>新規登録</v-btn>
        </temprate>
        <temprate v-if="isAuthenticated">
          <span>{{ currentUser.name }}</span>
          <v-btn :to="{ name: 'new' }" class="nav-item" color="indigo darken-4" width="100">質問する</v-btn>
          <v-btn @click="logout" class="nav-item" color="indigo darken-4" width="100">ログアウト</v-btn>
        </temprate>
      </v-app-bar>
      <v-main>
        <v-container>
          {{mode}}
            <v-alert 
              type="success"
              color="blue"
              text
              dense
              v-if="text"
              transition="fade-transition"
            >
              {{ $store.state.text }}
            </v-alert>
            <v-alert 
              type="error"
              color="red"
              text
              dense
              v-if="alertMessage"
              transition="fade-transition"
            >
              {{ alertMessage }}
            </v-alert>
          <router-view>
          </router-view>
        </v-container>
      </v-main>
      <v-footer app>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    idToken() {
      return this.$store.getters.idToken;
    },
    isAuthenticated(){
      return this.$store.getters.idToken !== null;
    },
    text() {
      return this.$store.state.text;
    },
  },
  methods: {
    logout() {
      this.$store.state.currentUser = {};
      this.$store.dispatch('logout');
    },
  }
}
</script>

<style scoped>
#app{
  background-color: #FAFAFA;
}
p {
  font-size: 2em;
  text-align: center;
}
.logo{
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
}
@media (max-width: 1000px) {
  .v-app-bar{
    height: 100px;
  }
  .nav-item{
    font-size: 1.8rem;
    margin: 0 25px;
  }
}
</style>
