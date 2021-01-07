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
        <div>
          <v-card-title class="card-title" color="red">{{question.title}}</v-card-title>
          <v-card-text  class="">
            <div v-for="tag in question.tags" :key="tag.id">
              <v-chip
                link
                label
                color="indigo darken-3"
                outlined
                :to="{ name: 'tag',params: {id: tag.id} }"
              >
              <v-icon left>mdi-label</v-icon>
              {{tag.name}}
              </v-chip>
            </div>
               <p class="question-user">{{question.user.name}}</p> 
               <p class="question-date">{{question.created_at}}</p>
          </v-card-text>
        </div>
        
      </v-card>
      <v-pagination
        v-model="page.currentPage"
        :length="page.totalPages"
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
    fetchQuestions: function(sortName){
      this.questions = []
      axios.get('/api/questions', {
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
.v-aplication ul{
  margin-left: 0;
}

@media (max-width: 1000px) {
  .v-card__title {
    font-size: 2.5rem;
  }
  .v-tab{
    font-size: 1.7rem;
  }
  .question-user{
    font-size: 1.5rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .question-date{
    font-size: 1.5rem;
  }
  .v-card{
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
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
  .v-pagination__item{
    font-size: 2rem;
  }
}
</style>