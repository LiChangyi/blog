<template>
  <div class="page_404">
    <div class="box">
      <p class="p_404">404</p>
      <p class="p1">OMG ! THIS PAGE CANNOT BE FOUND! </p>
      <p class="p2">You can visit other websites.</p>
    </div>
  </div>
</template>

<style lang="scss">
.page_404 {
  background-image: url("http://image.lcylove.cn/1659a635536_3715ef86");
  background-position: center;
  min-height:calc(100vh - 100px );
  .box {
    transform: translate(0,100%);
    text-align: center;
    color: #fff;
    p {
      line-height: 1.2;
    }
    .p_404 {
      font-size: 180px;
      font-weight: bolder;
    }
    .p1 {
      font-size: 34px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .p2 {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 736px){
    .box {
       transform: translate(0,80%);
      .p_404 {
        font-size: 100px;
      }
    }
  }
}
</style>
