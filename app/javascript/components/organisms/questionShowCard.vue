<template>
<v-card v-if="editFlg" outlined>
      <v-card-text>
        <v-form>
          <v-text-field
            label="タイトル"
            type="text" 
            v-model="question.title"
          />
          <v-textarea
            label="質問内容"
            v-model="question.body"
            counter
            auto-grow
          />
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
          />
        </v-form>
        <v-btn  color="indigo lighten-4" class="mr-3" @click="(editFlg = false)">戻る</v-btn>
        <v-btn  color="blue lighten-1" dark @click="updateQuestion">更新</v-btn>
      </v-card-text>
     
    </v-card>
    <v-card v-else outlined>
      <v-card-text>
        <div>
          <v-chip
            class="question-status"
            color="red lighten-1"
            text-color="white"
            v-if="question.best_answer_id"
          >
          解決済み</v-chip>
          <v-chip
            v-else
            class="question-status"
          >
          未解決</v-chip>
          <span style="float: right" class="text-h6 mr-5 black--text">{{question.answers.length}}件の回答</span>
        </div>
      <v-card-title class="text-h4 black--text">{{question.title}}</v-card-title>
        <div v-for="tag in question.tags" :key="tag.id">
          <v-chip
            link
            label
            color="indigo"
            class="question-tag"
            outlined
            :to="{ name: 'tag',params: {id: tag.id} }"
          >
          <v-icon left>mdi-label</v-icon>
            {{tag.name}}
          </v-chip>
        </div>
        <p class="question-info" style="text-align: left;">
          <v-icon>
              mdi-calendar
          </v-icon>
          {{question.created_at | detailedDate}}
          <template v-if="question.created_at !== question.updated_at">
            <v-icon>
              mdi-update
            </v-icon>
            {{question.updated_at | detailedDate}}
          </template>
        </p>
        <div style="text-align: right;">
          <v-btn 
            class="question-user mr-10" 
            :to="{ name: 'user', params: {id: question.user.id } }" 
            text
            link
            style="text-transform: none"
          >
            <template v-if="question.user.avatar.url">
              <v-avatar size="40" class="mr-2">
                <img :src="question.user.avatar.url" alt="">
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar color="grey" size="35">
                <v-icon dark color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </template>
            {{question.user.name}}
          </v-btn> 
        </div>
        
        <div class="question-body text-h6 ma-5 black--text">{{question.body}}</div>
        <div style="text-align: center;">
          <video class="video" v-if="question.video.url" :src="question.video.url" controls="controls"></video>
        </div>
        <div v-if="this.$store.state.currentUser.id === this.question.user_id">
          <v-btn  color="blue lighten-1" class="mr-3" dark @click="(editFlg = true)">編集</v-btn>
          <v-btn  color="red lighten-1" dark @click="deleteQuestion">削除</v-btn>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
import axios from '../../plugins/axios';

export default {
  props: ['question'],
  filters: {
    detailedDate: function(val){
      return val.toString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})([\w|:|.|+]*)/, "$1/$2/$3 $4:$5")
    }
  },
  data: function() {
    return {
      editFlg: false,
      question: {}
    }
  },
  computed: {
    currentUserId(){
      return this.$store.state.currentUser.id
    },
  },
  methods: {
    deleteQuestion: function(){
      // if(!this.questioner){
      //   return
      // }
      if(!window.confirm('この操作は取り消すことができません。本当に削除しても良いですか？')){
        return
      }
      axios.delete('/api/questions/' + this.$route.params.id)
      .then( res => {
        
        this.$store.dispatch('showFlashMessage', {text: '質問を削除しました'});
      })
      .catch(e => console.log(e))
      router.push({name: 'index', force: true})
    },
    updateQuestion: function(){
      // if(!this.questioner){
      //   return
      // }
      axios.put('/api/questions/' + this.$route.params.id,{
        title: this.question.title,
        body: this.question.body,
        // tag_list: this.tags
        
      })
      .then( res => {
        this.editFlg = false
        this.$store.dispatch('showFlashMessage', {text: '質問を更新しました'});

      })
      .catch( e => console.log(e.message))
      // this.question = {}
      // this.answers=[]
      // this.getData()
    },
  }
}
</script>


<style scoped>

</style>