<template>
  <article class="article_item">
    <div class="box">
      <router-link :to='"/article/"+article._id'
      :title='"创建时间:"+format_date(article.article_create_time)+"\n上次更新:"+format_date(article.article_update_time)'>
        <div class="article_cover">
          <div class="layer"></div>
          <img :src=article.article_cover alt="OMG,图片加载失败">
          <p class="article_time">
            <span class="day">{{format_day(article.article_update_time)}}</span>
            <span class="month">{{format_month(article.article_update_time)}}月</span>
          </p>
        </div>
      </router-link>
      <div class="article_info">
        <router-link :to='"/article/"+article._id' title="查看全文">
          <p class="article_title">{{article.article_title}}</p>
        </router-link>
        <p class="article_desc">{{article.article_desc}}</p>
        <div class="article_tags">
          <i class="iconfont icon-tag"></i>
           <span v-for="(tag,index) in article.article_tags" :key="index"
           :title=tag.tags_desc @click="searce_tag(tag._id)">{{tag.tags_name}}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['article'],
  computed: {
    format_month(){
      return function(val){
        let time = new Date(Number(val));
        let monthArr = ["一","二","三","四","五","六","七","八","九","十","十一","十二",]
        let m = time.getMonth();
        return monthArr[m];
      }
    },
    format_day(val){
      return function(val){
        let time = new Date(Number(val));
        let d = time.getDate();
        return d<10?'0'+d:d;
      }
    },
    format_date(){
      return function(val){
        let time = new Date(Number(val));
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        m = m<10?'0'+m:m;
        d = d<10?'0'+d:d;
        h = h<10?'0'+h:h;
        mm = mm<10?'0'+mm:mm;
        s = s<10?'0'+s:s;
        return y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
      }
    }
  },
  methods: {
    searce_tag(val){
      this.$emit("search_tag", val);
    }
  }
}
</script>


<style lang="scss">
  .article_item {
    width: 100%;
    float: left;
    // margin: 25px 25px 0 0;
    padding: 20px;
    box-sizing: border-box;
    .box {
      box-shadow:0 0 20px rgba(0,0,0,.15);
      width: 100%;
      .article_cover {
        min-height: 200px;
        overflow: hidden;
        position: relative;
        // line-height: 200px;
        .article_time {
          position: absolute;
          top: 20px;
          right: 20px;;
          align-items: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: #fff;
          font-weight: 700;
          text-align: center;
          background-color: rgba(14,20,4,.4);
          line-height: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          span {
            display: block;
          }
          .day {
            font-size: 16px;
          }
          .month {
            font-size: 12px;
            margin-top: 5px;
          }
        }
        img {
          width: 100%;
          transition: transform linear .4s;
        }
        .layer {
          width: 100%;
          height: 100%;
          background-color: rgba(14,20,4,.4);
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
          display: none;
        }
        &:hover {
          img {
            transform: scale(1.2);
          }
          .layer {
            display: block;
          }
        }
      }
      .article_info {
        padding: 10px;
        font-size: 14px;
        color: #666;
        .article_title {
          line-height: 24px;
          font-size: 16px;
          color:#242f35;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .article_desc {
          margin: 15px 0;
          overflow: hidden;
          line-height: 22px;
          height: 44px;
          word-break: break-all;
          overflow: hidden;  /** 隐藏超出的内容 **/
        }
      }
      .article_tags {
        margin-bottom: 10px;
        >* {
          vertical-align: bottom;
        }
        span {
          display: inline-block;
          padding-right: 10px;
          cursor: pointer;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
</style>
