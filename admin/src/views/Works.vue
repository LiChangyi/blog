<template>
  <div class="works_page">
    <div class="tool">
      <button class="btn" @click="addWorks">添加作品</button>
    </div>
    <div class="works_list">
      <ul class="works_item table_th">
        <li class="works_name">名称</li>
        <li class="works_desc">描述</li>
        <li class="works_time">时间</li>
        <li class="works_website">网址</li>
        <li class="works_cover">封面</li>
        <li class="works_operator">操作</li>
      </ul>
      <ul class="works_item" v-for="item in works_list" :key="item._id">
        <li class="works_name">{{item.works_name}}</li>
        <li class="works_desc">{{item.works_desc}}</li>
        <li class="works_time">{{item.works_time}}</li>
        <li class="works_website">{{item.works_website}}</li>
        <li class="works_cover">
          <a title="在新窗口中打开" :href="item.works_cover" target="_blank"><img :src="item.works_cover" alt="封面"></a>
        </li>
        <li class="works_operator">
          <button class="btn del" @click="del(item)">删除</button>
          <button class="btn alter" @click="alterWorks(item)">修改</button>
        </li>
      </ul>
    </div>
    <LayerWorks
     :layser_data=layer_data
     :layser_title=layer_title
     v-show="layer_mark" 
     @close_layer="close_layer"
     @save="save"></LayerWorks>
  </div>
</template>

<script>
import LayerWorks from '@/components/Layer_works'
export default {
  async created() {
    let res = await this.$http.api_get_work();
    let {code, msg, data = []} = res.data;
    if(code != 200){
      alert(msg);
    }
    this.works_list = data;
  },
  components:{LayerWorks},
  data() {
    return {
      layer_mark: false,
      layer_data: {},
      layer_title: '',
      works_list:[]
    }
  },
  methods:{
    close_layer(bool){
      this.layer_mark = bool;
    },
    addWorks(){
      this.layer_data = {
        _id: '',
        works_name: '',
        works_desc: '',
        works_time: '',
        works_website: '',
        works_cover: ''
      };
      this.layer_title = "添加作品";
      this.layer_mark = true;
    },
    alterWorks(item){
      this.layer_data = JSON.parse(JSON.stringify(item));
      this.layer_title = '修改作品';
      this.layer_mark = true;
    },
    async save(item){
      if(item.works_name == '' || item.works_desc == '' || item.works_time == '' || item.works_website == '' || item.works_cover == ''){
        alert("请填写完表单信息!");
        return;
      }
      if(item._id == ''){
        let res = await this.$http.api_add_work(item);
        let {code, msg, data = {}} = res.data;
        alert(msg);
        if(code == 200){
          this.works_list.push(data);
          this.layer_mark = false;
        }
      }else {
        let res = await this.$http.api_alter_work(item);
        let {code,msg} = res.data;
        alert(msg);
        if(code == 200){
          this.layer_mark = false;
          this.works_list.forEach( item2 => {
            if(item2._id == item._id){
              item2.works_name = item.works_name;
              item2.works_desc = item.works_desc;
              item2.works_time= item.works_time;
              item2.works_website = item.works_website;
              item2.works_cover = item.works_cover;
              return false;
            }
          })
        }
      }
    },
    async del(item){
      if(confirm(`是否确认删除作品 ${item.works_name}？`)){
        let res = await this.$http.api_del_work(item);
        let {code ,msg} = res.data;
        alert(msg);
        if(code == 200){
          this.works_list.forEach( (item2,index,arr) => {
            if(item2._id == item._id){
              arr.splice(index,1);
              return false;
            }
          })
        }
      }
    }
  }
}
</script>


<style lang="scss">
.works_page {
  .works_list {
    li {
      list-style: none;
    }
    .works_item {
      display: flex;
      align-items:center;
      justify-content: center;
      text-align: center;
      word-break: break-all;  
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      .works_name ,.works_website,.works_cover,.works_operator {
        width: 200px;
      }
      .works_time {
        width: 100px;
      }
      .works_desc {
        flex: 1;
      }
      .works_cover {
        img {
          height: 40px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
