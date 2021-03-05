import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Register from "../views/Register";
import Index from "../views/Index";
import Show from "../views/Show";
import New from "../views/New";
import Tag from "../views/Tag";
import User from "../views/User";
import About from "../views/About";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // { path: 'https://still-crag-34956.herokuapp.com/',
    //   redirect: 'https://www.suketto.me' 
    // },
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
      path: '/tag/:id/',
      component: Tag,
      name: 'tag'
    },
    {
      path: '/user/:id/',
      component: User,
      name: 'user'
    },
    {
      path: '/about/',
      component: About,
      name: 'about'
    },
    {
      path: '/question/:id',
      component: Show,
      name: 'show'
    },
  ]
});