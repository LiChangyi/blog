/*
 * @Author: Pawn 
 * @Date: 2018-08-14 17:42:19 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-05 19:59:39
 */

const jwt = require('jsonwebtoken');
const {JWT_ADD_STR,URL_NO_PASS,URL_YES_PASS} = require('./config');
const Admin = require("../db").Admin

function handle_401_error(opt){
  let {ctx,msg = '你还没有登录，请先去登录!'} = opt;
  ctx.response.status = 401;
  ctx.response.body = msg;
}

module.exports = {
  create_token(admin_id){
    return jwt.sign({
      admin_id
    }, JWT_ADD_STR, {
      expiresIn: '1h' 
    });
  },
  async check_token(ctx, next){
    let url = ctx.url;

    if((ctx.method != 'GET' || URL_NO_PASS.includes(url)) && !URL_YES_PASS.includes(url)){
      let token = ctx.get("Authorization");
      if(token == ''){
        handle_401_error({ctx});
        return;
      }
      try {
        // 验证token是否过期
        let {admin_id = ""} = await jwt.verify(token, JWT_ADD_STR);
        // 验证token与账号是否匹配
        let res = await Admin.find({admin_id,token});
        if(res.length == 0){
          handle_401_error({ctx, msg: '登录已过期，请重新登录!'});
          return;
        }
      }catch (e) {
        console.log(e);
        handle_401_error({ctx,msg: '登录已过期，请重新登录!'});
        return;
      }
    }
    await next();
  },
  async check_token_code(token) {
    try {
      await jwt.verify(token, JWT_ADD_STR);
    }catch (e) {
      // console.log(e);
      return false;
    }
    return true;
  },
  // 判断是后台还是前台请求
  async judge_source( ctx){
    let token = ctx.get("Authorization");
    if(token == ''){
      return false;
    }
    try {
      let {admin_id = ''} =  await jwt.verify(token, JWT_ADD_STR);
      let res = await Admin.find({admin_id,token});
      if(res.length == 0){
        return false;
      }
    } catch (e) {
      console.log(e);
      handle_401_error({ctx,msg: '登录已过期，请重新登录!'});
      return false;
    }
    return true;
  }
}