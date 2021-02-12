<template>
  <div>
    <main-view></main-view>
      <v-tabs 
        class="mt-5 mb-5" 
        grow 
        background-color="transparent"
        color="grey darken-4"
      >
        <v-tab class="" @click="sortQuestions('new')">新着順</v-tab>
        <v-tab class="" @click="sortQuestions('unsolved')">未解決</v-tab>
        <v-tab class=""  @click="sortQuestions('solved')">解決済み</v-tab>
        <!-- <v-tab @click="sortQuestions('unanswered')">未回答</v-tab> -->
      </v-tabs>
      <div
        v-if="loading"
        style="text-align: center;"
        class="my-3"
      >
        <v-progress-circular
        indeterminate
        ></v-progress-circular>
      </div>
      <v-card 
        v-for="question in questions" 
        v-bind:key="question.id"
        outlined
        class="card d-flex"
        :to="{ name: 'show', params: {id: question.id } }"
      >
        <div class="text-center">
          <v-card-text>
            <div v-if="question.best_answer_id">
              <v-chip
                class="question-status"
                color="red lighten-1"
                text-color="white"
              >
              解決済み
              </v-chip>
            </div>
            <div v-else>
              <v-chip
                class="question-status"
              >
              未解決
              </v-chip>
            </div>
            <p class="answer-number-label"> 回答 </p>
            <div class="answer-number">{{question.answers.length}}</div>
          </v-card-text>
        </div>
        <div class="card-content d-flex align-content-space-between flex-wrap">
          <v-card-title class="card-title" color="red">{{question.title}}</v-card-title>
          <v-card-text  class="">
            <span v-for="tag in question.tags" :key="tag.id">
              <v-chip
                link
                label
                color="grey darken-4"
                class="question-tag mr-2"
                outlined
                :to="{ name: 'tag',params: {id: tag.id} }"
              >
              {{tag.name}}
              </v-chip>
            </span>
              <div class="d-flex justify-space-between flex-nowrap">
                
                <v-btn 
                  class="question-user" 
                  :to="{ name: 'user', params: {id: question.user.id } }" 
                  text
                  link
                  style="text-transform: none"
                >
                  <template v-if="question.user.avatar.url">
                    <v-avatar size="35" class="mr-2">
                      <img :src="question.user.avatar.url" alt="">
                    </v-avatar>
                  </template>
                  <template v-else>
                    <v-avatar color="grey" size="40">
                      <v-icon dark color="white">
                        mdi-account-circle
                      </v-icon>
                    </v-avatar>
                  </template>
                  {{question.user.name}}
                </v-btn> 
                <span class="question-date caption">{{question.created_at | newDate}}</span>
              </div>
          </v-card-text>
        </div>
        
      </v-card>
      <v-pagination
        color="grey darken-4"
        class="my-5"
        v-model="page.currentPage"
        :length="page.totalPages"
        circle
        @input="changePage"
      ></v-pagination>
  </div>
  
</template>

<script>
import axios from '../plugins/axios';
import mainVue from '../components/mainView';
import MainView from '../components/mainView.vue';

export default {
  data: function() {
    return {
      questions: [],
      sort: 'new',
      page: {
        currentPage: 1,
        totalPages: 5,
      },
      loading: false
    }
  },
  components:{
    MainView
  },
  created: function () {
    this.fetchQuestions();
  },
  filters: {
    newDate: function(val){
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})([\w|:|.|+]*)/, "$1年$2月$3日")
    }
  },
  methods: {
    changePage(val){
      this.questions = []
      axios.get(`/api/questions?page=${val}`, {
        params: {
          sort: this.sort
        }
      })            
      .then( res => {
        this.questions = res.data
      })
    },
    fetchQuestions: async function(sortName){
      this.loading = true
      this.questions = []
      await axios.get('/api/questions', {
        params: {
          sort: sortName
        }
      })
      .then( res => {
        // console.log(res.data)
        this.page.totalPages = Number(res.headers["total-pages"])
        this.page.currentPage = 1
        this.questions = res.data
        this.loading = false
      })
      .catch(e => console.log(e));
    },
    sortQuestions: function(sortName){
      this.sort = sortName
      this.fetchQuestions(sortName)
    }
  }
}
</script>

<style scoped>
p{
  margin: 0;
  padding: 0;
}
.card{
  margin-bottom: 10px;
}
.card-content{
  width: 100%;
}
.v-aplication ul{
  margin-left: 0;
}
.question-tag{
  margin-bottom: 10px;
}
.question-user{
  padding: 0!important;
}
.question-date{
  margin: auto 0;
}
</style>