<template>
  <v-app id="app">
      <v-app-bar 
        app
        color="indigo darken-4"
        dark
      >
        <v-toolbar-title>
          <router-link to="/" class="logo">SUKETTO🛹</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <temprate v-if="!isAuthenticated">
          <v-btn to="/login" color="indigo accent-4" width="100">ログイン</v-btn>
          <v-btn to="/register" color="indigo accent-4" width="100">登録</v-btn>
        </temprate>
        <temprate v-if="isAuthenticated">
          <span>{{ currentUser.name }}</span>
          <v-btn :to="{ name: 'new' }" color="indigo accent-4" width="100">質問する</v-btn>
          <v-btn @click="logout" color="indigo accent-4" width="100">ログアウト</v-btn>
        </temprate>
      </v-app-bar>
      <v-main>
        <v-container>
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
      message: "Hello!"
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
    }
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
  color: inherit;
  text-decoration: none;
}
</style>
