<template>
  <v-row class="main-visual">
    <v-column class="main-message">
      <h1 class="chatch ">Solve your problem!</h1>
      <template v-if="!isAuthenticated">
        <p class="caption-message">SUKETTOはスケボーの悩みを解決するためのサービスです。ログインすると、質問や回答する事ができます。</p>
        <v-btn to="/login" class="botton mr-5" color="grey darken-4" dark x-large>Login</v-btn>
        <v-btn to="/register" class="botton" color="grey darken-4" dark x-large>Sign Up</v-btn>
      </template>
      <template v-else>
        <p class="caption-message">SUKETTOはスケボーの悩みを解決するためのサービスです。下のボタンから質問してみよう。</p>
        <v-btn to="/new" class="botton mr-5" color="grey darken-4" dark x-large>Post a question</v-btn>
      </template>
    </v-column>
    <v-column class="boy-image">
        <img src="../../assets/boy.jpg" alt="" class="image">
    </v-column>
  </v-row>
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
.main-visual{
  background-color: #fff;
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 40px 95px;
}
.main-message{
  width: calc(100% - 420px);
  box-sizing: border-box;
  padding-top: 50px;
  z-index: 1;
}
.image{
  max-width: 420px;
  height: auto;
}
.chatch{
  font-size: 2.7rem;
  font-weight: bold;
  font-family: Inter, system-ui, Arial, sans-serif;
  white-space: nowrap;
  color: #212121;
  opacity: 0.9;

}
.caption-message{
  padding-top: 17px;
  padding-bottom: 17px;
  font-size: 16px;
  text-align: left;
  color: #212121;
  opacity: 0.9;
}
@media (max-width: 800px){
  .main-visual{
    text-align: center;
    padding: 0;
  }
  .main-message{
    width: 100%;
    padding-top: 30px;
    padding-bottom: 5px;
  }
  .chatch{
    font-size: 2rem;
  }
  .image{
    width: 100%;
  }
  .boy-image{
    width: 100%;
  }
  .caption-message{
    text-align: center;
    padding: 20px;
  }
}
/* @media (max-width: 1000px){
  .main-visual{
    text-align: center;
  }
  .main-message{
    width: 100%;
    padding-bottom: 50px;
  }
  .boy-image{
    width: 100%;
  }
  .chatch{
    font-size: 5rem;
  }
  .caption-message{
    text-align: center;
    font-size: 2.4rem;
  }
  .v-btn{
    font-size: 3rem;
    padding: 40px!important;
  }
} */
</style>