<template>
  <div>
      <v-tabs>
        <v-tab class="" @click="sortQuestions('new')">新着順</v-tab>
        <v-tab class="" @click="sortQuestions('unsolved')">未解決</v-tab>
        <v-tab class=""  @click="sortQuestions('solved')">解決済み</v-tab>
        <!-- <v-tab @click="sortQuestions('unanswered')">未回答</v-tab> -->
      </v-tabs>
      <v-card 
        v-for="question in questions" 
        v-bind:key="question.id"
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
            <div v-for="tag in question.tags" :key="tag.id">
              <v-chip
                link
                label
                color="indigo"
                class="question-tag"
                outlined
                :to="{ name: 'tag',params: {id: tag.id} }"
              >
              {{tag.name}}
              </v-chip>
            </div>
              <div class="d-flex justify-space-between flex-nowrap">
                <span class="question-user">{{question.user.name}}</span> 
                <span class="question-date">{{question.created_at | newDate}}</span>
              </div>
          </v-card-text>
        </div>
        
      </v-card>
      <v-pagination
        v-model="page.currentPage"
        :length="page.totalPages"
        circle
        @input="changePage"
      ></v-pagination>
  </div>
  
</template>

<script>
import axios from '../plugins/axios';

export default {
  data: function() {
    return {
      questions: [],
      sort: 'new',
      page: {
        currentPage: 1,
        totalPages: 5,
      }
    }
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
      this.questions = []
      await axios.get('/api/questions', {
        params: {
          sort: sortName
        }
      })
      .then( res => {
        console.log(res.data)
        this.page.totalPages = Number(res.headers["total-pages"])
        this.page.currentPage = 1
        this.questions = res.data
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
@media (max-width: 1000px) {
  .v-card__title {
    font-size: 2.5rem;
  }
  .v-tab{
    font-size: 2rem;
    width: 30%;
    height: 50px;
    padding: 30px 0;
  }
  .question-user{
    font-size: 1.5rem;
  }
  .question-date{
    font-size: 1.5rem;
  }
  .v-card{
    padding-top: 30px;
    padding-bottom: 30px;
    margin: 20px 0;
  }
  .question-status{
    font-size: 1.2rem;
  }
  .answer-number-label{
    font-size: 1.5rem;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .answer-number{
    font-size: 2rem;
  }
  .question-tag{
    font-size: 1.2rem;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
</style>