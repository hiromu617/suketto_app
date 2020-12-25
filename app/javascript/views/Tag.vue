<template>
  <div>
    <h3>#{{tag.name}}のついた質問</h3>
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
  
  </div>
  
</template>

<script>
import axios from '../plugins/axios';

export default {
  data: function() {
    return {
      questions: [],
      tag: {}
    }
  },
  mounted: function () {
    this.fetchTagQuestions();
  },
  methods: {
    fetchTagQuestions: function(){
      axios.get('/api/tags/' + this.$route.params.id)
      .then( res => {
        console.log(res)
        this.tag = res.data
      })
      axios.get('/api/questions',{
        params: {
          tag_id: this.$route.params.id
        }
      })
      .then( res => {
        console.log(res.data)
        for(let i = 0; i < res.data.length; i++){
          this.questions.push(res.data[i]);
        }
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
</style>