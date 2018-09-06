<template>
  <aside class="page_aside" v-click>
    <div class="layer">
      <div class="search_box">
        <input type="text" placeholder="Search..." v-model="search_val" @keyup.enter="search">
        <i class="iconfont icon-iconfontzhizuobiaozhun22" @click="search"></i>
      </div>
      <div class="brief_box">
        <p class="page_aside_title">简介</p>
        <p class="brief_item">李昌义</p>
        <p class="brief_item" title="成都大学2016级计算机科学与技术">(CDU)2016级计算机科学与技术</p>
        <p class="brief_item"><a href="mailto:1052069088@qq.com" :title='"电子邮箱\n1. 1052069088@qq.com\n2. lichangyigod@gmail.com"' target="_blank">Email</a></p>
        <p class="brief_item"><a href="http://github.com/lichangyi" title="github搜索: LiChangyi" target="_blank">GitHub</a></p>
        <p class="brief_item"><a href="https://juejin.im/user/59eeff42f265da43070275e1" title="掘金搜索: Pawn2018" target="_blank">掘金</a></p>
      </div>
      <div class="categories_box">
        <p class="page_aside_title">文章分类</p>
        <p class="categorige_item" title="查看全部"
        @click="search_tag('')">ALL</p>
        <p class="categorige_item" 
        v-for="(item,index) in tag_list" :key="index"
        :title="item.tags_desc"
        @click="search_tag(item._id)">{{item.tags_name}}({{item.tags_article_num}})</p>
      </div>
   </div>
  </aside>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('get_tag_api');
  },
  computed: {
    tag_list(){
      return this.$store.state.tag.data;
    }
  },
  data(){
    return {
      search_val: ''
    }
  },
  methods: {
    search() {
      this.$emit("search_keyword", this.search_val);
      let page_aside = document.getElementsByClassName('page_aside')[0];
      page_aside.classList.remove("page_aside_show");
    },
    search_tag(val){
      this.$emit("search_tag", val);
      let page_aside = document.getElementsByClassName('page_aside')[0];
      page_aside.classList.remove("page_aside_show");
    }
  },
  directives: {
    click: {
      inserted(el) {
        el.onclick = function (e){
          let obj = e.target;
          if(obj.tagName != "ASIDE") return;
          let page_aside = document.getElementsByClassName('page_aside')[0];
          page_aside.classList.remove("page_aside_show")
        }
      }
    }
  }
}
</script>


<style lang="scss">
  .page_aside {
    .layer {
       margin-top: 25px;
      font-size: 16px;
      box-sizing: border-box;
      padding-right: 15px;
    }
    .search_box {
      position: relative;
      input {
        display: block;
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        padding: 8px 46px 8px 20px;
        outline: 0;
        color: inherit;
        border: none;
        border-radius: 22px;
        background-color: rgba(164,177,191,.15);
        box-shadow: none;
        transition: box-shadow .3s;
        &:hover, &:focus {
          box-shadow: inset 0 0 0 2px #353030;
        }
      }
      i {
        position: absolute;
        top: 50%;
        right: 14px;
        transform: translateY(-50%);
        font-size: 18px;
        color: #353030;
      }
    }
    .page_aside_title {
      position: relative;
      color: #242f35;
      padding-left: 16px;
      margin: 30px auto 20px;
      font-weight: 400;
      height: 20px;
      line-height: 20px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 4px;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        background: #1a1818;
        background: linear-gradient(to bottom,#1a1818 35%,#353030 100%) left center no-repeat;
        background-size: 100%;
      }
    }
    .brief_item {
      font-size: 14px;
      color: #666;
      text-align: center;
      line-height: 2;
      a:hover {
        color: #353030;
      }
    }
    .categorige_item {
      margin-left: 16px;
      padding: 10px 0 10px 5px;
      font-size: 14px;
      line-height: 24px;
      color: #353030;
      border-bottom: 1px dotted #d8e5f3;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  @media screen and (max-width: 950px){
    .page_aside {
      display: none;
    }
  }
  .page_aside_show {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1001;
    width: 100% !important;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    .layer {
      width: 300px;
      height: 100%;
      overflow: hidden;
      display: block;
      overflow-y: auto;
      background-color: #f4f7f6;
      margin-top: 0;
      padding: 20px;
    }
  }
</style>
