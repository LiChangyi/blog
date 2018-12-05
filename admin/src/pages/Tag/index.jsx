import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import axios from '../../axios';
import Layer from '../../components/Layer';
import Toast from '../../components/Toast';
import Modal from '../../components/Modal';
import { action as tagAction } from '../../store/tag';
import './index.scss';

const { confirm } = Modal;

class Tag extends React.Component {
  constructor() {
    super();
    this.state = {
      layer: {
        title: '添加标签',
        isShow: false
      },
      currentData: {
        _id: '',
        name: '',
        descript: '',
      }
    }
  }
  render() {
    const layerForm = [{
      name: '标签名',
      key: 'name'
    }, {
      name: '描述',
      key: 'descript'
    }];
    return (
      <div className="tag-page">
       <Helmet>
          <title>标签管理 | Pawn 's Blog</title>
        </Helmet>
        <div className="tool">
          <button className="btn"
           onClick={ () => this.addTag() }>添加标签</button>
        </div>
        <div className="tags-list">
          <ul className="tags-item table-th">
            <li className="name">名称</li>
            <li className="descript">描述</li>
            <li className="art-num">文章数</li>
            <li className="operator">操作</li>
          </ul>
          {
            this.props.tagInfo.get('data').map( tag => {
              return <TagItem
                key = { tag._id }
                tag = { tag}
                modifyTag = { (tag) => this.modifyTag(tag) }
                deleteTag = { (tag) => this.deleteTag(tag) } />;
            })
          }
        </div>
        <Layer
          layer={ this.state.layer }
          formData={ layerForm }
          data={ this.state.currentData }
          changeCurrentData={ (val,key) => this.changeCurrentData(val,key) }
          handleLayer={ (bool) => this.handleLayer(bool) }
          handleSave={ () => this.handleSave() }/>
      </div>
    );
  }
  // 修改当前的显示数据
  changeCurrentData(val,key) {
    let change = {};
    change[key] = val;
    const currentData = Object.assign({}, this.state.currentData, change)
    this.setState( () => ({
      currentData
    }));
  }
  // layer是否显示
  handleLayer(isShow) {
    let layer = Object.assign({}, this.state.layer, { isShow })
    this.setState(() => {
      return {
        layer
      }
    });
  }
  // layer 保存按钮被点击
  async handleSave() {
    let tag = this.state.currentData;
    if ( objectKeyIsEmoty(tag, ['_id']) ) {
      Toast.error('请填写完整表单信息');
      return;
    }
    if ( tag._id === '' ) {
      // 添加标签
      const res = await axios.api_post_tag(tag);
      const { code = 0, msg = '', data = {}} = res.data;
      if ( code === 0 ) {
        Toast.error(msg);
        return;
      } else {
        Toast.success(msg);
        this.props.addTag(data);
        this.handleLayer(false);
      }
    } else {
      // 修改标签
      const res = await axios.api_put_tag(tag);
      const { code = 0, msg = '', data = {}} = res.data;
      if ( code === 0 ) {
        Toast.error(msg);
        return;
      } else {
        Toast.success(msg);
        this.props.changeOne(data);
        this.handleLayer(false);
      }
    } 
  }
  addTag() {
    this.setState(() => ({
      currentData: {
        _id: '',
        name: '',
        descript: ''
      },
      layer: {
        title: "添加作品",
        isShow: true
      }
    }));
  }
  modifyTag(tag) {
    this.setState( () => {
      return {
        currentData: tag,
        layer: {
          title: "修改作品",
          isShow: true
        }
      }
    })
  }
  // 删除标签
  deleteTag(tag) {
    const _slef = this;
    confirm({
      contentText: `你确定删除标签${tag.name}吗?`,
      async onOk() {
        let { _id = "" } = tag;
        const res = await axios.api_delete_tag(_id);
        const { code = 0, msg = ''} = res.data;
        if ( code === 0 ) {
          Toast.error(msg);
          return;
        } else {
          Toast.success(msg);
          _slef.props.removeOne(_id);
        }  
      }
    })
  }
  componentDidMount() {
    const tagIsRequest = this.props.tagInfo.get('isRequest');
    if( tagIsRequest ) {
      // 获取tag
      this.props.getTag();
    }
  }
}

// 判断object对象是否为空
function objectKeyIsEmoty(obj,exclude) {
  let empty = false;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !exclude.includes(key)) {
      if (obj[key] === null || obj[key] === '') {
        return true;
      } 
    }
  }
  return empty;
}

const mapStateToProps = (state) => ({
  tagInfo: state.tag
})

const mapDispatchToProp = (dispatch) => ({
  getTag() {
    dispatch(tagAction.getTag());
  },
  addTag(data) {
    dispatch(tagAction.addTag(data));
  },
  changeOne(data) {
    dispatch(tagAction.changeOne(data));
  },
  removeOne(_id) {
    dispatch(tagAction.removeOne(_id));
  }
})

// 无状态组件 => 标签的显示
const TagItem = (props) => {
  const { tag = {} } = props;
  return (
    <ul className="tags-item">
      <li className="name">{ tag.name }</li>
      <li className="descript">{ tag.descript }</li>
      <li className="art-num">{ tag.num }</li>
      <li className="operator">
        <button className="btn green-btn"
          onClick={ () => props.modifyTag(tag) }>修改</button>
        <button className="btn red-btn"
          onClick={ () => props.deleteTag(tag) }>删除</button>
      </li>
    </ul>
  );
}

export default connect(mapStateToProps, mapDispatchToProp)(Tag);