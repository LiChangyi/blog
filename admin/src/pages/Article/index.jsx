import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SearchBox from '../../components/SearchBox';
import Paginatortion from '../../components/Paginatortion';
import formatDate from '../../utils/formatDate';
import axios from '../../axios';
import Toast from '../../components/Toast';
import Modal from '../../components/Modal';
import { action as tagAction } from '../../store/tag';
import './index.scss';

const { confirm } = Modal;

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article_list: [],
      pagination: {
        total: 0,
        current_page: 1,
        page_size: 10
      },
      searchBox: {
        publish: 'ALL',
        tag: '',
        keyword: ''
      }
    }
  }
  renderArticleItem() {
    return this.state.article_list.map( item => {
      return (
        <ul className="article-item" key={ item._id }>
          <li className="title">{ item.title }</li>
          <li className="create_at">{ formatDate(item.create_at) }</li>
          <li className="update_at">{ formatDate(item.update_at) }</li>
          <li className="tags">
            { item.tag.map( (tag, index) => {
              return (
                <span className="tag" key={ index }>{ this.formatTag(tag) }</span>
              );
            }) }
          </li>
          <li className="state">{ Number(item.publish) === 1? 'Publish':'Draft' }</li>
          <li className="operation">
            <button className="btn blue-btn"
              onClick = { () => { window.open(`http://blog.lcylove.cn/article/${item._id}`) } }>预览</button>
            <button className="btn green-btn"
              onClick = { () => this.props.history.push(`/writing/${ item._id }`) }>修改</button>
            <button className="btn red-btn"
              onClick = { () => this.handleDeleteArt(item) } >删除</button>
          </li>
        </ul>
      );
    });
  }
  render() {
    return (
      <div className="article-page">
        <Helmet>
          <title>文章管理 | Pawn 's Blog</title>
        </Helmet>
        <SearchBox
          tags={ this.props.tagInfo.get('data') }
          searchBox = { this.state.searchBox }
          changeSearch = { (key, value) => this.changeSearch(key, value) }
          search = { () => this.search() } />
        <div className="article-list">
          <ul className="article-item table-th">
            <li className="title">文章标题</li>
            <li className="create_at">创建日期</li>
            <li className="update_at">修改日期</li>
            <li className="tags">标签</li>
            <li className="state">状态</li>
            <li className="operation">操作</li>
          </ul>
          { this.renderArticleItem() }
          <Paginatortion
            pagination = { this.state.pagination }
            page_jump = { (num) => this.page_jump(num) }/>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const tagIsRequest = this.props.tagInfo.get('isRequest');
    if( tagIsRequest ) {
      // 获取tag
      this.props.getTag();
    }
    this.getArticle();
  }
  handleDeleteArt(art) {
    const _slef = this;
    confirm({
      contentText: `你确定删除文章${art.title}吗?`,
      async onOk() {
        let { _id = "" } = art;
        const res = await axios.api_delete_article(_id);
        const { code = 0, msg = ''} = res.data;
        if ( code === 0 ) {
          Toast.error(msg);
        } else {
          Toast.success(msg);
          const article_list = _slef.state.article_list;
          _slef.setState( () => ({
            article_list: article_list.filter( item => {
              return item._id !== art._id;
            })
          }))
        }
      }
    })
  } 
  // 搜索框按钮点击事件，根据输入搜索内容
  search() {
    // 修改分页器
    const pagination = Object.assign(this.state.pagination, { current_page: 1});
    this.setState( () => ({
      pagination
    }));
    this.getArticle();
  }
  // 搜索框数据的改变
  changeSearch(key, value) {
    const temp = {};
    temp[key] = value;
    const searchBox = Object.assign(this.state.searchBox, temp);
    this.setState( () => ({
      searchBox
    }));
  }
  changeSearch
  // 通过标签_id返回标签名
  formatTag(_id) {
    const tags = this.props.tagInfo.get('data');
    const tag = tags.find( item => {
      return item._id === _id; 
    }) || {};
    return tag.name || "";
  }
  // 切换页面
  page_jump(num) {
    const max_page = Math.ceil(this.state.pagination.total / this.state.pagination.page_size);
    if ( num === 0 ) {
      Toast.info('当前已经是第一页吶');
    } else if ( num === max_page+1) {
      Toast.info('当前已经是最后一页');
    } else if ( num < 0 || num > max_page) {
      Toast.error("页码有误");
    } else {
      // 跳转修改当前分页器
      const pagination = Object.assign(this.state.pagination, { current_page: num});
      this.setState( () => ({
        pagination
      }));
      // 发请求
      this.getArticle();
    }
    
  }
  // 获取文章
  async getArticle() {
    const json = Object.assign(this.state.pagination, this.state.searchBox);
    const res = await axios.api_get_article(json);
    const { code, msg = '', data = {}} = res.data;
    if ( code === 0 ) {
      Toast.error(msg);
      return;
    }
    Toast.success(msg);
    const article_list = data.list;
    const pagination = data.pagination;
    this.setState(() => ({
      article_list,
      pagination
    }));
  }
}

const mapStateToProps = (state) => ({
  tagInfo: state.tag
})

const mapDispatchToProp = (dispatch) => ({
  getTag() {
    dispatch(tagAction.getTag());
  }
})

export default connect(mapStateToProps, mapDispatchToProp)(Article);