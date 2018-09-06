/*
 * @Author: Pawn 
 * @Date: 2018-08-29 09:41:24 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-08-31 11:18:34
 */
import api from '@/axios'

const state = {
  data: [],
  mark: false
}

const actions = {
  async get_setting_api({state,commit}){
    if(state.mark) return state.data;
    let res = await api.api_get_setting();
    commit('save_setting_data', res.data);
    return res.data.data;
  }
}

const mutations = {
  save_setting_data(state, {data=[]}){
    state.data = data;
    state.mark = true;
  }
}

export default {
  state,
  actions,
  mutations
}