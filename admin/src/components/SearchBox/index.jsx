import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      checked_tag: 'ALL',
      checked_state: 'ALL',
      search_keyword: ''
    }
    this.handleCheckedTag = this.handleCheckedTag.bind(this);
    this.handleCheckedPublish = this.handleCheckedPublish.bind(this);
    this.handleSearchKeyword = this.handleSearchKeyword.bind(this);
  }
  renderTag() {
    return this.props.tags.map( item => {
      return (
        <label className="label-item" key={ item._id }>
          <input type="radio" name="tags"
            value={ item._id}
            onChange={ this.handleCheckedTag }
            checked= { this.props.searchBox.tag === item._id } />
          <span className="label-name" title={ item.descript }>{ item.name }</span>
        </label>
      );
    })
  }
  render () {
    return (
      <div className="search-box">
        <div className="search-box-item">
          <span className="item-title">标签:</span>
          <label className="label-item">
            <input type="radio" name="tags" value=""
             onChange={ this.handleCheckedTag }
             checked= { this.props.searchBox.tag === "" } />
            <span className="label-name">ALL</span>
          </label>
          { this.renderTag() }
        </div>
        <div className="search-box-item">
          <span className="item-title">状态:</span>
          <label className="label-item">
            <input type="radio" name="publish" value="ALL"
             onChange={ this.handleCheckedPublish }
             checked = { this.props.searchBox.publish === 'ALL'} />
            <span className="label-name">ALL</span>
          </label>
          <label className="label-item">
            <input type="radio" name="publish" value="1"
              onChange={ this.handleCheckedPublish }
              checked = { this.props.searchBox.publish === '1'} />
            <span className="label-name">Published</span>
          </label>
          <label className="label-item">
            <input type="radio" name="publish" value="0"
              onChange = { this.handleCheckedPublish }
              checked = { this.props.searchBox.publish === '0'} />
            <span className="label-name">Draft</span>
          </label>
        </div>
        <div className="search-box-item">
          <span className="item-title">搜素标题:</span>
          <input className="search-input" type="text" placeholder="查询关键字"
           value={ this.props.searchBox.keyword }
           onChange={ this.handleSearchKeyword } />
           <button className="btn"
            onClick={ this.props.search }>搜素</button>
        </div>
      </div>
    );
  }
  // 标签点击事件
  handleCheckedTag(e) {
    this.props.changeSearch('tag', e.target.value);
  }
  // 文章状态改变事件
  handleCheckedPublish(e) {
    this.props.changeSearch('publish', e.target.value);
  }
  // 输入框输入事件
  handleSearchKeyword(e) {
    this.props.changeSearch('keyword', e.target.value)
  }
}

SearchBox.propTypes = {
  searchBox: PropTypes.shape({
    publish: PropTypes.string,
    tag: PropTypes.string,
    keyword: PropTypes.string
  })
}
