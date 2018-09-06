/*
 * @Author: Pawn 
 * @Date: 2018-08-22 11:46:36 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-06 16:33:43
 */
const router = require('koa-router')();
const Setting = require('../db').Setting;
const Checkcode = require('../db').Checkcode;
const qiniu = require('qiniu')
const fs = require("fs")
const BMP24 = require('gd-bmp').BMP24;
const {create_token, judge_source} = require('../utils/token')

router.prefix('/api/setting');

// 设置 => 导出数据库中的数据
router.get('/', async ctx => {
  try {
    let res = [];
    let mark = await judge_source(ctx);
    if(mark){
      res = await Setting.find({});
    }else {
      res = await Setting.find({},{'qiniu.SECRET_KEY':false});
    }
    
    ctx.body = {
      code: 200,
      msg: '获取设置成功!',
      data: res
    }

  } catch (e) {
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '请求失败!'
    }
  }
})

// 设置 => 更新设置
router.patch('/', async ctx => {
  let {
    myInfo = null,
    website_cover = null,
    qiniu = null,
    other = null
  } = ctx.request.body;
  let setJson = {};

  try {
    // 如果数据库中没有数据，创建一个数据
    let res = await Setting.find({});
    if(res.length == 0){
      await new Setting().save();
    }
    
    // 更新我的信息
    if(myInfo != null){
      let {about_me_page = ''} = myInfo;
      setJsonFn(setJson,'myInfo',{about_me_page});
    }

    // 更新网站封面
    if(website_cover != null){
      let {
        home = '',
        production = '',
        archives = '',
        about = ''
      } = website_cover;
      setJsonFn(setJson,'website_cover',{home,production,archives,about})
    }

    // 更新七牛云秘钥和上传位置
    if(qiniu != null){
      let {
        ACCESS_KEY = '', 
        SECRET_KEY = '',
        BUCKET = ''
      } = qiniu;
      setJsonFn(setJson,'qiniu',{ACCESS_KEY,SECRET_KEY,BUCKET})
    }

    // 更新其他选项
    if(other != null){
      let {
        ICP = '', 
        blog_website = '' 
      } = other;
      setJsonFn(setJson,'other',{ICP,blog_website})
    }

    res = await Setting.findOneAndUpdate({},{
      '$set':setJson
    },{new:true});

    ctx.body = {
      code: 200,
      msg: '更新设置成功!',
      data: res
    }

  } catch (e) {
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '更新设置失败!'
    }
  }

  function setJsonFn(target, prefix, valJson){
    for(let item in valJson){
      valJson[item]!=''?target[prefix+'.'+item]=valJson[item]:'';
    }
  }

})

// 获取七牛云上传token
router.get("/token", async ctx => {
  try {
    let res = await Setting.find({});
    if(res.length == 0){
      ctx.body = {
        code: 403,
        msg: '获取token失败，没有找到七牛云秘钥！',
        data: {
          token: ''
        }
      }
      return;
    }

    let {ACCESS_KEY = '' , SECRET_KEY = '' , BUCKET = ''} = res[0].qiniu
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    let options = {
      scope: BUCKET,
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let token=putPolicy.uploadToken(mac);
    ctx.body = {
      code: 200,
      msg: '获取七牛云上传token成功!',
      data: {
        token
      }
    }
  } catch (e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '获取七牛云token失败!',
      data: {
        token: ''
      }
    }
  }
})

// 获取登录验证码
router.get('/checkcode', async ctx => {
  try{
    let {code,img} = makeCapcha();
    let token = create_token(code);
    await new Checkcode({token,code}).save();
    ctx.body = {
      code: 200,
      msg: '获取验证码成功！',
      data: {
        token,
        img: "data:image/bmp;base64," + img.getFileData().toString('base64')
      }
    }
  }catch(e){
    console.log(e)
  }
})

function rand(min, max) {
  return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

function makeCapcha() {
  var img = new BMP24(100, 40);
  img.drawCircle(rand(0, 100), rand(0, 40), rand(10 , 40), rand(0, 0xffffff));
  //边框
  img.drawRect(0, 0, img.w-1, img.h-1, rand(0, 0xffffff));
  img.fillRect(0, 0, 100, 40, 0x252632);
  // img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
  img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
  //return img;
  //画曲线
  var w=img.w/2;
  var h=img.h;
  var color = rand(0, 0xffffff);
  var y1=rand(-5,5); //Y轴位置调整
  var w2=rand(10,15); //数值越小频率越高
  var h3=rand(4,6); //数值越小幅度越大
  var bl = rand(1,5);
  for(var i=-w; i<w; i+=0.1) {
      var y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
      var x = Math.floor(i+w);
      for(var j=0; j<bl; j++){
          img.drawPoint(x, y+j, color);
      }
  }

  var p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
  var str = '';
  for(var i=0; i<4; i++){
      str += p.charAt(Math.random() * p.length |0);
  }

  var fonts = [BMP24.font12x24, BMP24.font16x32];
  // var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
  var x = 15, y=8;
  for(var i=0; i<str.length; i++){
      var f = fonts[Math.random() * fonts.length |0];
      y = 8 + rand(-5, 5);
      img.drawChar(str[i], x, y, f, rand(0xaaaaaa, 0xffffff));
      x += f.w + rand(2, 8);
  }
  return {code:str,img}
}

module.exports = router;