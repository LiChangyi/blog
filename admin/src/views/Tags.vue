<template>
  <div class="tags_page">
    <div class="tool">
      <button class="btn" @click="addTags">添加标签</button>
    </div>
    <div class="tags_list">
      <ul class="tags_item tags_item_th">
        <li class="tags_name">名称</li>
        <li class="tags_desc">描述</li>
        <li class="tags_art_num">文章数</li>
        <li class="tags_operator">操作</li>
      </ul>
      <ul class="tags_item" v-for="item in tags_list" :key="item._id">
        <li class="tags_name">{{item.tags_name}}</li>
        <li class="tags_desc">{{item.tags_desc}}</li>
        <li class="tags_art_num">{{item.tags_article_num}}</li>
        <li class="tags_operator">
          <button class="btn del" @click="del(item)">删除</button>
          <button class="btn alter" @click="alterTage(item)">修改</button>
        </li>
      </ul>
    </div>
    <LayerTags
     :layser_data=layser_data
     :layser_title=layser_title
     v-show="layer_mark" 
     @close_layer="close_layer"
     @save="save"></LayerTags>
  </div>
</template>
 
 <script>
 import LayerTags from '@/components/Layer_tags'

 export default {
   async created() {
     this.$store.dispatch('get_tag_api');
   },
   data(){
      return {
        layer_mark: false,
        layser_data: {},
        layser_title: "添加标签"
      }
   },
   computed: {
     tags_list() {
       return this.$store.state.tag.data;
     }
   },
   methods: {
      close_layer(bool){
        this.layer_mark = bool;
      },
      addTags(){
        this.layser_data = {
          _id: '',
          tags_name: '',
          tags_desc: ''
        }
        this.layser_title = '添加标签';
        this.layer_mark = true;
      },
      alterTage(item){
        this.layser_data = JSON.parse(JSON.stringify(item));
        this.layser_title = "修改标签";
        this.layer_mark = true;
      },
      async save(data){
        let res = {};
        if(data._id == ''){
          res = await this.$http.api_add_tags({
            tags_name: data.tags_name,
            tags_desc: data.tags_desc
          });
        }else {
          res = await this.$http.api_alter_tags({
            _id: data._id,
            tags_name: data.tags_name,
            tags_desc: data.tags_desc
          })
        }
        let {msg = '' ,code = 0} = res.data;
        let res_data = res.data.data || {};
        alert(msg);
        if(code == 200){
          if(data._id == ''){
            this.tags_list.push(res_data);
          }else {
            let tem = this.tags_list.find( item => {
              return item._id == data._id;
            });
            tem.tags_name = res_data.tags_name;
            tem.tags_desc = res_data.tags_desc;
          }
          this.layer_mark = false;
        }
      },
      async del(item){
        if(confirm(`是否确认删除标签名为: ${item.tags_name} 这个标签？`)){
          let res = await this.$http.api_del_tags(item);
          let {code = 0,msg = ''} = res.data;
          alert(msg);
          if(code == 200){
            this.tags_list.forEach((item2,i,arr) => {
              if(item2._id == item._id){
                arr.splice(i,1);
              }
            });
          }
        }
      }
   },
   components: {LayerTags}
 }
 </script>
 

<style lang="scss">
.tags_page {
  .tags_item_th {
    color: #23292F;
    font-weight: bold;
  }
  .tags_item {
    display: flex;
    align-items:center;
    justify-content: center;
    word-break: break-all; 
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    li {
      list-style: none;
    }
    .tags_name, .tags_operator {
      width: 200px;
    }
    .tags_desc {
      flex: 1;
    }
    .tags_operator {
      text-align: center;
    }
    .tags_art_num {
      width: 100px;
      text-align: center;
    }
  }
}
</style>
