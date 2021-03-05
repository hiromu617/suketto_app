<template>
  <div class=""
  >
  <div class="main-image">
    <h1 class="head text-h3 font-weight-black">
      Let's Make Skatebording <br>More Fun!
    </h1>
    <v-card-text>
      <p class="description">SUKETTOはスケボーの悩みを解決するためのサービスです。自分がなかなか出来ずに悩んでいるトリックについて、気になるスケートギアの使用感など気軽に質問してみましょう。</p>
    </v-card-text>
  </div>
    <v-card-subtitle class="sub-title text-h3 font-weight-black mb-5">Why SUKETTO?</v-card-subtitle>
    <v-card-text>
      <p class="mb-10">現代では、YouTube上にスケボーのトリックのHowTo動画が溢れており、誰でもスケボーが気軽に楽しめる時代です。しかし時には、そのトリックを習得したての初心者のアドバイスが役に立つこともあるでしょう。より気軽にスケボーを教え合える場を作りたい。そんな思いからSUKETTOは生まれました。
      </p>
    </v-card-text>
    <v-card-subtitle class="sub-title text-h3 font-weight-black mb-5">How To Use</v-card-subtitle>
    <v-card-text>
      <p>準備中</p>
    </v-card-text>
    <v-card
    outlined
    class="pb-10 my-10"
    color="grey lighten-4"
    style="text-align: center;"
    >
      <h1 class="head text-h4 font-weight-bold pa-10">
        JOIN SUKETTO
      </h1>
      <template v-if="!isAuthenticated">
        <v-btn to="/register" class="botton" color="grey darken-4" dark x-large>今すぐはじめる</v-btn>
      </template>
      <template v-else>
        <v-btn to="/new" class="botton mr-5" color="grey darken-4" dark x-large>Post a question</v-btn>
      </template>
    </v-card>
  </div>
</template>
<script>
export default {
  computed: {
    isAuthenticated(){
      return this.$store.getters.idToken !== null;
    },
  },
}
</script>
<style scoped>
.head{
  text-align: center;
  font-family: Inter, system-ui, Arial, sans-serif!important;
}
.main-image{
  padding: 160px 0 180px;
}
.description{
  padding: 30px 80px;
  text-align: center;
}
.sub-title{
  font-family: Inter, system-ui, Arial, sans-serif!important;
}
@media (max-width: 800px){
  .head{
    font-size: 2rem;
  }
  .main-image{
    padding: 80px 0 100px;
  }
  .description{
    padding: 30px 0px;
  }
}
</style>