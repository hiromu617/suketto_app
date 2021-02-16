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
      <question-card :questions="questions"></question-card>
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
import MainView from '../components/organisms/mainView.vue';
import QuestionCard from '../components/organisms/questionCard.vue';

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
    MainView,
    QuestionCard,
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

</style>