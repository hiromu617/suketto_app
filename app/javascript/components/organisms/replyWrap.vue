<template>
   <v-expansion-panels flat>
        <v-expansion-panel
        >
        <v-expansion-panel-header hide-actions>
          <template v-if="answer.replies.length === 0">返信する</template>
          <template v-else>{{answer.replies.length}}件の返信</template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pl-3">
          <v-card
            v-for="reply in answer.replies"
            :key="reply.id"
            outlined
            class="my-3"
          >
          <v-card-text>
            <div class="d-flex">
                <v-btn 
                  class="pa-0"
                  :to="{ name: 'user', params: {id: reply.user.id } }" 
                  text
                  link
                  style="text-transform: none"
                >
                <template v-if="reply.user.avatar.url">
                  <v-avatar size="35" class="mr-2">
                    <img :src="reply.user.avatar.url" alt="">
                  </v-avatar>
                </template>
                <template v-else>
                <v-avatar color="grey" size="35" class="mr-2">
                  <v-icon dark color="white">
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
                </template>
                </v-btn> 
                <div>
                  <div style="line-height: 36px; line-height: 36px">
                    <span class="subtitle-1">{{reply.user.name}}</span>
                    <span class="caption"> {{reply.created_at | detailedDate}}</span>
                  </div>
                  <p>{{reply.body}}</p>
                  <div v-if="currentUserId === reply.user_id">
                    <v-btn color="red lighten-1" dark @click="deleteReply(reply.id)">削除</v-btn>
                  </div>
                </div>
            </div>
          </v-card-text>
          </v-card>
          <v-card outlined>
            <v-form>
            <v-card-text>
              <v-textarea
                label="返信"
                v-model="replyBody"
                background-color="grey lighten-3"
                height="100"
                counter
                auto-grow
                filled
              ></v-textarea>
              <v-btn  color="grey darken-4" dark block @click="createReply(answer.id)">返信する</v-btn>
              </v-card-text>
            </v-form>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-expansion-panels>
</template>

<script>
import axios from '../../plugins/axios';

export default {
  props: ['answer'],
  filters: {
    detailedDate: function(val){
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})([\w|:|.|+]*)/, "$1/$2/$3 $4:$5")
    }
  },
  data: function() {
    return {
      replyBody: ''
    }
  },
  computed: {
    currentUserId(){
      return this.$store.state.currentUser.id
    },
  },
  methods: {
    createReply: async function(answer_id){
      if(!this.currentUserId){
        this.$store.dispatch('showFlashMessage', {text: 'ログインしてください'});
        return;
      }
      axios.post('/api/replies/',{
        reply: {
          body: this.replyBody,
          answer_id: answer_id,
          user_id: this.$store.state.currentUser.id
        }
      })
      .then( res => {
        // this.answers.push(res.data);
        // console.log(res)
        this.$store.dispatch('showFlashMessage', {text: '質問に回答しました'});
      })
      .catch(e => alert(e))
      this.$router.go({path: this.$router.currentRoute.path, force: true});
      this.replyBody = ''
    },
    deleteReply: async function(reply_id){
      if(!window.confirm('この操作は取り消すことができません。本当に削除しても良いですか？')){
        return
      }
      axios.delete('/api/replies/' + reply_id)
      .then(res => {
        this.$store.dispatch('showFlashMessage', {text: '返信を削除しました'});
      })
      .catch(e => console.log(e.message))
      this.$router.go({path: this.$router.currentRoute.path, force: true});
      // this.answers=[]
      // this.question = {}
      // this.getData()
    },
  }
}
</script>


<style scoped>

</style>