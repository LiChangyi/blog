import axios from 'axios';

// 全局设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;


export default {
  // 获取标签列表
  api_get_tags(){
    return instance.get("/api/tags");
  },
  // 获取作品列表
  api_get_work(){
    return instance.get('/api/work');
  },
  // 获取文章列表
  api_get_article_list(data){
    let {current_page='',page_size='',keyword='',state='',tag=''} = data;
    return instance.get(`/api/article?current_page=${current_page}&page_size=${page_size}&keyword=${keyword}&tag=${tag}&state=${state}`);
  },
  // 通过文章id来获取文章
  api_get_article(id){
    return instance.get(`/api/article/${id}`);
  },
  // 获取主要评论
  api_get_comment(data){
    return instance.get(`/api/comment?current_page=${data.current_page}&page_size=${data.page_size}`);
  },
  // 根据文章id获取评论
  api_get_comment_by_article(id){
    return instance.get(`/api/comment/${id}`);
  },
  // 获取设置
  api_get_setting(){
    return instance.get('/api/setting');
  },
  // 获取归档列表
  api_get_archives(){
    return instance.get('/api/archives');
  }
}