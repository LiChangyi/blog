/*
 * @Author: Pawn 
 * @Date: 2018-08-13 16:14:16 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-05 22:14:51
 */

const router = require('koa-router')()
const tagModel = require('../models/tag')
const Tag = require('../db').Tag
const Article = require('../db').Article
const {judge_source} = require("../utils/token")

router.prefix('/api/tags');

// 标签 => 查询所有标签,
router.get("/", async ctx => {
  try{
    let res = await tagModel.find_all();
    let arr = [
      {'$unwind': "$article_tags" },
      {'$group':{"_id":"$article_tags","count":{'$sum':1}}}
    ]

    let mark = await judge_source(ctx);
    if(!mark){
      arr.unshift({'$match':{"article_state":1}})
    }
    
    let article_num_list = await Article.aggregate(arr);
    ctx.body = {
      code: 200,
      msg: '获取标签列表成功！',
      data: res,
      data: {
        tags_list: res,
        article_num_list
      }
    }
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '获取标签列表失败,服务器繁忙!'
    }
  }
})

// 标签 => 添加标签
router.post('/', async ctx => {
  let { tags_name, tags_desc } = ctx.request.body;
  try {
    let res = await tagModel.find_by_tagName(tags_name);
    if(res.length !== 0){
      ctx.body = {
        code: 409,
        msg: '此标签名已经被创建了，请换一个名字吧！'
      }
      return;
    }
    let tag  = await new Tag({tags_name, tags_desc}).save();
    if(tag){
      ctx.body = {
        code: 200,
        msg: '创建新标签成功！',
        data: tag
      }
    }else {
      ctx.body = {
        code: 200,
        msg: '创建标签失败！'
      }
    }
    
  }catch (e) {
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '添加标签失败'
    }
  }
})

// 标签 => 修改标签
router.patch('/:id', async ctx => {
  let _id = ctx.params.id;
  let { tags_name, tags_desc } = ctx.request.body;

  try{
    if(_id.length != 24){
      ctx.body = {
        code: 401,
        msg: '_id有误！'
      }
      return;
    }
    let res = await tagModel.find_by_id(_id);
    if(res.length === 0){
      ctx.body = {
        code: 401,
        msg: '_id有误！'
      }
      return;
    }
    if(res[0].tags_name != tags_name){
      // 验证名字是否重复
      res = await tagModel.find_by_tagName(tags_name);
      if(res.length !== 0){
        ctx.body = {
          code: 409,
          msg: '此标签名已经被创建了，请换一个名字吧！'
        }
        return;
      }
    }
    res = await tagModel.update(_id,{tags_name, tags_desc});
    if(res){
      ctx.body = {
        code: 200,
        msg: '修改成功！',
        data: res
      }
    }else{
      ctx.body = {
        code: 500,
        msg: '修改失败！'
      }
    }
    
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '修改标签失败'
    }
  }
})

// 标签 => 删除标签
router.delete("/:id", async ctx => {
  let _id = ctx.params.id;
  try{
    if(_id.length != 24){
      ctx.body = {
        code: 401,
        msg: '_id有误！'
      }
      return;
    }
    let res = await tagModel.delete(_id);
    ctx.body = {
      code: 200,
      msg: '删除标签成功！'
    }
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '删除标签失败'
    }
  }
})

module.exports = router