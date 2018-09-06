<template>
  <div class="login">
    <div class="login_form">
      <p class="login_title">用户登录</p>
      <div class="login_item">
        <p class="form_title">账号</p>
        <input type="text" v-model="loginInfo.admin_id">
      </div>
      <div class="login_item">
        <p class="form_title">密码</p>
        <input type="password" v-model="loginInfo.admin_pwd">
      </div>
      <div class="login_item">
        <p class="form_title">验证码</p>
        <input type="text" v-model="loginInfo.code" @keyup.enter="login">
        <img :src=check_code_img alt="验证码" class="ver-code" @click="re_code">
      </div>
      <div class="login_item">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created(){
    this.re_code();
  },
  data (){
    return {
      loginInfo:{
        admin_id: '',
        admin_pwd: '',
        code: ''
      },
      check_code_img:'',
      check_code_token:''
    }
  },
  methods: {
    login() {
      if(this.loginInfo.admin_id == '' || this.loginInfo.admin_pwd == '' || this.loginInfo.code == ''){
        alert("请填写完，登录信息！！");
        return;
      }
      this.$http.api_admin_login({
        admin_id: this.loginInfo.admin_id,
        admin_pwd: this.loginInfo.admin_pwd,
        code: this.loginInfo.code,
        token: this.check_code_token
      })
      .then( res => {
        let {code,msg,data} = res.data;
        alert(msg);
        if(code == 200){
          // 将信息保存!
          this.$store.commit("saveAdminInfo",{
            admin_id: data.admin_id || '',
            admin_name: data.admin_name || '',
            token: data.token || ''
          });
          let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/admin');
          //跳转到指定的路由
          this.$router.push({
            path: redirectUrl
          });
        }
      })
    },
    async re_code() {
      let res = await this.$http.api_get_checkcode();
      this.check_code_token = res.data.data.token;
      this.check_code_img = res.data.data.img;
    }
  }
}
</script>


<style lang="scss"> 
  .login {
    $color:#92ACC3;
    background: url('http://image.lcylove.cn/16598d602ac_571542a9');
    background-size: cover;
    width: 100%;
    height: 100vh;
    .login_form {
      border: 1px solid  $color;
      width: 400px;
      margin: 0 auto;
      position: relative;
      top: 200px;
      padding-bottom: 10px;
      transition: box-shadow .3s;
      &:hover{
        box-shadow: 0 0 20px  $color;
      }
      .login_title {
        height: 40px;
        line-height: 40px;
        font-size: 26px;
        padding: 10px 0;
        text-align: center;
        border-bottom: 1px solid  $color;
        color:  $color;
        font-weight: bold;
      }
      .login_item {
        position: relative;
        display: flex;
        height: 25px;
        line-height: 25px;
        padding: 10px;
        margin: 10px 0;
        .form_title {
          width: 80px;
          text-align: right;
          margin-right: 20px;
          color:  $color;
          font-size: 16px;
        }
        input {
          flex: 1;
          margin-right: 20px;
          border: none;
          background-color: transparent;
          border-bottom: 1px dotted  $color;
          outline: none;
          box-sizing: border-box;
          padding-left: 5px;
          font-size: 16px;
          color: $color;
          transition: border .6s;
          &:focus {
            border-bottom-color: red;
          }
          
        }
        img {
          position: absolute;
          right: 30px;
          top: 0;
        }
        button {
          width: 180px;
          height: 40px;
          display: block;
          margin: 5px auto;
          cursor: pointer;
          background: transparent;
          border: 1px solid  $color;
          color:  $color;
          outline: none;
          font-size: 16px;
          letter-spacing: 4px;
          &:active {
            background:  $color;
            color: #666;
          }
        }
      }
    }
  }
</style>
