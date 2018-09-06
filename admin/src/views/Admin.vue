<template>
  <div class="admin_page">
    <div class="left">
      <div class="avatar">
        <img src="/static/img/avatar.jpg" alt="admin avatar">
      </div>
      <div class="logo">
        <span title="点击退出登录" @click="logout">{{$store.state.adminInfo.admin_name}}</span>
      </div>
      <ul class="nav">
        <li><router-link to="/admin/article">文章管理</router-link></li>
        <li><router-link to="/admin/tags">标签管理</router-link></li>
        <li><router-link to="/admin/works">作品管理</router-link></li>
        <li><router-link to="/admin/uploadimg" target="_blank">图片上传</router-link></li>
        <li><router-link to="/admin/setting">全局设置</router-link></li>
        <li><router-link to="/admin/addarticle">写文章</router-link></li>
      </ul>
    </div>
    <div class="right">
      <router-view class="views"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      if(confirm("确认退出登录吗？")){
        this.$store.commit("adminLogout");
        alert("退出登录成功！！")
        this.$router.push("/admin/login")
      }
    }
  }
}
</script>

 
<style lang="scss">
.admin_page {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .left {
    min-width: 200px;
    width: 200px;
    text-align: center;
    box-shadow: 0 0 2px #ccc;
    background-color: #23292F;
    color: #ccc;
    .logo{
      margin: 10px auto;
      font-size: 32px;
      border-bottom: 1px solid #ccc;
      padding: 5px;
      cursor: pointer;
    }
    .avatar {
      padding-top: 10px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .nav {
      padding-top: 50%;
      li {
        margin: 10px 0;
      }
      a {
        color: inherit;
        text-decoration: none;
        font-size: 18px;
        transition: color .4s;
        &:hover {
          color: #666;
        }
      }
      .router-link-exact-active  {
        color: #666;  
      }
    }
  }
  .right {
    flex: 1;
    overflow: auto;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    .btn {
      font-size: 12px;
      padding: 5px 10px;
      margin: 0 5px;
      border: none;
      color: #fff;
      cursor: pointer;
      background-color: #23292F;
      outline: none;
      &:active {
        opacity: 0.6;
      }
    }
    .del {
      background-color: #EA4747;
    }
    .alter {
      background-color: #409eff;
    }
    .look {
      background-color: #67c23a;
    }
    .table_th {
      font-weight: bold;
      color: #23292F;
    } 
    .views {
      min-width: 1200px;
    }
    a {
      text-decoration: none;
      color: inherit;
      transition: color .3s;
      &:hover {
        color: #62be93;
      }
    }
    .tool {
      padding-bottom: 10px;
      border-bottom: 1px dotted #ccc;
      margin-bottom: 10px;
    }
    .item {
      display: flex;
      align-items:center;
      justify-content: center;
      word-break: break-all; 
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      li{
        list-style: none;
        padding: 0 5px;
      }
    }
  }
}
</style>
 