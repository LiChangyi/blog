import axios from 'axios';
import router from '../router';
import store from '../store';

// 全局设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

// request拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    if(store.state.adminInfo.token){
      config.headers.Authorization = `${store.state.adminInfo.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let { response } = error;
    if(response.status == 401) {
      store.commit("adminLogout")  // token过期,清除
      router.replace({ //跳转到登录页面
          path: '/admin/login',
          query: { redirect: router.currentRoute.fullPath } 
      });
      return Promise.reject(error.response);
    }
  }
)


export default {
  // 获取验证码
  api_get_checkcode(){
    return instance.get("/api/setting/checkcode");
  },
  // 用户登录
  api_admin_login(data) {
    return instance.post('/api/admin/login', data);
  },
  // 用户修改密码
  api_alter_admin(data) {
    return instance.patch('/api/admin/master', data);
  },
  // 获取标签列表
  api_get_tags(){
    return instance.get("/api/tags");
  },
  // 添加标签
  api_add_tags(data){
    return instance.post('/api/tags',data);
  },
  // 修改标签
  api_alter_tags(data){
    return instance.patch(`/api/tags/${data._id}`,data);
  },
  // 删除标签
  api_del_tags(data){
    return instance.delete(`/api/tags/${data._id}`,data);
  },
  // 获取七牛云上传图片token
  api_get_qiniu_token(){
    return instance.get('/api/setting/token');
  },
  // 获取全局设置
  api_get_setting(){
    return instance.get('/api/setting');
  },
  // 修改全局设置
  api_alter_setting(data){
    return instance.patch('/api/setting', data);
  },
  // 获取作品列表
  api_get_work(){
    return instance.get('/api/work');
  },
  // 修改作品信息
  api_alter_work(data){
    return instance.patch(`/api/work/${data._id}`, data);
  },
  // 添加作品信息
  api_add_work(data){
    return instance.post('/api/work', data);
  },
  // 删除作品
  api_del_work(data){
    return instance.delete(`/api/work/${data._id}`);
  },
  // 获取文章列表
  api_get_article_list(data){
    return instance.get(`/api/article?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`);
  },
  // 通过文章id来删除文章
  api_del_article(id){
    return instance.delete(`/api/article/${id}`);
  },
  // 通过文章id来获取文章
  api_get_article(id){
    return instance.get(`/api/article/${id}`);
  },
  // 文章修改
  api_alter_article(data){
    return instance.patch(`/api/article/${data._id}`, data);
  },
  // 添加文章
  api_add_article(data){
    return instance.post('/api/article', data);
  },
  // 获取主要评论
  api_get_comment(data){
    return instance.get(`/api/comment?current_page=${data.current_page}&page_size=${data.page_size}`);
  },
  // 评论删除
  api_del_comment(data){
    return instance.delete(`/api/comment/${data._id}`);
  }
}