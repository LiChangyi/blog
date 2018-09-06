<template>
  <nav class="navbar" v-scroll>
    <div class="page_container">
      <router-link to='/?reset=1'>
        <div class="logo">
          <img src="/static/img/logo.png" alt="">
        </div>
      </router-link>  
      <ul class="nav_list">
        <li class="nav_item"><router-link to="/">首页</router-link></li>
        <li class="nav_item"><router-link to="/production">作品</router-link></li>
        <li class="nav_item"><router-link to="/archives">归档</router-link></li>
        <li class="nav_item"><router-link to="/about">关于</router-link></li>
      </ul>
      <ul class="nav_list_min">
        <li class="nav_title" v-addOpen>
          <i class="iconfont icon-caidan6"></i>
        </li>
      </ul>
      <ul class="nav_list_min_box">
        <li class="nav_item"><router-link to="/">首页</router-link></li>
        <li class="nav_item"><router-link to="/production">作品</router-link></li>
        <li class="nav_item"><router-link to="/archives">归档</router-link></li>
        <li class="nav_item"><router-link to="/about">关于</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {throttle} from '@/plugins/utils'
export default {
  data() {
    return {
      nav_min_box: false
    }
  },
  directives: {
    scroll: {
      inserted(el){
        let to_box_btn = document.getElementsByClassName('to_box')[0];
        window.onscroll = throttle(function () {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          if(scrollTop >= 40){
            el.classList.add("fiexd")
            to_box_btn.style.display = 'block';
          }else {
            el.classList.remove("fiexd")
            to_box_btn.style.display = 'none';
          }
        },200)
      }
    },
    addOpen: {
      inserted(el){
        let nav_list_min_box = document.getElementsByClassName('nav_list_min_box')[0];
        el.onclick = function(e) {
          nav_list_min_box.classList.toggle('open');
          window.onclick = function() {
            nav_list_min_box.classList.remove("open")
            window.onclick = null;
          }
          //js阻止事件冒泡
          e.cancelBubble = true;
          e.stopPropagation();
        }
      }
    }
  }
}
</script>


<style lang="scss">
  .navbar {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 14px;
    background-color: rgba(0,0,0,.1);
    transition: background-color .3s;
    z-index: 1000;
    .nav_list_min {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      li {
        display: block;
      }
      .nav_title {
        text-align: center;
        height: 60px;
        width: 60px;
        i{
          font-size: 32px;
        }
      }
      
    }
    .nav_list_min_box {
      position: absolute;
      right: 0;
      width: 100%;
      background: #1a1818;
      background: linear-gradient(to right,#1a1818 35%,#353030 100%);
      font-size: 0.4rem;
      box-sizing: border-box;
      padding: 0.2rem;
      text-align: center;
      color: #fff;
      border-top: 1px solid rgba(255,255,255,.1);
      transform-origin: top;
      transform: translateY(-30%) scaleY(.8);
      opacity: 0;
      z-index: -1;
      transition: transform .3s,opacity .3s;
      visibility: hidden;
      li {
        height: 40px;
        line-height: 40px;
      }
    }
    .open {
      visibility:unset;
      transform: translateY(0) scaleY(1);
      opacity: 1;
      z-index: 2;
      
    }
    .logo {
      height: 60px;
      line-height: 60px;
      padding: 6px 0;
      box-sizing: border-box;
      img {
        height: 48px;
      }
    }
    .page_container {
      position: relative;
    }
    .nav_list {
      position: absolute;
      top: 0;
      right: 0;
    }
    .nav_list .nav_item {
      display: inline-block;
      color: #fff;
      a {
        padding: 0 15px;
        transition: color .3s;
        height: 60px;
        line-height: 60px;
        display: inline-block;
        &:hover {
          color: #62be93;
        }
      }
    }
    .router-link-exact-active {
      color: #62be93;
    }
    @media screen and (max-width: 736px){
      .nav_list {
        display: none;
      }
      .nav_list_min {
        display: block;
      }
      .logo {
        padding-left: 20px;
      }
    }
  }
  .fiexd {
    background: #1a1818;
    background: linear-gradient(to right,#1a1818 35%,#353030 100%);
  }
</style>
