/*
 * @Author: Pawn 
 * @Date: 2018-09-01 09:20:34 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-05 19:30:56
 */
const router = require('koa-router')()
const Article = require('../db').Article
const Work = require('../db').Work;
router.prefix('/api/archives');

// 获取归档列表 => 文章和作品
router.get('/', async ctx => {
  try {
    let article_list = await Article.find({},{
      article_title: true,
      article_state: true,
      article_create_time: true,
      article_update_time: true
    })
    .sort({'article_create_time': '-1'});
    ctx.body = {
      code: 200,
      msg: '归档查询成功！',
      data: {
        article_list
      }
    }
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 500,
      msg: '归档查询失败!'
    }
  }
})

module.exports = router;