<template>
  <div id="app">
    <v-app-bar>
      <v-toolbar-title>SUKETTO</v-toolbar-title>
      <temprate v-if="!isAuthenticated">
        <router-link to="/login">ログイン</router-link>
        <router-link to="/register">登録</router-link>
      </temprate>
      <temprate v-if="isAuthenticated">
        <span @click="logout">ログアウト</span>
      </temprate>
    </v-app-bar>
    <p>{{ message }}</p>
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "Hello!"
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    isAuthenticated(){
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
