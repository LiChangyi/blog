<template>
  <main class="archives">
    <div class="bg_img" :style='"background-image:url("+bg_url+");"'>
      <div class="box">
        <p class="bg_img_title">Archives</p>
        <hr/>
        <p class="bg_img_dest">他们说鱼只有7秒的记忆,但是网络的记忆能保持很久很久</p>
      </div>
    </div>
    <div class="page_container">
      <ArchItem v-for="(item,key,index) in list"
      :key=index
      :title=key
      :list=item></ArchItem> 
    </div>
  </main>
</template>

<script>
import ArchItem from '@/components/Arch_item'
import {format_date} from '@/plugins/utils'

export default {
  metaInfo(){
    return {
      title: "归档 | PAWNs'blog",
      mate: [{
        name: 'keywords',
        content: "Pawn的博客 李昌义的博客 前端 前端学习 前端交流"
      },{
        name: 'description',
        content: this.meta_description
      }]
    }
  },
  components: {ArchItem},
  async created(){
    let {article_list = [], work_list = []} = await this.$store.dispatch('get_archives_api');
    this.article_list = article_list.map( item => {
      return {
        _id: item._id,
        article_create_time: format_date(item.article_create_time),
        article_state: item.article_state,
        article_title: item.article_title,
        article_update_time: format_date(item.article_update_time)
      }
    }); 
  },
  data(){
    return {
      article_list:[]
    }
  },
  computed: {
    list(){
      let json = {};
      this.article_list.forEach( item => {
        let time = item.article_create_time.substring(0,7);
        if(json[time] == null){
          json[time] = [];
        }
        json[time].push(item);
      })
      return json;
    },
    meta_description(){
      let str = '';
      this.article_list.forEach(item => {
        str += `${item.article_title} `
      })
      return str;
    },
    bg_url(){
      let img_url = this.$store.state.setting.data[0];
      return img_url==null?"":img_url.website_cover.archives
    }
  }
}
</script>

<style lang="scss">
.archives {
  .page_container {
    padding: 0 10px;
    box-sizing: border-box;
  }
}
  
</style>

