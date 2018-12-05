import React from 'react';
import { NavLink } from "react-router-dom";
import menuList from '../../config/menuConfig';
import Layer from '../Layer';
import Toast from '../Toast';
import Modal from '../Modal';
import axios from '../../axios';
import './index.scss';

const { confirm } = Modal;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: {
        title: "修改密码",
        isShow: false
      },
      currentData: {
        oldPwd: '', 
        pwd: '', 
        rePwd: ''
      },
      userInfo: {
        _id: '',
        name: ''
      }
    }
  }
  renderMenu() {
    return menuList.map( (item, index) => {
      return (
        <li className="nav-item" key={ index }>
          <NavLink exact activeClassName="selected" to={ item.path }>{ item.title }</NavLink>
        </li>
      );
    })
  }
  render() {
    const layerForm = [
      {
        name: '原密码',
        key: 'oldPwd'
      }, {
        name: '新密码',
        key: 'pwd'
      }, {
        name: '确认密码',
        key: 'rePwd'
      }
    ];
    return (
      <div className="warp">
        <div className="user-info">
          <div className="row">
            <img className="user-avatar" src="/img/avatar.jpg" alt="user avatar"/>
          </div>
          <div className="row">
            <span className="user-name">{ this.state.userInfo.name }</span>
          </div>
          <div className="row">
            <button className="logout"
              onClick = { () => this.logout() }>退出登录</button>
          </div>
          <div className="row">
            <button className="logout change-pwd"
              onClick = { () => this.handleLayer(true) }>修改密码</button>
          </div>
        </div>
        <nav className="nav-list">
          { this.renderMenu() }
        </nav>
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
  logout() {
    confirm({
      contentText: '你确定退出登录吗?',
      onOk() {
        window.sessionStorage.removeItem('userInfo');
        Toast.success("退出成功!");
        window.location.href = "/login";
      }
    })
  }
  async handleSave() {
    const res = await axios.api_put_user(this.state.userInfo._id, this.state.currentData);
    const { code = 0, msg = ''} = res.data;
    if ( code === 0 ){
      Toast.error(msg);
    } else {
      Toast.success(msg);
      this.handleLayer(false);
    }
  }
  componentDidMount() {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
    this.setState(() => ({
      userInfo
    }))
  }
}

export default NavLeft;
