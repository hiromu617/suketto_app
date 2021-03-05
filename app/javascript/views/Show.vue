<template>
  <div>
    <QuestionShowCard :question="question"></QuestionShowCard>
    <div class="pt-10">
      <div class="text-h6 pl-5　font-weight-bold pl-5"><span class="text-h5 red--text">{{answers.length}}</span>件の回答</div>
      <v-divider v-if="answers.length !== 0"></v-divider>
    </div>

    <div
      v-for="answer in answers" 
      v-bind:key="answer.id"
    >
      <div v-if="question.best_answer_id === answer.id">
        <h3 class="answer-head">✨👑BEST ANSWER👑✨</h3>
        <BestAnswerCard :answer="answer"></BestAnswerCard>
        <ReplyWrap :answer="answer"></ReplyWrap>
      </div>
      <div v-else>
        <div v-if="question.best_answer_id">
          <h3 class="answer-head">その他の回答</h3>
        </div>
      <AnswerCard :answer="answer">
        <v-menu 
              offset-y
              transition="slide-y-transition"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >mdi-dots-horizontal</v-icon>
              </template>
              <v-list>
                <v-list-item 
                  v-if="questioner && !question.best_answer_id" 
                  @click="createBA(answer.id)"
                >
                ベストアンサーにする
                </v-list-item>
                <v-list-item
                  v-if="currentUserId === answer.user_id"
                  @click="deleteAnswer(answer.id)"
                >
                  回答を削除する
                </v-list-item>
              </v-list>
            </v-menu>
        <!-- <div v-if="questioner && !question.best_answer_id">
          <v-btn color="blue lighten-1" dark @click="createBA(answer.id)">ベストアンサーにする</v-btn>
        </div>
        <div v-if="currentUserId === answer.user_id">
          <v-btn color="red lighten-1" dark @click="deleteAnswer(answer.id)">削除</v-btn>
        </div> -->
      </AnswerCard>
      <ReplyWrap :answer="answer"></ReplyWrap>
      </div>
    </div>
    <template v-if="!questioner && !question.best_answer_id" >
      <v-divider class="mb-3"></v-divider>
      <v-card outlined class="mb-10">
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
import VueTagsInput from '@johmun/vue-tags-input';
import QuestionShowCard from '../components/organisms/questionShowCard.vue';
import AnswerCard from '../components/organisms/answerCard.vue';
import BestAnswerCard from '../components/organisms/bestAnswerCard.vue';
import ReplyWrap from '../components/organisms/replyWrap.vue';


export default {
  components: {
    VueTagsInput,
    QuestionShowCard,
    AnswerCard,
    BestAnswerCard,
    ReplyWrap
  },
  data: function() {
    return {
      question: {},
      answers: [],
      tag: '',
      tags: [],
      questioner: false,
      answerBody: '',
    }
  },
  created: function () {
    this.getData();
  },
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
      this.$router.go({path: this.$router.currentRoute.path, force: true});
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
      this.$router.go({path: this.$router.currentRoute.path, force: true});
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