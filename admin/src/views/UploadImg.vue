<template>
  <div class="upload_img_page">
    <div class="tool">
      <input type="file" @change="uploadImg">
    </div>
    <div class="upload_list">
      <ul class="upload_item item table_th">
        <li class="upload_realname">Realname</li>
        <li class="upload_codename">Codename</li>
        <li class="upload_size">Size</li>
        <li class="upload_detail">Detail</li>
        <li class="upload_website">website</li>
      </ul>
      <ul class="upload_item item" v-for="(item,index) in upload_list" :key="index">
        <li class="upload_realname">{{item.file_realname}}</li>
        <li class="upload_codename">
          <p>{{item.file_codename}}</p> 
          <div class="preview_box" v-show="item.website">
            <a :href=item.website target="_blank" title="预览">
              <img :src=item.website alt="上传图片预览">
            </a>
          </div>
        </li>
        <li class="upload_size">{{item.file_size}}</li>
        <li class="upload_detail">
          <div class="uploadBox" v-show="!item.detail.hash">
            <div class="progress">
              <div class="bar" :style=item.cur_progress></div>
            </div>
            <button class="btn" @click="upload_cloud(item)">开始上传</button>
          </div>
          <div class="file_detail" v-show="item.detail.hash">
            <p><span>Hash:</span>{{item.detail.hash}}</p>
            <p><span>Bucket:</span>{{item.detail.bucket}}</p>
          </div>
        </li>
        <li class="upload_website">
          <textarea id="website_value" v-model=item.website v-show="item.website" v-copy></textarea>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  async created(){
    let res = await this.$http.api_get_qiniu_token();
    let {code,msg,data} = res.data;
    if(code != 200){
      alert(msg);
    }
    this.token = data.token;
  },
  data(){
    return {
      upload_list:[],
      token: ''
    }
  },
  methods:{
    uploadImg(e){
      let obj = e.target;
      let file = obj.files[0];
      this.upload_list.push({
        file_realname: file.name,
        file_codename: random_file_name(),
        file_size: file.size,
        website: '',
        cur_progress: 'width:0%;',
        detail: {
          hash: '',
          bucket: ''
        },
        file
      })
    },
    upload_cloud(item){
      let putExtra = {
        fname: "",
        params: {},
        mimeType: [] || null
      };
      let config = {
        useCdnDomain: true
      };

      let error = function(err) {
        alert("上传出错")
      };
      let complete = function(res) {
        item.detail.hash = res.hash;
        item.detail.bucket = 'blog';
        item.website = "http://image.lcylove.cn/" + item.file_codename;
        console.log("上传完成！");
      };

      let next = function(res) {
        let percent = res.total.percent || 0;
        item.cur_progress = 'width:' + percent + '%;';
      };

      let subObject = { 
        next: next,
        error: error,
        complete: complete
      };
      let observable = qiniu.upload(item.file, item.file_codename, this.token, putExtra, config);
      let subscription = observable.subscribe(subObject); // 上传开始
      console.log("开始上传！");
    }
  },
  directives:{
    copy:{
      inserted(el){
        el.addEventListener('click', () => {
          el.select();
          document.execCommand("Copy");
          alert("网址已复制好，可贴粘。");
        })
      }
    }
  }
}
function random_file_name() {
  // 随机生成文件名，16进制时间戳+8位随机
  let s = new Date().getTime().toString(16);
  s += '_';
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 8; i++) {
    s += hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  return s;
}
</script>

<style lang="scss">
.upload_img_page {
  .upload_item {
    .upload_codename,.upload_realname,.upload_website {
      width: 200px;
    }
    .upload_codename {
      img{
        margin-top: 5px;
        max-width: 90%;
      }
    }
    .upload_website {
      textarea {
        margin-bottom: 10px;
        background: transparent;
        resize: none;
        width: 100%;
        border: none;
        outline: none; 
      }
    }
    .upload_size {
      width: 100px;
    }
    .file_detail {
      span {
        font-weight: bold;
        margin-right: 5px;
      }
    }
    .upload_detail {
      flex: 1;
      .uploadBox {
        display: flex;
        padding-right: 10px;
        .progress {
          flex: 1;
          border: 1px solid #ccc;
          margin-right: 20px;
          position: relative;
          .bar {
            position: absolute;
            height: 100%;
            background: rgba(232,152,39,0.8);
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
}
</style>
