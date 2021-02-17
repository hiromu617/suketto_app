<template>
  <v-card 
        class="card"
        color="yellow lighten-5"
        outlined
        >
        <v-card-text>
          <p class="answer-body subtitle-1">{{answer.body}}</p>
          <div class="answer-info d-flex">
            <v-spacer></v-spacer>
            <div style="margin: auto 0;" class="caption">{{answer.created_at | detailedDate}}</div>
            <v-btn 
              class="question-user" 
              :to="{ name: 'user', params: {id: answer.user.id } }" 
              text
              link
              style="text-transform: none"
            >
            <template v-if="answer.user.avatar.url">
              <v-avatar size="35" class="mr-2">
                <img :src="answer.user.avatar.url" alt="">
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar color="grey" size="35" class="mr-2">
                <v-icon dark color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{answer.user.name}}
          </v-btn> 
          </div>
        </v-card-text>
      </v-card>
</template>
<script>
export default {
  props: ['answer'],
  filters: {
    detailedDate: function(val){
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})([\w|:|.|+]*)/, "$1/$2/$3 $4:$5")
    }
  },
}
</script>


<style scoped>

</style>