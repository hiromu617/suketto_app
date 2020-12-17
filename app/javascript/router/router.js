import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '../components/SignUp'
// import SignIn from '../components/SignIn'
// import User from '../components/users/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    // {
    //   path: '/signin',
    //   name: 'signin',
    //   component: SignIn
    // },
    // {
    //   path: '/api/users',
    //   name: 'User',
    //   component: User
    // },
  ]
})