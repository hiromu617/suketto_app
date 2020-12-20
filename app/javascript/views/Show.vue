<template>
  <div>
    <h2>Show</h2>
    <h3>Question</h3>
    <div v-if="editFlg">
       <div>
        <label for="title">タイトル</label>
        <input 
          type="text" 
          id="title" 
          v-model="question.title"
        >
      </div>
      <div>
        <label for="body">質問内容</label>
        <textarea 
          id="body" 
          cols="30" 
          rows="10" 
          v-model="question.body"
        ></textarea>
      </div>
      <button @click="(editFlg = false)">戻る</button>
      <button @click="updateQuestion">更新</button>
    </div>
    <div v-else>
      <p>{{this.$route.params.id}}</p>
      <p>{{question.title}}</p>
      <p>{{question.body}}</p>
      <p>ユーザーid: {{question.user_id}}</p>
      <p>投稿者: {{question.user.name}}</p>
      <p>作成日: {{question.created_at}}</p>
      <p>更新日: {{question.updated_at}}</p>
      <button v-if="questioner" @click="(editFlg = true)">編集</button>
    </div>
    
    <p>{{questioner}}</p>
    <div v-if="questioner">
      <button @click="deleteQuestion">削除</button>
    </div>
  </div>
  
</template>

<script>
import axios from '../plugins/axios';
import router from '../router/router';

export default {
  data: function() {
    return {
      question: {},
      questioner: false,
      editFlg: false
    }
  },
  mounted: function () {
    this.getQuestion();
  },
  computed: {
  },
  methods: {
    getQuestion: function(){
      axios.get('/api/questions/'+ this.$route.params.id)
      .then( res => {
        this.question = res.data

        if(this.$store.state.currentUser.id === this.question.user_id){
          this.questioner = true
        }
      })
      .catch(e => console.log(e));
    },
    deleteQuestion: function(){
      if(!this.questioner){
        return
      }
      axios.delete('/api/questions/' + this.$route.params.id)
      .then( res => {
        alert('質問を削除しました')
        router.push('/')
      })
      .catch(e => console.log(e))
    },
    updateQuestion: function(){
      if(!this.questioner){
        return
      }
      axios.put('/api/questions/' + this.$route.params.id,{
        question: {
          title: this.question.title,
          body: this.question.body,
        }
      })
      .then( res => {
        this.editFlg = false
        alert('質問を更新しました')
      })
      .catch( e => console.log(e.message))
    }
  }
}
</script>