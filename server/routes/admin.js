/*
 * @Author: Pawn 
 * @Date: 2018-08-14 16:16:17 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-08-31 09:04:51
 */
const router = require('koa-router')();
const Admin = require('../db').Admin;
const adminModel = require('../models/admin');
const sha1 = require('sha1');
const SHA1_ADD_STR = "pawn_blog_encrypted_string"
const {create_token,check_token_code} = require('../utils/token')
const Checkcode = require('../db').Checkcode;

router.prefix('/api/admin');

// 用户注册
router.post('/master', async ctx => {
  let {admin_name = '', admin_id = '', admin_pwd = ''} = ctx.request.body;

  try {
    if(admin_name == '' || admin_id == '' || admin_pwd == ''){
      ctx.body = {
        code: 401,
        msg: '注册账号失败，请填写完整注册信息!'
      }
      return;
    }
    // 判断admin_id是否重复
    let res = await adminModel.find_by_admin_id(admin_id);
    if(res.length != 0){
      ctx.body = {
        code: 409,
        msg: '登录账号重复了,请换一个吧!'
      }
      return;
    }
    let admin = new Admin({
      admin_name,admin_id,
      admin_pwd: sha1(sha1(admin_pwd + SHA1_ADD_STR))
    })
    res = await admin.save();
    if(res){
      ctx.body = {
        code: 200,
        msg: '注册成功！'
      }
    }else {
      ctx.body = {
        code: 500,
        msg: '注册失败!'
      }
    }
  } catch (e) {
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '注册失败!'
    }
  }
})

// 用户登录
router.post('/login', async ctx => {
  let {admin_id = '' , admin_pwd = '',token = '', code = ''} = ctx.request.body;

  try {
    if(admin_id == '' || admin_pwd == '' || token == '' || code == ''){
      ctx.body = {
        code: 401,
        msg: '登录失败,请输入账号,密码或者验证码!'
      }
      return;
    }
    code = code.toUpperCase();
    
    // 判断验证码
    let res = await check_token_code(token);
    if(!res) {
      ctx.body = {
        code: 401,
        msg: '验证码已过期，请重新刷新！'
      }
      return;
    }

    res = await Checkcode.findOneAndRemove({token,code});
    if(res == null){
      ctx.body = {
        code: 401,
        msg: '验证码错误，请重新输入！'
      }
      return;
    }
    
    // 验证账号密码
    res = await Admin.find({admin_id,admin_pwd:sha1(sha1(admin_pwd + SHA1_ADD_STR))});
    if(res.length == 0){
      ctx.body = {
        code: 401,
        msg: '登录失败，账号或者密码错误！'
      }
      return;
    }

    let new_token = create_token(admin_id);
    res[0].token = new_token;
    res[0].save();
    ctx.body = {
      code: 200,
      msg: '登录成功！',
      data: {
        token: new_token,
        admin_id: res[0].admin_id,
        admin_name: res[0].admin_name
      }
    }
  } catch (e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '登录失败，服务器繁忙！'
    }
  }
})

// 用户密码修改
router.patch('/master', async ctx => {
  let {admin_id = '', ori_pwd = '', new_pwd = '', re_pwd = ''} = ctx.request.body;
  try {
    if(admin_id == '' || ori_pwd == '' || new_pwd == '' || re_pwd == ''){
      ctx.body = {
        code: 401,
        msg: '修改密码失败,请填写完所有信息且新密码不能为空'
      }
      return;
    }
    if(new_pwd != re_pwd){
      ctx.body = {
        code: 401,
        msg: '修改密码失败,2次密码输入不一致！'
      }
      return;
    }

    let res = await adminModel.find_by_admin_id(admin_id);
    if(res.length == 0){
      ctx.body = {
        code: 401,
        msg: '修改密码失败,没有此管理员!'
      }
      return;
    }

    if(res[0].admin_pwd == sha1(sha1(ori_pwd+SHA1_ADD_STR))){
      res = await adminModel.update(res[0]._id,{admin_pwd:sha1(sha1(re_pwd + SHA1_ADD_STR))});
      console.log(res);
      if(res){
        ctx.body = {
          ctx,code: 200,
          msg: '密码修改成功!'
        }
      }else {
        ctx.body = {
          code: 500,
          msg: '密码修改失败！'
        }
      }
    }else{
      ctx.body = {
        code: 401,
        msg: '修改密码失败,原始密码错误!'
      }
      return;
    }

  } catch (e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '修改密码失败!'
    }
  }
})

module.exports = router;