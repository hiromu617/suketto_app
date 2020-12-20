<template>
  <div>
    <h2>New</h2>
    <div>
      <div>
        <label for="title">タイトル</label>
        <input 
          type="text" 
          id="title" 
          v-model="title"
        >
      </div>
      <div>
        <label for="body">質問内容</label>
        <textarea 
          id="body" 
          cols="30" 
          rows="10" 
          v-model="body"
        ></textarea>
      </div>
      
        <v-button type="submit" @click="create">送信</v-button>
    </div>
  </div>
  
</template>

<script>
import axios from '../plugins/axios';
import router from '../router/router';

export default {
  data: function() {
    return {
      title: '',
      body: ''
    }
  },
  methods: {
    create: function(){
      axios.post('/api/questions', { 
        question: {
           title: this.title, 
           body: this.body, 
           user_id: 1
        }
      })
      .then( res => {
        alert('Question posted!')
        this.title = ''
        this.body = ''
        router.push({ name: 'show', params: {id: res.data.id } })
      })
      .catch( e => {
        console.log(e.message)
        console.log(this.$store.state.currentUser.id)
      })
    }
  }
}
</script>