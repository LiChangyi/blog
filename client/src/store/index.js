import Vue from 'vue'
import Vuex from 'vuex'

import tag from './modules/tag'
import article from './modules/article'
import comment from './modules/comment'
import setting from './modules/setting'
import work from './modules/work'
import archives from './modules/archives'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tag,
    article,
    comment,
    setting,
    work,
    archives
  }
});