import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SimpleMDE from 'react-simplemde-editor';
import Toast from '../../components/Toast';
import { action as tagAction } from '../../store/tag';
import axios from '../../axios';
import "simplemde/dist/simplemde.min.css";
import './index.scss';
import './markdown.css';

class Writing extends React.Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      article: {
        title: '',
        tag: [],
        publish: 1,
        cover: '',
        descript: '',
        content: ''
      }
    }
  }
  render() {
    return (
      <div className="writing-page">
        <Helmet>
          <title>写作 | Pawn 's Blog</title>
        </Helmet>
        <div className="artitle-info">
          <div className="item">
            <span className="item-title">标题</span>
            <div className="contains">
              <input className="text-input" type="text" placeholder="文章标题"
                value={ this.state.article.title }
                onChange={ (e) => { 
                  let value = e.target.value;
                  this.handleChange(value, 'title');
                } }/>
            </div>
          </div>
          <div className="item">
            <span className="item-title">标签</span>
            <div className="contains">
              {
                this.props.tagInfo.get('data').map( item => {
                  return (
                    <label className="label-item" key={ item._id }>
                      <input className="checkbox-input" type="checkbox" name="tag"
                        value={ item._id }
                        checked={ this.state.article.tag.includes(item._id) }
                        onChange={ (e) => this.handleChangeTag(e) }/>
                      <span className="label-name" title={ item.descript }>{ item.name }</span>
                    </label>
                  );
                })
              }
            </div>
          </div>
          <div className="item">
            <span className="item-title">状态</span>
            <div className="contains">
              <label className="label-item">
                <input className="radio-input" type="radio" name="publish"
                 value='1'
                 checked={ this.state.article.publish === 1}
                  onChange={ () => this.handleChange(1, 'publish') }/>
                <span className="label-name">Published</span>
              </label>
              <label className="label-item">
                <input className="radio-input" type="radio" name="publish"
                  value="0"
                  checked={ this.state.article.publish === 0}
                  onChange={ () => this.handleChange(0, 'publish') }/>
                <span className="label-name">Draft</span>
              </label>
            </div>
          </div>
          <div className="item">
            <span className="item-title">封面</span>
            <div className="contains">
              <input className="text-input" type="text" placeholder="图片地址"
                value={ this.state.article.cover }
                onChange={ (e) => { 
                  let value = e.target.value;
                  this.handleChange(value, 'cover');
                } }/>
              <img className="show-cover" src={ this.state.article.cover } alt="封面预览"/>
            </div>
          </div>
          <div className="item">
            <span className="item-title">描述</span>
            <div className="contains">
              <input className="text-input" type="text" placeholder="文章描述"
                value={ this.state.article.descript }
                onChange={ (e) => { 
                  let value = e.target.value;
                  this.handleChange(value, 'descript');
                } }/>
            </div>
          </div>
        </div>
        <div className="content">
          <SimpleMDE
            className="markdown-body"
            value={ this.state.article.content }
            onChange={ (value) => this.handleChange(value,"content") }
            options={{
              autosave: {
                enabled: true,
                uniqueId: "article-content"
              }
            }}/>
          <div className="tool">
            <input id="update-md"
              type="file"
              onChange={ (e) => this.updateMD(e) }/>
              <button className="btn">
                <label className="btn-label" htmlFor="update-md">上传 MD</label>
              </button>
            <button className="btn"
              onClick={ () => this.handleSave() }>发表&保存</button>
          </div>
        </div>
      </div>
    );
  }
  handleChangeTag(e) {
    const val = e.target.value;
    const checked = e.target.checked;
    let temp = [];
    const tag = this.state.article.tag;
    if ( checked ) {
      temp = [...tag,val];
    } else {
      temp = tag.filter( item => item !== val);
    }
    this.handleChange(temp, 'tag');
  }
  handleChange(value,key) {
    let temp = {};
    temp[key] = value;
    const article = Object.assign({},this.state.article, temp);
    this.setState(() => ({
      article
    }));
  }
  updateMD(e) {
    let _self = this;
    let obj = e.target;
    let fileName = obj.files[0].name;
    if(fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase() !== 'md'){
      Toast.error("请上传markdown的文件！");
      return;
    }
    let fileReader = new FileReader();
    fileReader.readAsText(obj.files[0]);
    
    fileReader.onload = function () {
      let result = this.result;
      try {
        const article = Object.assign({},_self.state.article, { content: result});
        _self.setState(() => ({
          article
        }));
      }
      catch (e) {
        console.log("Storage failed: " + e);
      }
    }
  }
  async handleSave() {
    let res;
    // 看是修改文章还是添加文章
    if ( this.state._id === "" ) {
      res = await axios.api_post_article(this.state.article);
    } else {
      res = await axios.api_put_article(this.state._id, this.state.article);
    }
    const { code = 0, msg = ''} = res.data;
    if ( code === 0 ){
      Toast.error(msg);
    } else {
      Toast.success(msg);
      // 清空浏览器缓存
      localStorage.removeItem("smde_article-content");
      setTimeout(() => {
        this.props.history.push('/article');
      }, 2000);
    }
  }
  async componentDidMount() {
    const tagIsRequest = this.props.tagInfo.get('isRequest');
    if( tagIsRequest ) {
      // 获取tag
      this.props.getTag();
    }

    // 判断是添加文章还是修改文章
    const { _id = '' } = this.props.match.params;
    if ( _id !== '' ) {
      // 修改文章
      // 获取文章信息
      const res = await axios.api_get_article_detail(_id);
      const { code = 0, msg = '', data = {}} = res.data;
      if ( code === 0 ){
        Toast.error(msg);
        return;
      } else {
        Toast.success(msg);
        const article = {
          title: data.title,
          tag: data.tag,
          publish: data.publish,
          cover: data.cover,
          descript: data.descript,
          content: data.content
        }
        this.setState(() => ({
          article
        }));
      }
    }
    this.setState(() => ({
      _id
    }))
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

export default connect(mapStateToProps, mapDispatchToProp)(Writing);