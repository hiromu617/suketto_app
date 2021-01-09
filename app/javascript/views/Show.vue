<template>
  <div>
    <v-card v-if="editFlg">
      <v-card-text>
        <v-form>
          <v-text-field
            label="タイトル"
            type="text" 
            v-model="question.title"
          />
          <v-textarea
            label="質問内容"
            v-model="question.body"
            counter
            auto-grow
          />
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
          />
        </v-form>
        <v-btn  color="indigo lighten-4" class="mr-3" @click="(editFlg = false)">戻る</v-btn>
        <v-btn  color="blue lighten-1" dark @click="updateQuestion">更新</v-btn>
      </v-card-text>
     
    </v-card>
    <v-card v-else>
      <v-card-title class="text-h3">{{question.title}}</v-card-title>
      <v-card-text>
        <div v-if="question.best_answer_id">解決済み</div>
        <p>{{answers.length}}件の回答</p>
        <div v-for="tag in question.tags" :key="tag.id">
            <router-link :to="{ name: 'tag',params: {id: tag.id} }">{{tag.name}}</router-link>
        </div>
        <p class="body-1">{{question.body}}</p>
        <p class="caption">
          投稿者: {{question.user.name}}<br>
          作成日: {{question.created_at}}<br>
          更新日: {{question.updated_at}}<br>
        </p>
        <div v-if="questioner">
          <v-btn  color="blue lighten-1" class="mr-3" dark @click="(editFlg = true)">編集</v-btn>
          <v-btn  color="red lighten-1" dark @click="deleteQuestion">削除</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <div
      v-for="answer in answers" 
      v-bind:key="answer.id"
    >
      <div v-if="question.best_answer_id === answer.id">
        <h3 class="text-h4">✨👑BEST ANSWER👑✨</h3>
        <v-card 
        class="card"
        color="yellow lighten-5"
        >
        <v-card-text>
          <p class="body-1">{{answer.body}}</p>
          <p class="caption">
            {{answer.user.name}}<br>
            {{answer.created_at}}
          </p>
        <div v-if="questioner && !question.best_answer_id">
          <v-btn color="blue lighten-1" dark @click="createBA(answer.id)">ベストアンサーにする</v-btn>
        </div>
        <div v-if="currentUserId === answer.user_id">
          <v-btn color="red lighten-1" dark @click="deleteAnswer(answer.id)">削除</v-btn>
        </div>
        </v-card-text>
      </v-card>
      </div>
      <div v-else>
        <div v-if="question.best_answer_id">
          <h3>その他の回答</h3>
        </div>
        <v-card 
          class="card"
        >
          <v-card-text>
            
            <p class="body-1">{{answer.body}}</p>
            <p class="caption">
              {{answer.user.name}}<br>
              {{answer.created_at}}
            </p>
          <div v-if="questioner && !question.best_answer_id">
            <v-btn color="blue lighten-1" dark @click="createBA(answer.id)">ベストアンサーにする</v-btn>
          </div>
          <div v-if="currentUserId === answer.user_id">
            <v-btn color="red lighten-1" dark @click="deleteAnswer(answer.id)">削除</v-btn>
          </div>
          </v-card-text>
        </v-card>
      </div>
      
    </div>
      
      <v-card v-if="!questioner && !question.best_answer_id">
        <v-form>
          <v-card-text>
            <v-textarea
              label="あなたの回答"
              v-model="answerBody"
              background-color="indigo lighten-5"
              counter
              auto-grow
              filled
            ></v-textarea>
            <v-btn  color="indigo darken-4" large dark block @click="createAnswer">回答する</v-btn>
          </v-card-text>
        </v-form>
      </v-card>
  </div>
  
</template>

<script>
import axios from '../plugins/axios';
import router from '../router/router';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  // directives: {
  //   twemoji: {
  //     inserted(el) {
  //       el.innerHTML = twemoji.parse(el.innerHTML)
  //     }
  //   }
  // },
  components: {
    VueTagsInput,
  },
  data: function() {
    return {
      question: {},
      answers: [],
      tag: '',
      tags: [],
      questioner: false,
      editFlg: false,
      answerBody: ''
    }
  },
  created: function () {
    this.getData();
  },
  // beforeUpdate: function(){
  //   this.getData();
  // },
  computed: {
    currentUserId(){
      return this.$store.state.currentUser.id
    }
  },
  methods: {
    getData: async function(){
      await axios.get('/api/questions/'+ this.$route.params.id)
      .then( res => {
        this.question = res.data
        console.log(res.data)
        for(let i = 0; i < res.data.answers.length; i++){
          this.answers.push(res.data.answers[i]);
        }
        if(this.$store.state.currentUser.id === this.question.user_id){
          this.questioner = true
        }
      })
      .catch(e => console.log(e));
    },
    deleteQuestion: async function(){
      if(!this.questioner){
        return
      }
      await axios.delete('/api/questions/' + this.$route.params.id)
      .then( res => {
        this.$store.dispatch('showFlashMessage', {text: '質問を削除しました'});
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
          tag_list: this.tags
        }
      })
      .then( res => {
        this.editFlg = false
        this.$store.dispatch('showFlashMessage', {text: '質問を更新しました'});

      })
      .catch( e => console.log(e.message))
      this.question = {}
      this.answers=[]
      this.getData()
    },
    createAnswer: function(){
      if(!this.currentUserId){
        this.$store.dispatch('showFlashMessage', {text: 'ログインしてください'});
        return;
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
        this.$store.dispatch('showFlashMessage', {text: '質問に回答しました'});
      })
      .catch(e => alert(e))

      this.answerBody = ''
    },
    deleteAnswer: function(answer_id) {
      axios.delete('/api/answers/' + answer_id)
      .then(res => {
        this.$store.dispatch('showFlashMessage', {text: '回答を削除しました'});
      })
      .catch(e => console.log(e.message))
      this.answers=[]
      this.question = {}
      this.getData()
    },
    createBA: function(answer_id){
      axios.put('/api/questions/' + this.$route.params.id,{
        question: {
          best_answer_id: answer_id
        }
      })
      .then( res => {
        this.$store.dispatch('showFlashMessage', {text: 'ベストアンサーを決定しました'});
      })
      .catch( e => console.log(e.message))
    }
  }
}
</script>
<style>
.v-card{
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>