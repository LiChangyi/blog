<template>
  <div id="app">
    <Header></Header>
    <router-view class="view" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components:{Header,Footer},
  created(){
    this.$store.dispatch('get_setting_api');
    document.body.removeChild(document.getElementById('loading'));
  }
}
</script>

<style lang = "scss">
* { padding: 0;margin: 0;}
a { color: inherit; text-decoration: none;}
body {
  font-size: 0.4rem;
  font-family: '-apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif';
}
.view {
  min-height: 100vh;
}
#app {
  overflow: hidden;
  .page_container {
    width: 100%;
    margin: 0 auto;
  }
  @media screen and (min-width: 736px){
    .prod_item {
      width: 50%;
    }
  }
  @media screen and (min-width: 950px){
    .page_container {
      width: 950px;
    }
    .article_item {
      width: 50%;
    }
    .prod_item {
      width: 33%;
    }
  }
  @media screen and (min-width: 1250px){
    .page_container {
      width: 1250px;
    }
    .article_item {
      width: 33%;
    }
    .prod_item {
      width: 25%;
    }
  }
  .bg_img {
    width: 100%;
    background-image: url('/static/img/home_bg.jpg');
    background-position:center;
    height: 350px;
    background-size: 100% auto ;
    margin-bottom: 40px;
    color: #fff;
    text-align: center;
    .box {
      position: relative;
      top: 40%;
    }
    .bg_img_title {
      font-size: 0.8rem;
      font-weight: bold;
    }
    hr {
      width: 120px;
      margin: 10px auto;
    }
    .bg_img_dest {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 736px){
    .bg_img {
      height: 200px;
      .bg_img_title {
        font-size: 0.6rem;
      }
    }
    .visitor_info input,.visitor_avatar,.visitor_text{
      width: 100%;
    }
  }
}
</style>
