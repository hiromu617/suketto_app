<template>
  <v-app id="app">
    <Header></Header>
      <v-main class="pb-10 mb-10">
        <FlashMessage></FlashMessage>
        <v-container class="pb-10">
          <router-view>
          </router-view>
        </v-container>
      </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from './components/organisms/header.vue';
import Footer from './components/organisms/footer.vue';
import FlashMessage from './components/organisms/flashMessage.vue';

export default {
  components: {
    Header,
    Footer,
    FlashMessage
  },
}
</script>


