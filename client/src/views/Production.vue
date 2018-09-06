<template>
  <main class="prduction">
    <div class="bg_img" :style='"background-image:url("+bg_url+");"'>
      <div class="box">
        <p class="bg_img_title">My Work</p>
        <hr/>
        <p class="bg_img_dest">学习过程中的作品 & 轮子！</p>
      </div>
    </div>
    <div class="page_container">
      <PrduItem v-for="(item,index) in work_list" :key="index"
      :item=item></PrduItem>
    </div>
  </main>
</template>

<script>
import PrduItem from '@/components/Prod_item'
export default {
  metaInfo(){
    return {
      title: "作品 | PAWNs'blog",
      mate: [{
        name: 'keywords',
        content: "Pawn的博客 李昌义的博客 前端 前端学习 前端交流"
      }]
    }
  },
  components: {PrduItem},
  async created(){
    let res = await this.$store.dispatch("get_work_api");
    this.work_list = res;
  },
  data () {
    return {
      work_list: []
    }
  },
  computed: {
    bg_url(){
      let img_url = this.$store.state.setting.data[0];
      return img_url==null?"":img_url.website_cover.production
    }
  }
}
</script>

<style lang="scss">
.prduction {
  .page_container {
    overflow: hidden;
  }
}
</style>

