<template>
  <footer class="footer">
    <div class="to_box">
      <div class="show_toc_min" v-show_toc_min v-if="toComment_show">
        <i class="iconfont icon-caidan6"></i>
      </div>
      <div class="to_comment" v-toComment v-show="toComment_show">
        <i class="iconfont icon-shape"></i>
      </div>
      <div class="open_me" v-open_me v-if="open_me">
        <i class="iconfont icon-wo"></i>
      </div>
      <div class="to_top" v-toTop>
        <i class="iconfont icon-jiantou1"></i>
      </div>
    </div>  
    <div class="copyright">
      <p>All rights reserved 2018 PAWN ' s Blog !</p>
      <p>© {{ICP}}</p>
    </div>
  </footer>
</template>

<script>
import {slowRoll,offsetTop} from "@/plugins/utils"

export default {
  async created(){
    let data = await this.$store.dispatch('get_setting_api');
    if(data.length != 0)
      this.ICP = data[0].other.ICP;
  },
  data (){
    return {
      toComment_show: false,
      open_me: false,
      ICP: ''
    }
  },
  watch: {
    $route(){
      let commentBox = document.getElementById('gitalk_comment');
      if(commentBox == null){
        this.toComment_show = false;
      }else {
        this.toComment_show = true;
      }

      let page_aside = document.getElementsByClassName('page_aside')[0];
      if(page_aside == null){
        this.open_me = false;
      }else {
        this.open_me = true;
      }
    }
  },
  directives: {
    toTop: {
      inserted:function(el){
        el.onclick = function(){
          slowRoll(0);
        }
      }
    },
    toComment:{
      inserted:function(el){
        el.onclick = function() {
          let commentBox = document.getElementById('gitalk_comment');
          let top = offsetTop(commentBox)
          slowRoll(top);
        }
      }
    },
    open_me: {
      inserted(el) {
        el.onclick = function(){
          let page_aside = document.getElementsByClassName('page_aside')[0];
          page_aside.classList.add("page_aside_show")
        }
      }
    },
    show_toc_min: {
      inserted(el) {
        el.onclick = function (){
          let toc = document.getElementById("toc");
          toc.classList.add("toc_min");
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .footer {
    position: relative;
    z-index: 999;
    padding-top: 40px;
    .copyright {
      background: #1a1818;
      background: linear-gradient(to right,#1a1818 35%,#353030 100%);
      border-top: 1px solid #ccc;
      text-align: center;
      color: #fff;
      font-size: 22px;
      padding: 20px 0;
    }
    .to_box {
      display: none;
      z-index: 1000;
      position: fixed;
      bottom: 70px;
      right: 20px;
      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1a1818;
        text-align: center;
        margin-bottom: 5px;
        line-height: 50px;
        cursor: pointer;
      }
      i {
        color: #fff;
        font-size: 22px;
      }
    }
    .open_me {
      display: none;
    }
    .show_toc_min {
      display: none;
    }
    @media screen and (max-width: 950px){
      padding-top: 0;
      .open_me {
        display: block !important;
      }
      .show_toc_min {
        display: block !important;
      }
    }
  }
</style>

