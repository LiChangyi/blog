import * as constants from './constants';

const initArts = data => ({
  type: constants.INIT_ARTS,
  data
});

const initSet = data => ({
  type: constants.INIT_SET,
  data
});

const initTags = data => ({
  type: constants.INIT_TAGS,
  data
});

const initWorks = data => ({
  type: constants.INIT_WORKS,
  data
});

export const setArticle = data => ({
  type: constants.SET_ARTICLE,
  data
});

export const initArch = data => ({
  type: constants.INIT_ARCH,
  data
});

export const getArts = (axios, pagination) => (
  async (dispatch) => {
    try {
      const res = await axios.api_get_arts(pagination);
      const { data = [] } = res.data;
      dispatch(initArts(data));
    } catch (err) {
      console.log(err);
      console.log('请求文章数据失败');
    }
  }
);

export const getSet = axios => (
  async (dispatch) => {
    try {
      const res = await axios.api_get_set();
      const { data = [] } = res.data;
      dispatch(initSet(data));
    } catch (err) {
      console.log('请求set数据失败');
    }
  }
);

export const getArticle = (axios, _id) => (
  async (dispatch) => {
    try {
      const res = await axios.api_get_article(_id);
      const { data = {
        title: "404 | Pawn 's Blog",
        descript: '文章没有找到',
        content: "# 文章没有找到 \n\n # 应该是url错误或者是作者已经删除! \n\n # 请访问作者博客 => [Pawn 's Blog](http://blog.lcylove.cn)"
      } } = res.data;
      dispatch(setArticle(data));
    } catch (err) {
      console.log('获取文章详情失败');
    }
  }
);

export const getWorks = (axios, _id) => (
  async (dispatch) => {
    try {
      const res = await axios.api_get_work(_id);
      const { data = {} } = res.data;
      dispatch(initWorks(data));
    } catch (err) {
      console.log('获取作品信息失败');
    }
  }
);

export const getTags = axios => (
  async (dispatch) => {
    try {
      const res = await axios.api_get_tags();
      const { data = [] } = res.data;
      data.sort((a, b) => (
        a.num < b.num
      ));
      dispatch(initTags(data));
    } catch (err) {
      console.log('请求标签数据失败');
    }
  }
);

export const getArch = axios => (
  async (dispatch) => {
    try {
      const res = await axios.api_get_arch();
      const { data = [] } = res.data;
      dispatch(initArch(data));
    } catch (err) {
      console.log('请求归档数据失败');
    }
  }
);


export default {};
