import axios from 'axios';

// 全局设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

// request拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 sessionStorage 中是否有 token,如果有放在headers中
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
    const token =  userInfo.token || '';
    if( token !== '' ){
      config.headers.Authorization = token;
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
    if(response.status === 401) {
      // 清楚缓存
      window.sessionStorage.removeItem('userInfo');
      window.location.href = "/login";
      return Promise.reject(error.response);
    }
  }
)


export default {
  // 获取验证码
  api_get_checkcode() {
    return instance.get("/api/checkcode");
  },
  // 获取七牛云上传token
  api_get_qiniu() {
    return instance.get('/api/qiniu');
  },
  // 登录
  api_post_login(data) {
    return instance.post('/api/login', data);
  },
  // 注册
  api_post_user(data) {
    return instance.post('/api/user', data);
  },
  // 修改密码
  api_put_user(_id, data) {
    return instance.put(`/api/user/${_id}`, data);
  },
  // 获取文章列表
  api_get_article({ current_page = 1, page_size = 10, keyword = '', tag = '', publish =  '' }) {
    return instance.get(`/api/article?current_page=${current_page}&page_size=${page_size}&keyword=${keyword}&tag=${tag}&publish=${publish}`);
  },
  // 添加文章
  api_post_article(data) {
    return instance.post('/api/article', data);
  },
  // 获取文章详情
  api_get_article_detail(_id) {
    return instance.get(`/api/article/${_id}`);
  },
  // 修改文章
  api_put_article(_id, data) {
    return instance.put(`/api/article/${_id}`, data);
  }, 
  // 删除文章
  api_delete_article(_id) {
    return instance.delete(`/api/article/${_id}`);
  },
  // 获取标签列表
  api_get_tag() {
    return instance.get('/api/tag');
  },
  // 添加标签
  api_post_tag(data) {
    return instance.post('/api/tag', data);
  },
  // 删除标签
  api_delete_tag(_id) {
    return instance.delete('/api/tag/' + _id);
  },
  // 修改标签
  api_put_tag(data) {
    return instance.put(`/api/tag/${data._id}`, data);
  },
  // 获取 work 列表
  api_get_work() {
    return instance.get('/api/work');
  },
  // 添加 work 
  api_post_work(data) {
    return instance.post('/api/work', data)
  },
  // 修改 work
  api_put_work(data) {
    return instance.put(`/api/work/${data._id}`, data);
  },
  // 删除 work
  api_delete_work(_id) {
    return instance.delete(`/api/work/${_id}`);
  },
  // 获取设置
  api_get_set() {
    return instance.get('/api/set');
  },
  // 修改设置
  api_put_set(data) {
    return instance.put('/api/set', data);
  }
}