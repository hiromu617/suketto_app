<template>
  <v-app id="app">
      <v-app-bar 
        app
        color="grey darken-4"
        dark
        class="nav-bar"
        height="100"
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
            <span class="currentuser-name">{{ currentUser.name }}</span>
            <v-divider vertical></v-divider>
            <v-btn :to="{ name: 'new' }" class="nav-item" text>質問する</v-btn>
            <v-divider vertical></v-divider>
            <v-btn @click="logout" class="nav-item" text>ログアウト</v-btn>
            </v-toolbar-items>
        </temprate>
        
      </v-app-bar>
      <v-main>
        <v-alert 
              type="success"
              color="blue"
              text
              dense
              v-if="text"
              transition="fade-transition"
              dismissible
              class="alert"
            >
              {{ $store.state.text }}
            </v-alert>
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
  font-size: 1.8rem;
}

@media (max-width: 1000px) {
  .nav-item{
    font-size: 2rem;
    margin: 0 20px;
  }
  .logo{
    font-size: 3rem;
  }
  .currentuser-name{
    font-size: 2rem;
  }
  .alert{
  }
}
</style>
