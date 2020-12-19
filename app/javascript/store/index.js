import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/router';
import axios from '../plugins/axios-auth';
import axiosRefresh from '../plugins/axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    currentUser: {},
  },
  getters: {
    idToken: state => state.idToken,
    currentUser: state => state.currentUser,
  },
  mutations: {
    updateIdToken(state, idToken){
      state.idToken = idToken;
    },
    setCurrentUser(state, user){
      state.user = user;
    }
  },
  actions: {
    async autoLogin({ commit }){
      const idToken = localStorage.getItem('idToken');
      if(!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken');
      if (isExpired) {
        await dispatch('refreshIdToken', refreshToken);
      } else{
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiresInMs);
        commit('updateIdToken', idToken);
      }
      commit('updateIdToken', idToken);
    },
    login({ dispatch }, authData) {
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyBsrOFZVr3xHcTDuCjMdIZBicdClAwI7jc',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        console.log(response);
        dispatch('setAuthData',{
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshIdToken: response.data.refreshIdToken,
        });
        router.push('/');
        // console.log(response);
      });
    },
    logout({ commit }){
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.replace('/login');
    },
    async refreshIdToken({ dispatch}, refreshToken){
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
          refreshIdToken: response.data.refresh_id_token,
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
        console.log(response);
        dispatch('setAuthData',{
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshIdToken: response.data.refreshIdToken,
        });
        router.push('/');
      });
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
    }
  }
})