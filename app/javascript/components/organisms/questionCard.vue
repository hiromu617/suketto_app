<template>
<ul>
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
                class="question-tag mr-2"
                outlined
                small
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
</ul>
     
</template>

<script>
export default {
  props: ['questions'],
  filters: {
    newDate: function(val){
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})([\w|:|.|+]*)/, "$1年$2月$3日")
    }
  },
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
ul{
  padding: 0;
  margin: 0;
}
</style>