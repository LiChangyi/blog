<template>
  <div class="add_article_page">
    <ul class="article_info_box">
      <li>
        <span class="article_title">标题:</span>
        <input class="article_input" type="text" placeholder="文章标题" v-model="article.article_title">
      </li>
      <li>
        <span class="article_title">标签:</span>
        <label role="checkbox" v-for=" item in tag_list" :key="item._id">
          <input type="checkbox" name="tags" :value=item._id v-model="article.article_tags">
          <span :title=item.tags_desc>{{item.tags_name}}</span>
        </label>
      </li>
      <li>
        <span class="article_title">状态:</span>
        <label role="radio">
          <input type="radio" name="state" v-model="article.article_state" value="1" checked>
          <span>Published</span>
        </label>
        <label role="radio">
          <input type="radio" name="state" v-model="article.article_state" value="0">
          <span>Draft</span>
        </label>
      </li>
      <li>
        <span class="article_title">封面:</span>
        <input class="article_input" type="text" placeholder="图片地址" v-model="article.article_cover">
        <img :src="article.article_cover" class="article_cover" alt="封面图片">
      </li>
      <li>
        <span class="article_title">描述:</span>
        <input class="article_input" type="text" placeholder="文章描述" v-model="article.article_desc">
      </li>
    </ul>
    <div class="article_content">
      <textarea id="article_content" v-initEdit v-model="article.article_content"></textarea>
    </div>
    <div class="tool">
      <input type="file" @change="getFile" id="uploadMD">
      <label for="uploadMD" >上传MD</label>
      <button @click="save">保存&发表</button>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import '../../static/css/simplemde.min.css';
import '../../static/css/markdown.css';

let simplemde = null;
export default {
  created(){
    this.init_page();  
  },
  data() {
    return {
      article: {
        _id: '',
        article_content: '',
        article_cover: '',
        article_create_time: '',
        article_desc: '',
        article_state: '',
        article_tags: [],
        article_title: '',
        article_update_time: ''
      },
      article_info: {
        cover: ''
      },
      article_content:'',
      timer: 0
    }
  },
  directives:{
    initEdit:{
      inserted(el){
        simplemde = new SimpleMDE({ 
          element:el
       });
       document.getElementsByClassName('editor-preview-side')[0].classList.add('markdown-body');
      }
    }
  },
  methods: {
    getFile(e){
      let _self = this;
      let obj = e.target || null;
      let fileName = obj.files[0].name;
      if(fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase() != 'md'){
        alert("请上传markdown的文件！");
        return;
      }
      let fileReader = new FileReader();
      fileReader.readAsText(obj.files[0]);
      
      fileReader.onload = function () {
        let result = this.result;
        try {
          // 缓存 
          simplemde.value(result);
        }
        catch (e) {
          console.log("Storage failed: " + e);
        }
      }
    },
    async save(){
      this.article.article_content = simplemde.value();
      let res;
      if(this.article._id != ''){
        res = await this.$http.api_alter_article(this.article);
      }else {
        res = await this.$http.api_add_article(this.article);
      }
      let {code, msg, data = []} = res.data;
      alert(msg);
      if(code == 200){
        if(this.article._id == ''){
          localStorage.removeItem("tempData");
        }
        // 跳转到文章列表
        this.$router.push('/admin/article');
      }
    },
    auto_save(){
      this.timer = setInterval(()=>{
        let tempData = {
          article_title: this.article.article_title,
          article_tags: this.article.article_tags,
          article_state: this.article.article_state,
          article_cover: this.article.article_cover,
          article_content: simplemde.value()
        }
        localStorage.setItem("tempData",JSON.stringify(tempData));
      },10000)
    },
    async init_page(){
      this.$store.dispatch('get_tag_api');
      let {id = ''} = this.$route.params;
      if(id != ''){
        let res = await this.$http.api_get_article(id);
        let {code, msg, data =[]} = res.data;
        if(code == 200 && data.length != 0){
          this.article = data[0];
          this.article.article_tags = this.article.article_tags.map( item => {
            return item._id;
          })
          simplemde.value(this.article.article_content);
        }
      }else {
        let tempData = JSON.parse(localStorage.getItem("tempData"));
        if(tempData != null){
          this.article.article_title = tempData.article_title || '';
          this.article.article_tags = tempData.article_tags || [];
          this.article.article_state = tempData.article_state || '';
          this.article.article_cover = tempData.article_cover || '';
          this.article.article_content = tempData.article_content || '';
        }
        this.article._id = '';
        this.article.article_create_time = '';
        this.article.article_update_time = '';
        simplemde.value('');
        // 添加到自动保存
        this.auto_save();
      }
    }
  },
  computed: {
    tag_list() {
      return this.$store.state.tag.data;
    },
    select_tag() {
      return this.article.article_tags.map( item => {
        return item._id;
      })
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    '$route' (to, from) {
      this.init_page();
    }
  }
}
</script>



<style lang="scss">
.add_article_page {
  box-sizing: border-box;
  .article_info_box {
    ul,li {
      list-style: none;
    }
    input[type=radio], input[type=checkbox]{
      display: none;
    }
    input[type=radio]:checked+span,input[type=checkbox]:checked+span{
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
      .article_input {
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
      .article_cover {
        vertical-align: middle;
        height: 100%;
      }
    }
  }
  .article_content .CodeMirror-scroll  {
    max-height: 500px;
    overflow-y: scroll;
  }
  .article_content .CodeMirror-fullscreen .CodeMirror-scroll{
    max-height: 100%;
  }
  .tool {
    text-align: right;
    label {
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
    }
    button,label {
      background-color: #23292F;
      font-size: 14px;
      color: #fff;
      width: 80px;
      height: 30px;
      line-height: 30px;
      border: none;
      outline: none;
      margin: 0 10px;
      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
    input {
      opacity: 0;
      position: relative;
      z-index: -1;
    }
  }
}
</style>
