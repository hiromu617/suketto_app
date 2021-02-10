<template>
  <div>
    <h3 class="text-h4">🏷{{tag.name}}のついた質問</h3>
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
        v-model="page.currentPage"
        :length="page.totalPages"
        @input="changePage"
        circle
      ></v-pagination>
  </div>
  
</template>

<script>
import axios from '../plugins/axios';

export default {
  data: function() {
    return {
      questions: [],
      tag: {},
      page: {
        currentPage: 1,
        totalPages: 5,
      }
    }
  },
  mounted: function () {
    this.fetchTagQuestions();
  },
  filters: {
    newDate: function(val){
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})([\w|:|.|+]*)/, "$1年$2月$3日")
    }
  },
  methods: {
    changePage(val){
      axios.get(`/api/questions?page=${val}`,{
        params: {
          tag_id: this.$route.params.id
        }
      })
      .then( res => {
        // console.log(res)
        // for(let i = 0; i < res.data.length; i++){
        //   this.questions.push(res.data[i]);
        // }
        this.questions = []
        this.questions = res.data
      })
    },
    fetchTagQuestions: function(){
      axios.get('/api/tags/' + this.$route.params.id)
      .then( res => {
        // console.log(res)
        this.tag = res.data
      })
      axios.get('/api/questions',{
        params: {
          tag_id: this.$route.params.id
        }
      })
      .then( res => {
        // console.log(res.data)
        this.page.totalPages = Number(res.headers["total-pages"])
        this.questions = res.data
      })
      .catch(e => console.log(e));
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