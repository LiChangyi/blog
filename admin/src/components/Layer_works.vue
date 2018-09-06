<template>
  <div class="layer_works_component layer_component">
    <div class="box">
      <div class="layer_top">
        <span class="layer_title">{{layser_title}}</span>
      </div>
      <div class="form">
        <div class="form_item">
          <span class="form_item_title">作品名</span>
          <div class="form_item_content">
            <input type="text" v-model="layser_data.works_name">
          </div>
        </div>
        <div class="form_item">
          <span class="form_item_title">描述</span>
          <div class="form_item_content">
            <input type="text" v-model="layser_data.works_desc">
          </div>
        </div>
        <div class="form_item">
          <span class="form_item_title">时间</span>
          <div class="form_item_content">
            <input type="text" v-model="layser_data.works_time">
          </div>
        </div>
        <div class="form_item">
          <span class="form_item_title">网址</span>
          <div class="form_item_content">
            <input type="text" v-model="layser_data.works_website">
          </div>
        </div>
        <div class="form_item">
          <span class="form_item_title">封面</span>
          <div class="form_item_content">
            <input type="text" v-model="layser_data.works_cover">
          </div>
        </div>
      </div>
      <div class="layer_tool">
        <button class="btn" @click="close_layer">关闭</button>
        <button class="btn" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    layser_data:{
      default:{
        _id: '',
        works_name: '',
        works_desc: '',
        works_time: '',
        works_website: '',
        works_cover: ''
      }
    },
    layser_title: {
      default:'添加作品'
    }
  },
  methods:{
    close_layer(){
      this.$emit("close_layer",false)
    },
    save(){
      this.$emit('save', this.layser_data)
    }
  }
}
</script>


<style lang="scss">
.layer_component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  color: #000;
  .box {
    width: 600px;
    box-shadow: 2px 0 20px #000;  
    margin: 100px auto;
    background: #fff;
    .layer_top {
      font-size: 26px;
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    .form {
      .form_item {
        display: flex;
        height: 39px;
        line-height: 39px;
        padding: 5px 0;
        justify-content: center;
        align-items: center;
        .form_item_title {
          width: 150px;
          min-width: 150px;
          text-align: right;
          margin-right: 20px;
        }
        .form_item_content {
          flex: 1;
          padding: 5px 20px 5px 0;
          input{
            width: 100%;
            height: 29px;
            box-sizing: border-box;
            padding-left: 5px;
            font-size: 16px;
            line-height: 29px;
            background-color: transparent;
            color: inherit;
            border: none;
            border-bottom: 1px dotted #ccc;
            outline: none;
            transition: border-bottom-color .6s;
            &:focus {
              border-bottom-color: red;
            }
          }
        }
      }
    }
    .layer_tool {
      padding: 10px 0;
      border-top: 1px solid #ccc;
      text-align: right;
      button {
        width: 60px;
        margin-right: 20px;
      }
    }
  }
}
</style>
