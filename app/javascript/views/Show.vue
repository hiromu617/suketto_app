<template>
  <div>
    <h2>Show</h2>
    <h3>Question</h3>
    <p>{{this.$route.params.id}}</p>
    <p>{{question.title}}</p>
    <p>{{question.body}}</p>
    <p>ユーザーid: {{question.user_id}}</p>
    <p>作成日: {{question.created_at}}</p>
    <p>更新日: {{question.updated_at}}</p>
  </div>
  
</template>

<script>
import axios from '../plugins/axios';

export default {
  data: function() {
    return {
      question: {}
    }
  },
  mounted: function () {
    this.getQuestion();
  },
  methods: {
    getQuestion: function(){
      axios.get('/api/questions/'+ this.$route.params.id)
      .then( res => {
        this.question = res.data
      })
      .catch(e => console.log(e));
    }
  }
}
</script>