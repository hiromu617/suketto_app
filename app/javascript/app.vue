<template>
  <div id="app">
    <v-app-bar>
      <v-toolbar-title>SUKETTO</v-toolbar-title>
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
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
