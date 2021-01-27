<template>
  <div>
    <v-card v-if="editFlg" outlined>
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
    <v-card v-else outlined>
      <v-card-text>
        <div v-if="question.best_answer_id">
          <v-chip
            class="question-status"
            color="red lighten-1"
            text-color="white"
          >
          解決済み</v-chip>
        </div>
        <div v-else>
          <v-chip
            class="question-status"
          >
          未解決</v-chip>
        </div>
      <v-card-title class="">{{question.title}}</v-card-title>
        <div v-for="tag in question.tags" :key="tag.id">
          <v-chip
            link
            label
            color="indigo"
            class="question-tag"
            outlined
            :to="{ name: 'tag',params: {id: tag.id} }"
          >
          <v-icon left>mdi-label</v-icon>
            {{tag.name}}
          </v-chip>
        </div>
        <p>{{answers.length}}件の回答</p>
        <p class="question-body">{{question.body}}</p>
        <p class="question-info">
          <v-btn 
            class="question-user" 
            :to="{ name: 'user', params: {id: question.user.id } }" 
            text
            link
            style="text-transform: none"
          >
            <template v-if="question.user.avatar.url">
              <v-avatar size="40" class="mr-2">
                <img :src="question.user.avatar.url" alt="">
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar color="grey" size="35">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{question.user.name}}
          </v-btn> 
          <br>
          <v-icon>
              mdi-calendar
          </v-icon>
          {{question.created_at | newDate}}<br>
          <template v-if="question.created_at !== question.updated_at">
            <v-icon>
              mdi-update
            </v-icon>
            {{question.updated_at | newDate}}<br>
          </template>
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
        <h3 class="answer-head">✨👑BEST ANSWER👑✨</h3>
        <v-card 
        class="card"
        color="yellow lighten-5"
        outlined
        >
        <v-card-text>
          <p class="answer-body">{{answer.body}}</p>
          <p class="answer-info">
            <v-btn 
              class="question-user" 
              :to="{ name: 'user', params: {id: answer.user.id } }" 
              text
              link
              style="text-transform: none"
            >
            <template v-if="answer.user.avatar.url">
              <v-avatar size="35" class="mr-2">
                <img :src="answer.user.avatar.url" alt="">
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar color="grey" size="35" class="mr-2">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{answer.user.name}}
          </v-btn> 
           <br>
            {{answer.created_at | newDate}}
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
          <h3 class="answer-head">その他の回答</h3>
        </div>
        <v-card 
        class="card"
        outlined
        >
        <v-card-text>
          <p class="answer-body">{{answer.body}}</p>
          <p class="answer-info">
            <v-btn 
              class="question-user" 
              :to="{ name: 'user', params: {id: answer.user.id } }" 
              text
              link
              style="text-transform: none"
            >
            <template v-if="answer.user.avatar.url">
              <v-avatar size="35" class="mr-2">
                <img :src="answer.user.avatar.url" alt="">
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar color="grey" size="35" class="mr-2">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{answer.user.name}}
          </v-btn> 
           <br>
            {{answer.created_at | newDate}}
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
      
      <v-card v-if="!questioner && !question.best_answer_id" outlined>
        <v-form>
          <v-card-text>
            <v-textarea
              label="あなたの回答"
              v-model="answerBody"
              background-color="grey lighten-3"
              counter
              auto-grow
              filled
            ></v-textarea>
            <v-btn  color="grey darken-4" large dark block @click="createAnswer">回答する</v-btn>
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
  filters: {
    newDate: function(val){
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})([\w|:|.|+]*)/, "$1年$2月$3日")
    }
  },
  methods: {
    getData: async function(){
      await axios.get('/api/questions/'+ this.$route.params.id)
      .then( res => {
        this.question = res.data
        // console.log(res.data)
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
      // console.log(this.currentUserId)
      axios.post('/api/answers/',{
        answer: {
          body: this.answerBody,
          question_id: this.question.id,
          user_id: this.$store.state.currentUser.id
        }
      })
      .then( res => {
        this.answers.push(res.data);
        // console.log(res)
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
<style scoped>
.v-card{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>