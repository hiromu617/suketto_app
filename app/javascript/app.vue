<template>
  <v-app id="app">
      <v-app-bar 
        app
        color="grey darken-4"
        dark
        class="nav-bar"
      >
        <v-toolbar-title>
          <router-link to="/" class="logo" >SUKETTO🛹</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <temprate v-if="!isAuthenticated">
          <v-toolbar-items>
            <v-btn to="/login" class="nav-item" text>ログイン</v-btn>
            <v-divider vertical></v-divider>
            <v-btn to="/register"  class="nav-item" text>新規登録</v-btn>
          </v-toolbar-items>
        </temprate>

        <temprate v-if="isAuthenticated">
          <v-toolbar-items>
            <template v-if="currentUser.avatar.url">
              <v-avatar class="mr-2">
                <img :src="currentUser.avatar.url" alt="">
              </v-avatar>
            </template>
            <span class="currentuser-name">{{ currentUser.name }}</span>
            <v-divider vertical></v-divider>
            <v-btn :to="{ name: 'new' }" class="nav-item" text>質問する</v-btn>
            <v-divider vertical></v-divider>
            <v-btn @click="logout" class="nav-item" text>ログアウト</v-btn>
            </v-toolbar-items>
        </temprate>
      </v-app-bar>
      
      <v-main class="pb-10 mb-10">
        <v-alert 
              type="success"
              color="blue"
              v-if="text"
              transition="fade-transition"
              dismissible
              elevation="25"
              class="alert"
            >
              {{ $store.state.text }}
          </v-alert>
        <v-container>
          <router-view>
          </router-view>
        </v-container>
      </v-main>
      <v-footer 
        app
        dark
        paddless
        absolute
      >
      <v-row justify="center" no-gutters>
        <v-col
          class=" py-2 text-center white--text"
          cols="12"
          dark
        >
          {{ new Date().getFullYear() }} — <strong>SUKETTO</strong>
        </v-col>
      </v-row>
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
      this.$store.dispatch('showFlashMessage', {text: 'ログアウトしました'});
    },
  }
}
</script>

<style scoped>
#app{
}
p {
  font-size: 2em;
  text-align: center;
}
.logo{
  color: white;
  text-decoration: none;
}
.alert{
  position: fixed;
  z-index: 100;
  top: 65px;
  width: 100%;
  margin: 0 auto;
}
.v-footer{
  margin-top: 100px;
}
</style>
