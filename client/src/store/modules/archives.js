/*
 * @Author: Pawn 
 * @Date: 2018-08-29 09:41:24 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-01 09:30:08
 */
import api from '@/axios'

const state = {
  data: [],
  mark: false
}

const actions = {
  async get_archives_api({state,commit}){
    if(state.mark) return state.data;
    let res = await api.api_get_archives();
    commit('save_archives_data', res.data);
    return res.data.data;
  }
}

const mutations = {
  save_archives_data(state, {data=[]}){
    state.data = data;
    state.mark = true;
  }
}

export default {
  state,
  actions,
  mutations
}