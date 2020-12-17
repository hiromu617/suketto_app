<template>
  <div>
    <h3>Current User</h3>
    <p>{{ user }}</p>
  </div>
</template>

<script>
import firebase from '../plugins/firebase'
import axios from "../plugins/axios"

export default {
  data() {
    return {
      user: null
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const res = await axios.get(`/api/users?uid=${user.uid}`)
        this.user = res.data
      }
    })
  }
}
</script>