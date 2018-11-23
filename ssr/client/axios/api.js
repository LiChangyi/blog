export default instance => ({
  api_get_arts(opts) {
    const {
      current_page: curPage = 1,
      page_size: size = 6,
      keyword = '',
      tagId: tag = ''
    } = opts;
    return instance.get(`/api/article?current_page=${curPage}&page_size=${size}&keyword=${keyword}&tag=${tag}`);
  },
  api_get_set() {
    return instance.get('/api/set');
  },
  api_get_tags() {
    return instance.get('/api/tag');
  },
  // 获取文章详情
  api_get_article(_id) {
    return instance.get(`/api/article/${_id}`);
  },
  // 获取作品详情
  api_get_work() {
    return instance.get('/api/work');
  },
  // 获取归档数据
  api_get_arch() {
    return instance.get('/api/arch');
  }
});
