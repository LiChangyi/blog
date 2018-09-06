<template>
  <div class="arch_item">
    <p class="arch_item_title">{{title | format}}</p>
    <ul>
      <router-link
      :to='"/article/"+item._id'
      :title='"创建时间:"+item.article_create_time+"\n上次更新:"+item.article_update_time'
      v-for="(item,index) in list" :key="index">
        <li>{{item.article_create_time.substring(0,10) + " => " + item.article_title}}{{item.article_state==0?"(未完成)":''}}</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['list','title'],
  filters: {
    format(val){
      let arr = val.split('-');
      return `${arr[0]} 年 ${arr[1]} 月`
    }
  }
}
</script>


<style lang="scss">
.arch_item {
  .arch_item_title {
    position: relative;
    color: #242f35;
    padding-left: 16px;
    margin: 30px auto 20px;
    font-weight: 400;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
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
  ul {
    padding-left: 20px;
    font-size: 16px;
    a {
      li {
        padding: 10px 0;
        color: #666;
      }
      &:hover li{
        color: #353030;
      }
    }
    
  }
}
</style>

