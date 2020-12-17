import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Register from "../views/Register";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/'
    },
    {
      path: '/login',
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/');
        } else{
          next()
        }
      }
    },
    {
      path: '/register',
      component: Register,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/');
        } else{
          next()
        }
      }
    },
  ]
});