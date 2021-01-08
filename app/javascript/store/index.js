import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import router from '../router/router';
import axios from '../plugins/axios-auth';
import axiosRefresh from '../plugins/axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    currentUser: {},
    text: '',
    mode: 'success',
    // visible: true,
    // timeoutId: -1,
  },
  getters: {
    idToken: state => state.idToken,
    currentUser: state => state.currentUser,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    setCurrentUser(state, user){
      state.user = user;
    },
    setMessage: (state, payload) => {
      state.text = payload.text;
      state.mode = payload.mode;
      // state.visible = true;
    },
    // setMessageVisible: (state, value) => state.visible = value,
    // setMessageTimeoutId: (state, value) => state.timeoutId = value,
    // clearMessageTimeoutId: (state) => state.timeoutId = -1,
  },
  actions: {
    async autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken');
      if (isExpired) {
        await dispatch('refreshIdToken', refreshToken);
      } else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiresInMs);
        commit('updateIdToken', idToken);
      }
    },
    login({ dispatch }, authData) {
      axios
        .post(
          '/accounts:signInWithPassword?key=AIzaSyBsrOFZVr3xHcTDuCjMdIZBicdClAwI7jc',
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshIdToken: response.data.refreshIdToken,
          })
          router.go("/");
          dispatch('showFlashMessage', {text: 'ログインしました'});
        })
        .catch(e => {
          // alert(e)
          dispatch('showFlashMessage', {text: 'ログインに失敗しました'});
        })
    },
    logout({ commit, dispatch }) {
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.replace('/');
      dispatch('showFlashMessage', {text: 'ログアウトしました'});
    },
    async refreshIdToken({ dispatch }, refreshToken){
      await axiosRefresh.post(
        '/token?key=AIzaSyBsrOFZVr3xHcTDuCjMdIZBicdClAwI7jc',
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      ).then(response => {
        dispatch('setAuthData',{
          idToken: response.data.id_token,
          expiresIn: response.data.expires_in,
          refreshToken: response.data.refresh_id_token,
        });
      });
    },
    register({ dispatch }, authData) {
      axios.post(
        '/accounts:signUp?key=AIzaSyBsrOFZVr3xHcTDuCjMdIZBicdClAwI7jc',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        // console.log(response);
        dispatch('setAuthData',{
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshIdToken: response.data.refreshIdToken,
        })
        router.push('/');
        // dispatch('showFlashMessage', {text: '新規登録しました'});
      })
      .catch(e => {
        dispatch('showFlashMessage', {text: e});
      })
    },
    setAuthData({ commit, dispatch }, authData){
        const now = new Date();
        const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
        commit('updateIdToken', authData.idToken);
        localStorage.setItem('idToken', authData.idToken);
        localStorage.setItem('expiryTimeMs', expiryTimeMs);
        localStorage.setItem('refreshToken', authData.refreshToken);
        setTimeout(() => {
          dispatch('refreshIdToken', authData.refreshToken);
        }, authData.expiresIn * 1000);
    },
    showFlashMessage({commit}, message){
      commit('setMessage', message);
      setInterval(()=>{
        commit('setMessage', {text: '',mode: 'success'});
      },2500)
      if(state.text === ''){
        clearInterval();
      }
    } 
    // showFlashMessage: ({state, commit}, message) => new Promise((resolve,reject)=>{
    //   if(state.timeoutId !== -1) {
    //     creaTimeout(state.timeoutId);
    //     commit('clearMessageTimeoutId');
    //   }
    //   commit('setMessage', message);
    //   setTimeout(()=>{
    //     commit('setMessage', {text: ''});
    //   },2000)
    //   if(message.dulation > 0) {
    //     const timeoutId = setTimeout(() => {
    //       commit('clearMessageTimeoutId');
    //       commit('setMessagevisible', false);
    //       return resolve();
    //     }, message.duration);
    //     commit('setMessaeTimeoutId',timeoutId);
    //   }else {
    //     return resolve();
    //   }
    // })

    
  },
  plugins: [createPersistedState(
   
  )]
})