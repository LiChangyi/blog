/*
 * @Author: Pawn 
 * @Date: 2018-08-29 09:41:24 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-08-30 15:28:53
 */
import api from '@/axios'

const state = {
  data: [],
  current_display: {}
}

const actions = {
  async get_article_api({state,commit}, id){
    id = id || '';
    let data = state.data.find( item => {
      return item.id ==id;
    })
    if(data == null || data.length == 0){
      let res = await api.api_get_article(id);
      commit('save_article_data', res.data);
    }else {
      state.current_display = data[0];
    }
  }
}

const mutations = {
  save_article_data(state, {data =[]}){
    if(data.length != 0){
      state.data.push(data[0]);
      state.current_display = data[0];
    }
  }
}

export default {
  state,
  actions,
  mutations
}