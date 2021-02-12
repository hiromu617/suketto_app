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
        <div>
          <v-chip
            class="question-status"
            color="red lighten-1"
            text-color="white"
            v-if="question.best_answer_id"
          >
          解決済み</v-chip>
          <v-chip
            v-else
            class="question-status"
          >
          未解決</v-chip>
          <span style="float: right" class="text-h6 mr-5 black--text">{{answers.length}}件の回答</span>
        </div>
      <v-card-title class="text-h4 black--text">{{question.title}}</v-card-title>
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
        <p class="question-info" style="text-align: left;">
          <v-icon>
              mdi-calendar
          </v-icon>
          {{question.created_at | newDate}}
          <template v-if="question.created_at !== question.updated_at">
            <v-icon>
              mdi-update
            </v-icon>
            {{question.updated_at | newDate}}
          </template>
        </p>
        <div style="text-align: right;">
          <v-btn 
            class="question-user mr-10" 
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
                <v-icon dark color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{question.user.name}}
          </v-btn> 
        </div>
        
        <div class="question-body text-h6 ma-5 black--text">{{question.body}}</div>
        <div style="text-align: center;">
          <video class="video" v-if="question.video.url" :src="question.video.url" controls="controls"></video>
        </div>
        <div v-if="questioner">
          <v-btn  color="blue lighten-1" class="mr-3" dark @click="(editFlg = true)">編集</v-btn>
          <v-btn  color="red lighten-1" dark @click="deleteQuestion">削除</v-btn>
        </div>
      </v-card-text>
    </v-card>
    
    <div class="pt-10">
      <div class="text-h6 pl-5"><span class="text-h5 red--text">{{answers.length}}</span>件の回答</div>
      <v-divider v-if="answers.length !== 0"></v-divider>
    </div>

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
          <p class="answer-body subtitle-1">{{answer.body}}</p>
          <div class="answer-info d-flex">
            <v-spacer></v-spacer>
            <div style="margin: auto 0;" class="caption">{{answer.created_at | newDate}}</div>
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
                <v-icon dark color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{answer.user.name}}
          </v-btn> 
          </div>
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
          <p class="answer-body subtitle-1 black--text">{{answer.body}}</p>
          <div class="answer-info d-flex">
            <v-spacer></v-spacer>
            <div style="margin: auto 0;" class="caption">{{answer.created_at | newDate}}</div>
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
                <v-icon dark color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{answer.user.name}}
          </v-btn> 
        </div>
        <div v-if="questioner && !question.best_answer_id">
          <v-btn color="blue lighten-1" dark @click="createBA(answer.id)">ベストアンサーにする</v-btn>
        </div>
        <div v-if="currentUserId === answer.user_id">
          <v-btn color="red lighten-1" dark @click="deleteAnswer(answer.id)">削除</v-btn>
        </div>
        </v-card-text>
      </v-card>
      <v-expansion-panels flat>
        <v-expansion-panel
        >
        <v-expansion-panel-header>
          <template v-if="answer.replies.length === 0">返信する</template>
          <template v-else>{{answer.replies.length}}件の返信</template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pl-3">
          <v-card
            v-for="reply in answer.replies"
            :key="reply.id"
            outlined
            class="my-3"
          >
          <v-card-text>
            <div class="d-flex">
                <v-btn 
                  class="pa-0"
                  :to="{ name: 'user', params: {id: reply.user.id } }" 
                  text
                  link
                  style="text-transform: none"
                >
                <template v-if="reply.user.avatar.url">
                  <v-avatar size="35" class="mr-2">
                    <img :src="reply.user.avatar.url" alt="">
                  </v-avatar>
                </template>
                <template v-else>
                <v-avatar color="grey" size="35" class="mr-2">
                  <v-icon dark color="white">
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
                </template>
                </v-btn> 
                <div>
                  <div style="line-height: 36px; line-height: 36px">
                    <span class="subtitle-1">{{reply.user.name}}</span>
                    <span class="caption"> {{reply.created_at | newDate}}</span>
                  </div>
                  <p>{{reply.body}}</p>
                  <div v-if="currentUserId === reply.user_id">
                    <v-btn color="red lighten-1" dark @click="deleteReply(reply.id)">削除</v-btn>
                  </div>
                </div>
            </div>
          </v-card-text>
          </v-card>
          <v-card outlined>
            <v-form>
            <v-card-text>
              <v-textarea
                label="返信"
                v-model="replyBody"
                background-color="grey lighten-3"
                height="100"
                counter
                auto-grow
                filled
              ></v-textarea>
              <v-btn  color="grey darken-4" dark block @click="createReply(answer.id)">返信する</v-btn>
              </v-card-text>
            </v-form>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-expansion-panels>
      </div>
    </div>
    <template v-if="!questioner && !question.best_answer_id" >
      <v-divider class="mb-3"></v-divider>
      <v-card outlined>
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
    </template>
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
      answerBody: '',
      replyBody: ''
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
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})([\w|:|.|+]*)/, "$1/$2/$3 $3:$4")
    }
  },
  methods: {
    createReply: async function(answer_id){
      if(!this.currentUserId){
        this.$store.dispatch('showFlashMessage', {text: 'ログインしてください'});
        return;
      }
      axios.post('/api/replies/',{
        reply: {
          body: this.replyBody,
          answer_id: answer_id,
          user_id: this.$store.state.currentUser.id
        }
      })
      .then( res => {
        // this.answers.push(res.data);
        // console.log(res)
        this.$store.dispatch('showFlashMessage', {text: '質問に回答しました'});
      })
      .catch(e => alert(e))

      this.replyBody = ''
    },
    deleteReply: async function(reply_id){
      if(!window.confirm('この操作は取り消すことができません。本当に削除しても良いですか？')){
        return
      }
      axios.delete('/api/replies/' + reply_id)
      .then(res => {
        this.$store.dispatch('showFlashMessage', {text: '返信を削除しました'});
      })
      .catch(e => console.log(e.message))
      this.answers=[]
      this.question = {}
      this.getData()
    },
    getData: async function(){
      await axios.get('/api/questions/'+ this.$route.params.id)
      .then( res => {
        this.question = res.data
        // console.log(this.question)
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
      if(!window.confirm('この操作は取り消すことができません。本当に削除しても良いですか？')){
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
        title: this.question.title,
        body: this.question.body,
        // tag_list: this.tags
        
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
      if(!window.confirm('この操作は取り消すことができません。本当に削除しても良いですか？')){
        return
      }
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
      if(!window.confirm('この操作は取り消すことができません。ベストアンサーを決定しても良いですか？')){
        return
      }
      axios.put('/api/questions/' + this.$route.params.id,{
        best_answer_id: answer_id
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
.card{
  margin-top: 10px;
  margin-bottom: 10px;
}
.video{
  max-width: 100%;
}
.question-user{
  margin: 10px 0;
}
</style>