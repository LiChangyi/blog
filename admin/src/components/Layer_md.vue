<template>
  <div class="layer_md">
    <div class="box">
      <textarea id="content" v-initEdit v-model="data"></textarea>
      <div class="layer_md_tool">
        <button class="btn del" @click="close">关闭</button>
        <button class="btn look" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import '../../static/css/simplemde.min.css';
import '../../static/css/markdown.css';
let simplemde = null;

export default {
  props:['name','data'],
  directives:{
    initEdit:{
      inserted(el){
        simplemde = new SimpleMDE({ 
          element:el,
       });
       document.getElementsByClassName('editor-preview-side')[0].classList.add('markdown-body');
      }
    }
  },
  methods: {
    close(){
      this.$emit("close");
    },
    save(){
      this.$emit("save",this.name,simplemde.value());
    }
  }
}
</script>

<style lang="scss">
  .layer_md {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    min-width: 1200px;
    .box {
      background-color: #fff;
      width: 800px;
      overflow: auto;
      margin: 100px auto;
      resize: horizontal;
    }
    .CodeMirror-scroll {
      height: 330px;
    }
    .CodeMirror-fullscreen .CodeMirror-scroll{
      max-height: 100%;
      height: 100%  ;
    }
    .layer_md_tool {
      border-top: 1px solid #ddd;
      padding: 10px;
      text-align: right;
      button + button {
        margin-left: 20px !important;
      }
    }
  }
</style>
