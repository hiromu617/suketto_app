import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Register from "../views/Register";
import Index from "../views/Index";
import Show from "../views/Show";
import New from "../views/New";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index'
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
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
      name: 'register',
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/');
        } else{
          next()
        }
      }
    },
    {
      path: '/new',
      component: New,
      name: 'new'
    },
    {
      path: '/:id',
      component: Show,
      name: 'show'
    },
  ]
});