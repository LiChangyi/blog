<template>
  <div class="prod_item">
    <div class="box">
      <a target="_blank" :href="item.works_website">
        <div class="prod_img_cover">
          <div class="cover">
            <p class="prod_desc">{{item.works_desc}}</p>
            <label>点击查看</label>
          </div>
          <img :src=item.works_cover alt="作品图片">
        </div>
      </a>
      <div class="prod_info">
        <p class="prod_name">{{item.works_name}}</p>
        <p class="prod_time">{{item.works_time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>


<style lang="scss">
  .prod_item {
    width: 100%;
    float: left;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    .box {
      .prod_img_cover {
        width: 100%;
        height: 200px;
        overflow: hidden;
        position: relative;
        .cover {
          width: 100%;
          height: 120px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: rgba(0,0,0,0.6);
          color: #fff;
          box-sizing: border-box;
          transition: transform .6s;
          transform: rotateX(90deg);
        }
        .prod_desc {
          font-size: 18px;
          width: 100%;
          margin-bottom: 5px;
        }
        img {
          width: 100%;
          min-height: 100%;
        }
        &:hover {
          .cover {
            transform: rotateX(0deg);
          }
        }
      }
      .prod_info {
        margin-top: 10px;
      }
      .prod_name {
        font-size: 18px;
      }
    }
  }
</style>
