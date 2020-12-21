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
    <v-card v-else>
      <p>{{this.$route.params.id}}</p>
      <v-card-title>{{question.title}}</v-card-title>
      <v-card-text>{{question.body}}</v-card-text>
      <p>ユーザーid: {{question.user_id}}</p>
      <p>投稿者: {{question.user.name}}</p>
      <p>作成日: {{question.created_at}}</p>
      <p>更新日: {{question.updated_at}}</p>
      <button v-if="questioner" @click="(editFlg = true)">編集</button>
    </v-card>
    
    <p>{{questioner}}</p>
    <div v-if="questioner">
      <button @click="deleteQuestion">削除</button>
    </div>

    <h3>Answers</h3>
      <v-card 
        v-for="answer in answers" 
        v-bind:key="answer.id"
        class="card"
      >
        <v-card-text>{{answer.id}}</v-card-text>
        <div v-if="currentUserId === answer.user_id">
          <button @click="deleteAnswer(answer.id)">削除</button>
        </div>
        <v-card-text>{{answer.body}}</v-card-text>
        <v-card-text>{{answer.user.name}}</v-card-text>
        <v-card-text>{{answer.created_at}}</v-card-text>
      </v-card>
      <div v-if="!questioner ">
        <label for="answerBody">あなたの回答</label>
        <textarea 
          id="answerBody" 
          cols="30" 
          rows="10"
          v-model="answerBody"
        ></textarea>
        <button @click="createAnswer">回答する</button>
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
      answers: [],
      questioner: false,
      editFlg: false,
      answerBody: ''
    }
  },
  mounted: function () {
    this.getData();
  },
  computed: {
    currentUserId(){
      return this.$store.state.currentUser.id
    }
  },
  methods: {
    getData: function(){
      axios.get('/api/questions/'+ this.$route.params.id)
      .then( res => {
        this.question = res.data
        for(let i = 0; i < res.data.answers.length; i++){
          this.answers.push(res.data.answers[i]);
        }
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
    },
    createAnswer: function(){
      if(!this.currentUserId){
        alert('ログインして下さい！')
      }
      console.log(this.currentUserId)
      axios.post('/api/answers/',{
        answer: {
          body: this.answerBody,
          question_id: this.question.id,
          user_id: this.$store.state.currentUser.id
        }
      })
      .then( res => {
        this.answers.push(res.data);
        console.log(res)
        alert('回答しました')
      })
      .catch(e => alert(e))

      this.answerBody = ''
    },
    deleteAnswer: function(answer_id) {
      axios.delete('/api/answers/' + answer_id)
      .then(res => {
        alert('投稿を削除しました')
        console.log(this.answers)
      })
      .catch(e => console.log(e.message))
    }
  }
}
</script>