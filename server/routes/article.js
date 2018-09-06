/*
 * @Author: Pawn 
 * @Date: 2018-08-14 09:49:43 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-05 20:02:44
 */
const router = require('koa-router')()
const Article = require('../db').Article
const articleModel = require('../models/article')
router.prefix('/api/article');
const {judge_source} = require("../utils/token")

/**
 * 文章 => 获取文章列表
 * 根据:current_page,page_size,keyword,tag 来检索文章
 */
router.get('/', async ctx => {
  let {current_page = 1, page_size = 10, keyword = '', tag = '', state =  ''} = ctx.query;

  try{
    let querys = {};
    // 客服端不给看state属性
    let fields = {
      article_content:false
    }
    let mark = await judge_source(ctx);
    if(!mark){
      querys.article_state = 1;
    }

    if(keyword != ''){
      let keywordReg = new RegExp(keyword)
      querys.$or = [
        { 'article_title': keywordReg },
        { 'article_content': keywordReg },
        { 'article_desc': keywordReg }
      ]
    }

    if(tag != ''){
      querys.article_tags = {$in:[tag]}
    }

    if(state != ''){
      querys.article_state = state;
    }
    let options = {
      sort: {'article_update_time': '-1'},
      skip: Number((current_page-1)*page_size),
      limit: Number(page_size)
    }
    let res = await articleModel.find_all({querys,fields,options});
    let total = await Article.countDocuments(querys);
    ctx.body = {
      code: 200,
      msg: '查询成功！',
      data: {
        list: res || [],
        pagination: {
          total,
          current_page,
          page_size
        }
      }
    } 
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '获取文章失败！',
      data: {
        list: [],
        pagination: {}
      }
    }
  }

})

// 文章 => 添加文章
router.post('/', async ctx => {
  let {
    article_title = '',
    article_tags = [],
    article_state = 0,
    article_cover = '',
    article_desc = '',
    article_content = ''
  } = ctx.request.body;
  try {
    if(article_title == '' || article_content == ''){
      ctx.body = {
        code: 401,
        msg: '文章标题和文章内容不能为空！'
      }
      return;
    }

    let article = new Article({
      article_title,
      article_tags,
      article_state,
      article_cover,
      article_desc,
      article_content
    })
    let res = await article.save();
    if(res){
      ctx.body = {
        code: 200,
        msg: '添加文章成功！'
      }
    }else {
      ctx.body = {
        code: 500,
        msg: '添加文章失败！'
      }
    }
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '添加文章失败！'
    }
  }

})

// 文章 => 查看文章
router.get('/:id', async ctx => {
  let _id = ctx.params.id;
  let msg = "获取文章失败！";
  try {
    if(_id.length != 24){
      ctx.body = {
        code: 401,
        msg: '查询失败,文章id有误'
      }
      return;
    }
    let querys = {_id};
    let res = await articleModel.find_all({querys})
    ctx.body = {
      code: 200,
      msg: '查询成功！',
      data: res
    }
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '查询失败！'
    }
  }
})

// 文章 => 修改文章
router.patch('/:id', async ctx => {
  let _id = ctx.params.id;
  let {
    article_title = '',
    article_tags = [],
    article_state = 0,
    article_cover = '',
    article_desc = '',
    article_content = ''
  } = ctx.request.body;
  try {
    if(article_title == '' || article_content == ''){
      ctx.body = {
        code: 401,
        msg: '修改文章失败，文章标题和文章内容不能为空！'
      }
      return;
    }

    if(_id.length != 24){
      ctx.body = {
        code: 401,
        msg: '修改文章失败，文章id号不正确！'
      }
      return;
    }
    let res = await articleModel.find_all({
      querys: {_id}
    });
    if(res.length == 0){
      ctx.body = {
        code: 401,
        msg: '修改文章失败，文章id号不正确！'
      }
      return;
    }

    res = await articleModel.update(_id,{
      article_title,
      article_tags,
      article_state,
      article_cover,
      article_desc,
      article_content,
      article_update_time: new Date().getTime()
    });
    if(res){
      ctx.body = {
        code: 200,
        msg: '修改文章成功！',
        data: res
      }
    }else {
      ctx.body = {
        code: 500,
        msg: '修改文章失败！'
      }
    }
  } catch (e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '修改文章失败！！'
    }
  }
})

// 文章 => 删除文章
router.delete("/:id", async ctx => {
  let _id = ctx.params.id;
  try{
    if(_id.length != 24){
      ctx.body = {
        code: 401,
        msg: '文章删除失败，文章id有误！'
      }
      return;
    }
    let res = await articleModel.delete(_id);
    ctx.body = {
      code: 200,
      msg: '文章删除成功！'
    }
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '文章删除失败！'
    }
  }
})

module.exports = router;