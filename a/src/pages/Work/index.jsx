import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet'
import axios from '../../axios';
import Layer from '../../components/Layer';
import Toast from '../../components/Toast';
import Modal from '../../components/Modal';
import { action as workAction } from '../../store/work';
import './index.scss';

const { confirm } = Modal;

class Work extends React.Component {
  constructor() {
    super();
    this.state = {
      layer: {
        title: "修改作品",
        isShow: false
      },
      currentData: {
        _id: '',
        name: '',
        descript: '',
        time: '',
        website: '',
        cover: ''
      }
    }
  }
  render() {
    const layerForm = [
      {
        name: '作品名',
        key: 'name'
      }, {
        name: '描述',
        key: 'descript'
      }, {
        name: '时间',
        key: 'time'
      }, {
        name: '网址',
        key: 'website'
      }, {
        name: '封面',
        key: 'cover'
      }
    ];
    return (
      <div className="work-page">
        <Helmet>
          <title>作品管理 | Pawn 's Blog</title>
        </Helmet>
        <div className="tool">
          <button className="btn"
           onClick={ () => this.addWork() }>添加作品</button>
        </div>
        <div className="work-list">
          <ul className="work-item table-th">
            <li className="name">名称</li>
            <li className="descript">描述</li>
            <li className="time">时间</li>
            <li className="website">网址</li>
            <li className="cover">封面</li>
            <li className="operator">操作</li>
          </ul>
          {
            this.props.workInfo.get("data").map( work => {
              return <WorkItem
                key = { work._id }
                work = { work }
                modifyWork = { (work) => this.modifyWork(work) }
                deleteWork = { (work) => this.deleteWork(work) } />; 
            })
          }
        </div>
        <Layer
          layer={ this.state.layer }
          data={ this.state.currentData }
          formData= { layerForm }
          changeCurrentData={ (val,key) => this.changeCurrentData(val,key) }
          handleLayer={ (bool) => this.handleLayer(bool) }
          handleSave={ () => this.handleSave() }/>
      </div>
    );
  }
  changeCurrentData(val,key) {
    let change = {};
    change[key] = val;
    const currentData = Object.assign({}, this.state.currentData, change)
    this.setState( () => ({
      currentData
    }));
  }
  handleLayer(isShow) {
    let layer = Object.assign({}, this.state.layer, { isShow })
    this.setState(() => {
      return {
        layer
      }
    });
  }
  addWork() {
    this.setState(() => ({
      currentData: {
        _id: '',
        name: '',
        descript: '',
        time: '',
        website: '',
        cover: ''
      },
      layer: {
        title: "添加作品",
        isShow: true
      }
    }));
  }
  modifyWork(work) {
    this.setState(() => ({
      currentData: work,
      layer: {
        title: "修改作品",
        isShow: true
      }
    }));
  }
  deleteWork(work) {
    const _slef = this;
    confirm({
      contentText: `你确定删除作品${work.name}吗?`,
      async onOk() {
        let { _id = "" } = work;
        const res = await axios.api_delete_work(_id);
        const { code = 0, msg = ''} = res.data;
        if ( code === 0 ) {
          Toast.error(msg);
          return;
        } else {
          Toast.success(msg);
          _slef.props.deleteWork(_id);
        }  
      }
    })
  }
  async handleSave() {
    let work = this.state.currentData;
    if ( objectKeyIsEmoty(work, ['_id']) ) {
      Toast.error('请填写完整表单信息');
      return;
    }
    if ( work._id === '' ) {
      // 添加 work
      const res = await axios.api_post_work(work);
      const { code = 0, msg = '', data = {}} = res.data;
      if ( code === 0 ){
        Toast.error(msg);
        return;
      } else {
        Toast.success(msg);
        this.props.addWork(data);
        this.handleLayer(false);
      }
    } else {
      // 修改
      const res = await axios.api_put_work(work);
      const { code = 0, msg = '', data = {}} = res.data;
      if ( code === 0 ){
        Toast.error(msg);
        return;
      } else {
        Toast.success(msg);
        this.props.changeWork(data);
        this.handleLayer(false);
      }
    }
  }
  async componentDidMount() {
    const isRequest = this.props.workInfo.get('isRequest');
    if ( isRequest ) {
      // 请求 work 数据
      const res = await axios.api_get_work();
      const { code = 0, msg = '', data = []} = res.data;
      if ( code === 0 ){
        Toast.error(msg);
        return;
      } else {
        Toast.success(msg);
        this.props.initWork(data);
      }
    }
  }
}

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

// 无状态组件 workItem 
const WorkItem = (props) => {
  const { work = {} } = props;
  return (
    <ul className="work-item">
      <li className="name">{ work.name }</li>
      <li className="descript">{ work.descript }</li>
      <li className="time">{ work.time }</li>
      <li className="website">
        <a className="website-link" href={ work.website }
          rel="nofollow me noopener noreferrer" target="_blank"
          title={ "在新窗口中打开" + work.website }>{ work.website }</a>
      </li>
      <li className="cover">
        <a href={ work.cover } rel="nofollow me noopener noreferrer" target="_blank">
          <img className="cover-img" src={ work.cover } alt="" />
        </a>
      </li>
      <li className="operator">
        <button className="btn green-btn"
          onClick={ () => props.modifyWork(work) }>修改</button>
        <button className="btn red-btn"
          onClick={ () => props.deleteWork(work) }>删除</button>
      </li>
    </ul>
  );
}


const mapStateToProps = (state) => ({
  workInfo: state.work
})

const mapDispatchToprops = (dispatch) => ({
  initWork(data) {
    dispatch(workAction.initWork(data));
  },
  addWork(data) {
    dispatch(workAction.addWork(data));
  },
  deleteWork(_id) {
    dispatch(workAction.deleteWork(_id));
  },
  changeWork(data) {
    dispatch(workAction.changeWork(data));
  }
})

export default connect(mapStateToProps, mapDispatchToprops)(Work);
