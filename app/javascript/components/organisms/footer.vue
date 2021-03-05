<template>
  <v-footer 
        app
        dark
        paddless
        absolute
      >
      <v-row justify="center" no-gutters>
        <v-col
          class=" pb-2 text-center white--text caption"
          cols="12"
          dark
        >
        <v-btn :to="{ name: 'about' }" >SUKETTOについて</v-btn>
        <TermsOfService></TermsOfService>
        <PrivacyPolicy></PrivacyPolicy>
        <a target="_blank" rel="noopener noreferrer"
          style="color: white; text-decoration: none;" 
          href="https://forms.gle/VG1NxgWvA9gwTJGN6"
        >お問い合わせ</a>
        </v-col>
        <v-col
          class=" py-2 text-center white--text"
          cols="12"
          dark
        >
          {{ new Date().getFullYear() }} — <strong>SUKETTO</strong>
        </v-col>
      </v-row>
  </v-footer>
</template>
<script>
import TermsOfService from '../molecules/termsOfService';
import PrivacyPolicy from '../molecules/privacyPolicy';

export default {
  components: {
    TermsOfService,
    PrivacyPolicy
  }
}
</script>
<style scoped>
.v-footer{
  margin-top: 200px!important;
}
</style>