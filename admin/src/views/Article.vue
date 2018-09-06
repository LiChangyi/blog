<template>
  <div class="article_page">
    <ul class="search_box">
      <li>
        <span class="search_title">标签:</span>
        <label role="radio">
          <input type="radio" name="tags" v-model="searchJson.tag" value="" checked>
          <span>ALL</span>
        </label>
        <label role="radio" v-for=" item in tag_list" :key="item._id">
          <input type="radio" name="tags" v-model="searchJson.tag" :value=item._id>
          <span>{{item.tags_name}}</span>
        </label>
      </li>
      <li>
        <span class="search_title">状态:</span>
        <label role="radio">
          <input type="radio" name="state" value="" v-model="searchJson.state" checked>
          <span>ALL</span>
        </label>
        <label role="radio">
          <input type="radio" name="state" value="1" v-model="searchJson.state">
          <span>Published</span>
        </label>
        <label role="radio">
          <input type="radio" name="state" value="0" v-model="searchJson.state">
          <span>Draft</span>
        </label>
      </li>
      <li>
        <span class="search_title">搜索:</span>
        <input class="search_input" type="text" v-model="searchJson.keyword" placeholder="标题 内容 . . . ">
        <button class="btn" @click="search">搜索</button>
        <button class="btn">写文章</button>
      </li>
    </ul>
    <div class="article_list">
      <ul class="article_item table_th">
        <li class="article_title">文章标题</li>
        <li class="article_crate">创建日期</li>
        <li class="article_update">修改日期</li>
        <li class="article_tags">标签</li>
        <li class="article_state">状态</li>
        <li class="article_operation">操作</li>
      </ul>      
      <ul class="article_item" v-for="item in article_list" :key="item._id">
        <li class="article_title">{{item.article_title}}</li>
        <li class="article_crate">{{item.article_create_time | formatDate}}</li>
        <li class="article_update">{{item.article_update_time | formatDate}}</li>
        <li class="article_tags">
          <a href="javascript:void(0);"
          v-for="tag in item.article_tags" :key="tag._id"
          :title=tag.tags_desc>
            <span>{{tag.tags_name}}</span>
          </a>
        </li>
        <li class="article_state">{{item.article_state | formatState}}</li> 
        <div class="article_operation">
          <button class="btn look"><a :href='"http://blog.lcylove.cn/#/article/"+item._id' target="_blank">查看</a></button>
          <button class="btn alter" @click="alter(item)">修改</button>
          <button class="btn del" @click="del(item)">删除</button>
        </div>
      </ul>
    </div>
    <Paginator
    :cur_page=Number(pagination.current_page)
    :page_size=Number(pagination.page_size)
    :total=Number(pagination.total)
    @jump="jump"></Paginator>
  </div>
</template>

<script>
import Paginator from '@/components/Paginator'

export default {
  components:{Paginator},
  async created() {
    this.$store.dispatch('get_tag_api');
    this.get_article();
  },
  computed: {
    tag_list() {
      return this.$store.state.tag.data;
    }
  },
  data() {
    return {
      article_list: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total: 100
      },
      searchJson: {
        current_page: 1,
        page_size: 10,
        keyword: '',
        tag: '',
        state: ''
      }
    }
  },
  filters: {
    formatDate(val) {
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
    },
    formatState(val){
      return val==0?"Draft":"Published";
    }
  },
  methods: {
    jump(num){
      this.searchJson.current_page = Number(num);
      this.get_article();
    },
    async get_article(){
      let res = await this.$http.api_get_article_list(this.searchJson);
      let {code , msg, data} = res.data;
      if(code != 200){
        alert(msg);
        return false;
      }
      this.article_list = data.list;
      this.pagination = data.pagination;
      return true;
    },
    search() {
      this.searchJson.current_page = 1;
      this.get_article();
    },
    alter(item){
      this.$router.push(`/admin/addarticle/${item._id}`);
    },
    async del(item){
      let res = await this.$http.api_del_article(item._id);
      let {code, msg} = res.data;
      alert(msg);
      if(code == 200){
        this.article_list.splice(this.article_list.findIndex(i => i._id === item._id), 1);
      }
    }
  }
}
</script>


<style lang="scss">
.article_page {
  box-sizing: border-box;
  ul,li {
    list-style: none;
  }
  .search_box {
    input[type=radio]{
      display: none;
    }
    input[type=radio]:checked+span{
      background-color: #23292F;
      color: #fff;
    }
    li {
      font-size: 18px;
      border-bottom: 1px dotted #666;
      padding: 5px 0;
      height: 50px;
      line-height: 50px;
      label {
        margin: 0 5px;
        font-size: 16px;
        span {
          padding: 5px;
          transition: background-color,color .6s;
          cursor: pointer;
        }
      }
      .search_input {
        margin: 0 5px;
        padding: 5px;
        width: 350px;
        line-height: 150%;
        outline: none;
        border: none;
        border-bottom: 1px dotted #ccc;
        transition: border-bottom-color .6s;
        &::-webkit-input-placeholder {
          color: #23292F; 
        }
        &:focus {
          border-bottom-color: #23292F;
        }
      }
    }
  }
  .article_list {
    padding-top: 20px;
    .article_item {
      display: flex;
      align-items:center;
      justify-content: center;
      text-align: center;
      word-break: break-all;  
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      .article_title {
        width: 200px;
      }
      .article_crate, .article_update {
        width: 300px;
      }
      .article_tags, .article_state {
        width: 100px;
      }
      .article_tags {
        span {
          display: block;
          margin: 5px auto;
        }
      }
      .article_operation {
        flex: 1;
      }
    }
  }
}
</style>
