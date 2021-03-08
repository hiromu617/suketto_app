/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from '../app.vue'
import router from '../router/router'
import store from '../store'
import Vuetify from "vuetify"; 
import firebase from "firebase";
// import "vuetify/dist/vuetify.min.css"; 
// import twemoji from 'twemoji'

const config = {
  apiKey: "AIzaSyBsrOFZVr3xHcTDuCjMdIZBicdClAwI7jc",
  authDomain: "suketto-app.firebaseapp.com",
  projectId: "suketto-app",
  storageBucket: "suketto-app.appspot.com",
  messagingSenderId: "1055750055329",
  appId: "1:1055750055329:web:c7585d2981dfe04faf17e0",
  measurementId: "G-5N1LJRDRK4"
};
firebase.initializeApp(config);

Vue.use(Vuetify); 
const vuetify = new Vuetify(); 

// Vue.directive('twemoji', {
//   inserted(el) {
//     el.innerHTML = twemoji.parse(el.innerHTML)
//   }
// })

Vue.directive('emoji', {
  inserted (el) {
    el.innerHTML = twemoji.parse(el.innerHTML)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router,
    store,
    vuetify,
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    render: h => h(App),
    created() {
    }
  }).$mount()
  document.body.appendChild(app.$el)
  // console.log(app)
})
// store.dispatch('autoLogin').then(
//   document.addEventListener('DOMContentLoaded', () => {
//     const app = new Vue({
//       router,
//       store,
//       vuetify,
//       icons: {
//         iconfont: 'mdi', // default - only for display purposes
//       },
//       render: h => h(App),
//       created() {
//       }
//     }).$mount()
//     document.body.appendChild(app.$el)
//     // console.log(app)
//   })
// );




// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })
