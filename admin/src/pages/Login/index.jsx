import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import axios from "../../axios";
import Toast from "../../components/Toast";
import { actionCreators } from '../../store/user';
import './index.scss';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      show: 'login',
      checkcode: {
        codeToken: '',
        code: '',
        img: ''
      },
      loginInfo: {
        userId: '',
        pwd: ''
      },
      registerInfo: {
        userId: '',
        name: '',
        pwd: '',
        rePwd: '',
        registrationCode: ''
      },
      bgImage: ''
    }
  }
  render() {
    let component;
    if ( this.state.show === 'login' ) {
      component = (
        <div className="form">
          <div className="login">
            <h1 className="title">用户登录</h1>
            <div className="item">
              <span className="item-title">账号</span>
              <input type="text" placeholder="请输入登录账号"
                value = { this.state.loginInfo.userId }
                onChange = { (e) => this.handleChangeLoginFrom(e, 'userId') }/>
            </div>
            <div className="item">
              <span className="item-title">密码</span>
              <input type="password" placeholder="请输入密码"
              value = { this.state.loginInfo.pwd }
              onChange = { (e) => this.handleChangeLoginFrom(e, 'pwd') }/>
            </div>
            <div className="item">
              <span className="item-title">验证码</span>
              <input type="text" placeholder="请输入验证码"
                value = { this.state.checkcode.code } 
                onChange = { (e) => this.handleUpdateCode(e) }
                onKeyUp = { (e) => {
                  if ( e.keyCode === 13 ) {
                    this.handleLogin();
                  }
                }}/>
              <img src={ this.state.checkcode.img } title="点击切换" alt="验证码" className="checkimg"
                onClick={ () => this.getCheckCode() }/>
            </div>
            <div className="tool">
              <button className="form-btn"
                onClick={ () => this.handleLogin() }>登录</button>
              <button className="link-btn"
                onClick={ () => this.handleChangeShow('register') }>没有账号去注册</button>
            </div>
          </div>
        </div>
      );
    } else {
      component = (
        <div className="form">
          <div className="register">
            <h1 className="title">用户注册</h1>
            <div className="item">
              <span className="item-title">账号</span>
              <input type="text" placeholder="请输入登录账号"
                value = { this.state.registerInfo.userId }
                onChange = { (e) => this.handleChangeRegisterFrom(e, 'userId') }/>
            </div>
            <div className="item">
              <span className="item-title">用户名</span>
              <input type="text" placeholder="请输入用户名"
                value = { this.state.registerInfo.name }
                onChange = { (e) => this.handleChangeRegisterFrom(e, 'name') }/>
            </div>
            <div className="item">
              <span className="item-title">密码</span>
              <input type="password" placeholder="请输入密码"
                value = { this.state.registerInfo.pwd }
                onChange = { (e) => this.handleChangeRegisterFrom(e, 'pwd') }/>
            </div>
            <div className="item">
              <span className="item-title">确认密码</span>
              <input type="password" placeholder="请再次输入密码"
                value = { this.state.registerInfo.rePwd }
                onChange = { (e) => this.handleChangeRegisterFrom(e, 'rePwd') }/>
            </div>
            <div className="item">
              <span className="item-title">注册码</span>
              <input type="text" placeholder="请输入注册码"
                value = { this.state.registerInfo.registrationCode }
                onChange = { (e) => this.handleChangeRegisterFrom(e, 'registrationCode') }/>
            </div>
            <div className="item">
              <span className="item-title">验证码</span>
              <input type="text" placeholder="请输入验证码"
                value = { this.state.checkcode.code } 
                onChange = { (e) => this.handleUpdateCode(e) }
                onKeyUp = { (e) => {
                  if ( e.keyCode === 13 ) {
                    this.handleRegister();
                  }
                }}/>
              <img src={ this.state.checkcode.img } title="点击切换" alt="验证码" className="checkimg"
                onClick={ () => this.getCheckCode() }/>
            </div>
            <div className="tool">
              <button className="form-btn"
                onClick={ () => this.handleRegister() }>注册</button>
              <button className="link-btn"
                onClick={ () => this.handleChangeShow('login') }>已经有账号去登录</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="login-page">
        <Helmet>
          <title>后台管理 | Pawn 's Blog</title>
        </Helmet>
        { component }
      </div>
    );
  }
  // 注册
  async handleRegister() {
    const registerForm = Object.assign(this.state.checkcode, this.state.registerInfo, { img: null});
    const res = await axios.api_post_user(registerForm);
    const { code, msg } = res.data;
    if ( code === 0 ) {
      Toast.error(msg);
      // 重新获取验证码
      this.getCheckCode();
      return;
    }
    Toast.success(msg);
    this.props.history.push('/login');
  }
  // 登录
  async handleLogin() {
    const loginForm = Object.assign(this.state.checkcode, this.state.loginInfo, { img: null});
    const res = await axios.api_post_login(loginForm);
    const { code, msg, data = {} } = res.data;
    if ( code === 0 ) {
      Toast.error(msg);
      // 重新获取验证码
      this.getCheckCode();
      return;
    }
    Toast.success(msg);
    this.props.setUserInfo({
      _id: data._id || '',
      userId: data.userId || '',
      name: data.name || '',
      token: data.token || ''
    });
    this.props.history.push('/');
  }
  // 绑定验证码输入框change事件
  handleUpdateCode(e) {
    const checkcode = Object.assign({}, this.state.checkcode, { code: e.target.value });
    this.setState( () => ({ checkcode }))
  }
  // 绑定登录表单change事件
  handleChangeLoginFrom(e, key) {
    const change = {};
    change[key] = e.target.value;
    const loginInfo = Object.assign({}, this.state.loginInfo, change);
    this.setState( () => ({ loginInfo }))
  }
  handleChangeRegisterFrom(e, key) {
    const change = {};
    change[key] = e.target.value;
    const registerInfo = Object.assign({}, this.state.registerInfo, change);
    this.setState( () => ({ registerInfo }))
  }
  // 登录与注册切换
  handleChangeShow(show) {
    this.setState(() => ({
      show
    }))
  }
  async componentDidMount() {
    this.getCheckCode();
  }
  async getCheckCode() {
    const res = await axios.api_get_checkcode();
    const { code, msg, data = {}} = res.data;
    if ( code === 0 ) {
      Toast.error(msg);
      return;
    }
    const checkcode = {
      codeToken: data.token || '',
      code: '',
      img: data.img || ''
    }
    this.setState( () => ({
      checkcode
    }))
  }
}

const mapStateToProps = ( state ) => {
  return {
    user: state.user.get('_id')
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  setUserInfo(userInfo) {
    dispatch(actionCreators.setUserInfo(userInfo));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
