<template>
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
  top: 56px;
  width: 100%;
  margin: 0 auto;
}
</style>