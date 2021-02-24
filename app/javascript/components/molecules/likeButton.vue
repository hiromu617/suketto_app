<template>
   <div>
    <div v-if="isLiked" @click="deleteLike()">
      <v-btn
        class="ma-2"
        text
        icon
        color="blue lighten-2"
      >
        <v-icon class="mr-1">mdi-thumb-up</v-icon>
        {{answer.likes.length}}
      </v-btn>
    </div>
    <div v-else @click="registerLike(answer.id)">
      <v-btn
        class="ma-2"
        text
        icon
        color=""
      >
        <v-icon class="mr-1">mdi-thumb-up</v-icon>
        {{answer.likes.length}}
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from '../../plugins/axios';

export default {
  props: ['answer'],
  data: function() {
    return {
      like_id: "",
    }
  },
  
  computed: {
    currentUserId(){
      return this.$store.state.currentUser.id
    },
    isLiked(){
      let likes = this.answer.likes
      let currentUserId = this.$store.state.currentUser.id

      for(let i = 0; i < likes.length; i++){
        if(likes[i].user_id === currentUserId){
          this.like_id = likes[i].id
          return true
        }
      }
      return false
    }
  },
  methods: {
    registerLike: async function(answer_id){
      if(!this.currentUserId){
        this.$store.dispatch('showFlashMessage', {text: 'ログインしてください'});
        return;
      }
      
      await axios.post('/api/likes/',{
        like: {
          answer_id: answer_id,
          user_id: this.$store.state.currentUser.id
        }
      })
      .catch(e => alert(e))
    },
    deleteLike: async function(){
      await axios.delete('/api/likes/' + this.like_id)
      .catch(e => console.log(e.message))
    }
  }
}
</script>


<style scoped>

</style>