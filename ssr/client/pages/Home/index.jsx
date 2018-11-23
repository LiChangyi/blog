import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import AsiticleItem from '../../components/ArticleItem';
import Aside from '../../components/Aside';
import Paginatortion from '../../components/Paginatortion';
import Toset from '../../components/Toast';
import BgCover from '../../components/BgCover';
import { getArts, getTags } from '../../store/action';
import clientApi from '../../axios/clientApi';
import './index.scss';

const defaultPagination = {
  total: 0,
  current_page: 1,
  page_size: 6
};

const coverInfo = {
  title: "PAWN ' s Blog",
  descript: '分享前端技术，学习前端知识！',
  cover: 'https://image.lcylove.cn/blog_home_cover'
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      bindKeyWord: '',
      tagId: ''
    };
  }

  componentDidMount() {
    const openMeBtn = document.getElementsByClassName('open-me')[0];
    openMeBtn.style.display = 'block';
    if ( !this.props.arts.isRequest ) {
      this.props.getArts(defaultPagination);
    }

    if ( !this.props.tags.isRequest ) {
      this.props.getTags();
    }
  }

  componentWillUnmount() {
    const openMeBtn = document.getElementsByClassName('open-me')[0];
    openMeBtn.style.display = '';
  }

  page_jump(num) {
    const { total = 0, page_size = 6 } = this.props.arts.pagination;
    const total_page = Math.ceil(total / page_size);
    if ( num <= 0 ) {
      Toset.error('已经是第一页啦~~');
      return;
    }
    if ( num > total_page) {
      Toset.error('已经是最后一页~~');
      return;
    }
    const opts = Object.assign(this.props.arts.pagination, {
      current_page: num,
      keyword: this.state.keyword,
      tagId: this.state.tagId
    });
    this.props.getArts(opts);
  }

  // 标签搜索
  searchTag(tagId) {
    this.setState(() => ({
      tagId
    }));
    const opts = Object.assign(this.props.arts.pagination, {
      keyword: this.state.keyword,
      tagId
    });
    this.props.getArts(opts);
  }

  keywordChange(bindKeyWord) {
    this.setState(() => ({
      bindKeyWord
    }));
  }

  searchkeyWord() {
    const keyword = this.state.bindKeyWord;
    this.setState(() => ({
      keyword
    }));
    const opts = Object.assign(this.props.arts.pagination, {
      keyword,
      tagId: this.state.tagId
    });
    this.props.getArts(opts);
  }

  render() {
    const { data, pagination } = this.props.arts;
    let title = '全部文章';
    if (this.state.tagId !== '' || this.state.keyword !== '') {
      title = '搜素 =>';
    }
    if ( this.state.tagId !== '' ) {
      const tag = this.props.tags.data.find(item => item._id === this.state.tagId);
      if (tag) {
        title += ` 标签:${tag.name}`;
      }
    }
    if ( this.state.keyword !== '' ) {
      title += ` 关键字:${this.state.keyword}`;
    }

    let showContent = '没有文章呀, 兄dei!!';
    if (data.length !== 0 ) {
      showContent = data.map(item => (
        <AsiticleItem searchTag={ tagId => this.searchTag(tagId) } key={ item._id } article={ item } tags={ this.props.tags.data } />
      ));
    }
    return (
      <Fragment>
        <Helmet>
          <title>首页 | Pawn ' s Blog</title>
        </Helmet>
        <BgCover coverInfo={ coverInfo } />
        <main className="home-page page-container">
          <p className="home-title">{title}</p>
          <div className="wrap">
            <div className="article-box">
              { showContent }
            </div>
            <Aside
              keyword={ this.state.bindKeyWord }
              keywordChange={ val => this.keywordChange(val) }
              searchkeyWord={ () => this.searchkeyWord() }
              tags={ this.props.tags.data }
              searchTag={ tagId => this.searchTag(tagId) }
            />
            <Paginatortion
              pagination={ pagination }
              page_jump={ num => this.page_jump(num) }
            />
          </div>
        </main>
      </Fragment>
    );
  }
}

// 获取文章列表,获取标签信息

const mapStateToProps = state => ({
  arts: state.arts,
  tags: state.tags
});

const mapDispatchToProps = dispatch => ({
  getArts(opts) {
    dispatch(getArts(clientApi, opts));
  },
  getTags() {
    dispatch(getTags(clientApi));
  }
});

const exportClass = connect(mapStateToProps, mapDispatchToProps)(Home);

exportClass.loadData = (store, serverApi) => (
  Promise.all(
    [
      store.dispatch(getArts(serverApi, defaultPagination)),
      store.dispatch(getTags(serverApi))
    ]
  )
);

export default exportClass;
