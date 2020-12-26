<template>
  <div>
      <v-tabs>
        <v-tab @click="sortQuestions('new')">新着順</v-tab>
        <v-tab @click="sortQuestions('unsolved')">未解決</v-tab>
        <v-tab @click="sortQuestions('solved')">解決済み</v-tab>
        <!-- <v-tab @click="sortQuestions('unanswered')">未回答</v-tab> -->
      </v-tabs>
      <v-card 
        v-for="question in questions" 
        v-bind:key="question.id"
        class="card"
        :to="{ name: 'show', params: {id: question.id } }"
      >
        <v-card-title>{{question.title}}</v-card-title>
        <v-card-text>
          <div v-for="tag in question.tags" :key="tag.id">
            <router-link :to="{ name: 'tag',params: {id: tag.id} }">{{tag.name}}</router-link>
          </div>
          <div v-if="question.best_answer_id">解決済み</div>
          <div v-else>未解決</div>
        回答数: {{question.answers.length}}<br>
        投稿者: {{question.user.name}}<br>
        作成日: {{question.created_at}}
        </v-card-text>
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
.card{
  margin-bottom: 10px;
}
.v-aplication ul{
  margin-left: 0;
}
</style>