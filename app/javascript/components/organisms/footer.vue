<template>
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
        <a style="color: white; text-decoration: none;" href="https://forms.gle/VG1NxgWvA9gwTJGN6">お問い合わせ</a>
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
<style scoped>
.v-footer{
  margin-top: 100px;
}
</style>