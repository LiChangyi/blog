/*
 * @Author: Pawn 
 * @Date: 2018-08-29 09:41:24 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-03 21:18:12
 */
import api from '@/axios'

const state = {
  data: [],
  mark: false
}

const actions = {
  async get_tag_api({state,commit}){
    if(state.mark) return;
    let res = await api.api_get_tags();
    commit('save_tag_data', res.data);
  }
}

const mutations = {
  save_tag_data(state, {data=[]}){
    let {article_num_list = [],tags_list= []} = data;
    tags_list.forEach( item => {
      let temp = article_num_list.find( i => {
        return i._id==item._id;
      })
      item.tags_article_num = temp==null?0:temp.count;
    })
    state.data = tags_list.sort( (a,b) => {
      return a.tags_article_num<b.tags_article_num;
    });
    state.mark = true;
  }
}

export default {
  state,
  actions,
  mutations
}