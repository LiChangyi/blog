import React from 'react';
import Helmet from 'react-helmet';
import './index.scss';
import Toast from '../../components/Toast';
import axios from '../../axios';

class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set: {
        _id : "",
        myInfo : "",
        qiniu : {
          ACCESS_KEY: "",
          SECRET_KEY: "",
          BUCKET: ""
        },
        registrationCode: ""
      }
    }
  }
  render() {
    const { myInfo, qiniu, registrationCode} = this.state.set;
    return (
      <div className="set-page">
        <Helmet>
          <title>设置 | Pawn 's Blog</title>
        </Helmet>
        <div className="tool">
          <button className="btn red-btn"
            onClick = { () => this.handleSave() }>保存</button>
        </div>
        <div className="form">
          <h1 className="title">个人信息</h1>
          <div className="item">
            <span className="item-title">关于我Markdown</span>
            <div className="contains">
              <textarea className="about-markdown"
                value = { myInfo }
                onChange = { (e) => this.handleChange(['myInfo'], e.target.value)}></textarea>
            </div>
          </div>
        </div>
        <div className="form">
          <h1 className="title">七牛云设置</h1>
          <div className="item">
            <span className="item-title">ACCESS_KEY</span>
            <div className="contains">
              <input type="text"
                value = { qiniu.ACCESS_KEY }
                onChange = { (e) => this.handleChange(['qiniu', 'ACCESS_KEY'], e.target.value)}/>
            </div>
          </div>
          <div className="item">
            <span className="item-title">SECRET_KEY</span>
            <div className="contains">
              <input type="text"
                value = { qiniu.SECRET_KEY }
                onChange = { (e) => this.handleChange(['qiniu', 'SECRET_KEY'], e.target.value)}/>
            </div>
          </div>
          <div className="item">
            <span className="item-title">Bucket</span>
            <div className="contains">
              <input type="text"
                value = { qiniu.BUCKET }
                onChange = { (e) => this.handleChange(['qiniu', 'BUCKET'], e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="form">
          <h1 className="title">其他设置</h1>
          <div className="item">
            <span className="item-title">用户注册码</span>
            <div className="contains">
              <input type="text"
                value = { registrationCode }
                onChange = { (e) => this.handleChange(['registrationCode'], e.target.value)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleChange(key, value) {
    const temp = JSON.parse(JSON.stringify(this.state.set));
    if ( key.length === 1 ) {
      temp[key[0]] = value;
    }
    const obj = {};
    if ( key.length === 2 ) {
      const obj = temp[key[0]];
      obj[key[1]] = value;
    }
    const set = Object.assign(temp, obj);
    this.setState(() => ({
      set
    }))
  }
  async handleSave() {
    const res = await axios.api_put_set(this.state.set);
    const { code = 0, msg = '', data = []} = res.data;
    if ( code === 0 ){
      Toast.error(msg);
      return;
    } else {
      Toast.success(msg);
      this.setState(() => ({
        set: data
      }))
    }
  }
  async componentDidMount() {
    // 请求 set 数据
    const res = await axios.api_get_set();
    const { code = 0, msg = '', data = {}} = res.data;
    if ( code === 0 ){
      Toast.error(msg);
      return;
    } else {
      Toast.success(msg);
      this.setState(() => ({
        set: data
      }))
    }
  }
}


export default Set;
