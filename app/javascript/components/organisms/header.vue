<template>
      <v-app-bar 
        app
        color="grey darken-4"
        dark
        class="nav-bar"
      >
        <v-toolbar-title>
          <router-link to="/" class="logo" >SUKETTO🛹</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <temprate v-if="!isAuth">
          <v-toolbar-items>
            <v-dialog
              v-model="loginDialogFlug"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="nav-item" 
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                ログイン
                </v-btn>
              </template>

                <v-card>
                  <LoginDialog></LoginDialog>
                </v-card>
            </v-dialog>
            <!-- <v-btn to="/login" class="nav-item" text>ログイン</v-btn> -->
            <!-- <v-divider vertical></v-divider> -->
            <!-- <v-btn to="/register"  class="nav-item" text>新規登録</v-btn> -->
          </v-toolbar-items>
        </temprate>

        <temprate v-if="isAuth">
          <v-toolbar-items>
            <v-menu 
              offset-y
              transition="slide-y-transition"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
              <v-btn 
                class="currentuser-name" 
                text
                v-bind="attrs"
                v-on="on"
              >
                <template v-if="currentUser.avatar.url">
                  <v-avatar class="mr-2" size="40">
                    <img :src="currentUser.avatar.url" alt="">
                  </v-avatar>
                </template>
                <template v-else>
                  <v-avatar color="grey" class="mr-2" size="40">
                    <v-icon dark color="white">
                      mdi-account-circle
                    </v-icon>
                  </v-avatar>
                </template>
              </v-btn>
              </template>
              <v-list>
                <v-list-item :to="{ name: 'user', params: {id: currentUser.id } }" >プロフィール</v-list-item>
                <v-list-item :to="{ name: 'new' }" >質問する</v-list-item>
                <v-list-item @click="signOut">ログアウト</v-list-item>
              </v-list>
            </v-menu>
            </v-toolbar-items>
        </temprate>
      </v-app-bar>
</template>

<script>
import firebase from 'firebase'
import LoginDialog from './googleLogin'
export default {
  data () {
    return {
      isAuth: false,
      loginDialogFlug: false
    }
  },
  components: {
    LoginDialog
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    // idToken() {
    //   return this.$store.getters.idToken;
    // },
    // isAuthenticated(){
    //   // return this.$store.getters.idToken !== null;
    //   return this.$store.state.currentUser.name !== "";
    // },
    text() {
      return this.$store.state.text;
    },
  },
  created: function () {
    if(this.$store.state.currentUser.name == null){
      this.signOutWithoutMessage()
    }
    firebase.auth().onAuthStateChanged((user) => this.isAuth = !!user)
  },
  methods: {
    // logout() {
    //   this.$store.state.currentUser = {};
    //   this.$store.dispatch('logout');
    //   this.$store.dispatch('showFlashMessage', {text: 'ログアウトしました'});
    // },
    signOut: function () {
      firebase.auth().signOut()
      this.$store.state.currentUser = {};
      this.$store.dispatch('showFlashMessage', {text: "ログアウトしました"});
    },
    signOutWithoutMessage: function(){
      firebase.auth().signOut()
      this.$store.state.currentUser = {};
    }
  }
}
</script>


<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
.logo{
  color: white;
  text-decoration: none;
}
.nav-item{
  margin: auto 0;
}
</style>