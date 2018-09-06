import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import tag from './modules/tag'

Vue.use(Vuex);

const state = {
  adminInfo:{
    token: window.sessionStorage.getItem('token') || '',
    admin_name: window.sessionStorage.getItem('admin_name') || '',
    admin_id: window.sessionStorage.getItem('admin_id') || ''
  }
};

export default new Vuex.Store({
  modules: {
    tag
  },
  state,
  mutations
});