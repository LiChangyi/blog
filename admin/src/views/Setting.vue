<template>
  <div class="setting_page">
    <div class="form">
      <h1 class="title">个人信息</h1>
      <div class="form-item">
        <span class="form-title">关于我 HTML:</span>
        <div v-html="parse_about_me_page" disabled @click="alter_myInfo_content('about_me_page',myInfo.about_me_page)"></div>
      </div>
      <div class="form-tool">
        <button class="btn alter" @click="alter_myInfo">修改</button>
      </div>
    </div>
    <div class="form">
      <h1 class="title">网页封面</h1>
      <div class="form-item">
        <span class="form-title">Home页:</span>
        <input type="text" v-model="website_cover.home">
      </div>
      <div class="form-item">
        <span class="form-title">Production页:</span>
        <input type="text" v-model="website_cover.production">
      </div>
      <div class="form-item">
        <span class="form-title">Archives页:</span>
        <input type="text" v-model="website_cover.archives">
      </div>
      <div class="form-item">
        <span class="form-title">About页:</span>
        <input type="text" v-model="website_cover.about">
      </div>
      <div class="form-tool">
        <button class="btn alter" @click="alter_website_cover">修改</button>
      </div>
    </div>
    <div class="form">
      <h1 class="title">七牛云设置</h1>
      <div class="form-item">
        <span class="form-title">ACCESS_KEY:</span>
        <input type="text" v-model="qiniu.ACCESS_KEY">
      </div>
      <div class="form-item">
        <span class="form-title">SECRET_KEY:</span>
        <input type="text" v-model="qiniu.SECRET_KEY">
      </div>
      <div class="form-item">
        <span class="form-title">Bucket:</span>
        <input type="text" v-model="qiniu.BUCKET">
      </div>
      <div class="form-tool">
        <button class="btn alter" @click="alter({qiniu})">修改</button>
      </div>
    </div>
    <div class="form">
      <h1 class="title">登录设置</h1>
      <div class="form-item">
        <span class="form-title">原密码:</span>
        <input type="text" v-model="admin_pwd.ori_pwd">
      </div>
      <div class="form-item">
        <span class="form-title">新密码:</span>
        <input type="text" v-model="admin_pwd.new_pwd">
      </div>
      <div class="form-item">
        <span class="form-title">确认密码:</span>
        <input type="text" v-model="admin_pwd.re_pwd">
      </div>
      <div class="form-tool">
        <button class="btn alter" @click="alter_admin_pwd">修改</button>
      </div>
    </div>
    <div class="form">
      <h1 class="title">其他设置</h1>
      <div class="form-item">
        <span class="form-title">blog网址:</span>
        <input type="text" v-model="other.blog_website">
      </div>
      <div class="form-item">
        <span class="form-title">ICP备案号:</span>
        <input type="text" v-model="other.ICP">
      </div>
      <div class="form-tool">
        <button class="btn alter" @click="alter({other})">修改</button>
      </div>
    </div>
    <LayerMD
    v-if="layerMD_mark"
    :name=layer_md_name
    :data=layer_md_data
    @close="layerMD_mark = false"
    @save="save"></LayerMD>
  </div>
</template>

<script>
import LayerMD from '@/components/Layer_md';

export default {
  async created(){
    let res = await this.$http.api_get_setting();
    let {code, msg, data} = res.data;
    if(code != 200){
      alert(msg);
      return;
    }
    this.myInfo = data[0].myInfo;
    this.website_cover = data[0].website_cover;
    this.qiniu = data[0].qiniu;
    this.other = data[0].other;

    this.admin_pwd.admin_id = this.$store.state.adminInfo.admin_id;
  },
  data () {
    return {
      layerMD_mark: false,
      layer_md_name: '',
      layer_md_data: '',
      myInfo: {
        about_me_page: ''
      },
      website_cover: {
        home: '',
        production: '',
        archives: '',
        about: ''
      },
      qiniu: {
        ACCESS_KEY: '',
        SECRET_KEY: '',
        BUCKET: ''
      },
      other: {
        ICP: '',
        blog_website: ''
      },
      admin_pwd: {
        admin_id: '', 
        ori_pwd: '', 
        new_pwd: '', 
        re_pwd: ''
      }
    }
  },
  methods: {  
    alter_myInfo(){
      this.alter({
        myInfo:this.myInfo
      })
    },
    alter_website_cover(){
      this.alter({
        website_cover: this.website_cover
      })
    },
    async alter(json){
      let res = await this.$http.api_alter_setting(json);
      let {code, msg} = res.data;
      alert(msg);
    },
    alter_myInfo_content(name,data){
      this.layer_md_name = name;
      this.layerMD_mark = true;
      this.layer_md_data = data;
    },
    save(name,data){
      this.myInfo.about_me_page = data;
      this.layerMD_mark = false;
    },
    async alter_admin_pwd(){
      if(this.admin_pwd.ori_pwd == '' || this.admin_pwd.new_pwd == '' || this.admin_pwd.re_pwd == ''){
        alert("请填写完信息！");
        return;
      }
      if(this.admin_pwd.new_pwd != this.admin_pwd.re_pwd){
        alert('2次密码输入不一致，请重新输入!');
        return;
      }
      let res = await this.$http.api_alter_admin(this.admin_pwd);
      let {code,msg} = res.data;
      alert(msg);
    }
  },
  components:{LayerMD},
  computed: {
    parse_about_me_page: function () {
      return this.myInfo.about_me_page.replace(/\n/g,'<br/>');
    }
  }
}
</script>


<style lang="scss">
.setting_page {
  .form {
    .title {
      font-size: 26px;
      font-weight: bold;
      border-bottom: 1px dotted #ccc;
      padding: 5px 0 10px;
    }
    .form-item {
      display: flex;
      padding: 10px 0;
      align-items:center;
      justify-content: center;
      word-break: break-all; 
      .form-title{
        width: 180px;
        text-align: right;
        padding-right: 20px;
      }
      div {
        border: 1px solid rgb(169, 169, 169);
        height: 150px;
        overflow-x: hidden;
        overflow-y: auto;
        cursor: pointer;
      }
      input,div{
        flex: 1;
        resize: none;
        outline: none;
        font-size: 14px;
        line-height: 22px;
        word-break: break-all;
        padding: 0 5px;
      }
    }
    .form-tool {
      text-align: center;
      button {
        font-size: 16px;
        margin-top: 20px;
        width: 150px;
        height: 38px;
      }
    }
  }
}
</style>
