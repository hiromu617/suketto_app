<template>
  <v-alert 
    type="success"
    color="blue lighten-1"
    v-if="text"
    transition="fade-transition"
    dismissible
    elevation="25"
    class="alert"
  >
      {{ $store.state.text }}
  </v-alert>
</template>
<script>
export default {
  computed: {
    text() {
      return this.$store.state.text;
    },
  },
}
</script>


<style scoped>
.alert{
  position: fixed;
  z-index: 999;
  bottom: 0px;
  margin-left: 30px;
}
</style>