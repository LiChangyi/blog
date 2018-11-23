import * as Router from 'koa-router';
import controller = require('../controller');
import { auth } from '../utils/token';

const router = new Router({
  prefix: "/api"
});


router.get('/article', controller.article.getArts)                      // 获取文章列表
      .post('/article', auth, controller.article.postArt)               // 添加文章
      .get('/article/:id', controller.article.getArt)                   // 查看文章详情
      .put('/article/:id', auth, controller.article.putArt)             // 修改文章
      .delete('/article/:id', auth, controller.article.deleteArt)       // 删除文章

      .get('/arch', controller.archives.getArch )                       // 获取归档列表

      .post('/tag', auth, controller.tag.postTag)                       // 添加标签
      .get('/tag', controller.tag.getTags)                              // 获取标签
      .put('/tag/:id', auth, controller.tag.putTag)                     // 修改标签
      .delete('/tag/:id', auth, controller.tag.deleteTag)               // 删除标签

      .get('/work', controller.work.getWorks)                           // 获取项目
      .post('/work', auth, controller.work.postWork)                    // 添加项目
      .put('/work/:id', auth, controller.work.putWork)                  // 修改项目
      .delete('/work/:id', auth, controller.work.deleteWork)            // 删除项目
      
      .get('/set', controller.set.getSet)                               // 获取设置信息
      .put('/set', auth, controller.set.putSet)                         // 更新设置信息

      .post('/user', controller.user.postUser)                          // 用户注册
      .post('/login', controller.user.postLogin)                        // 用户登录
      .put('/user/:id', controller.user.putUser)                        // 用户密码修改

      .get('/checkcode', controller.other.getCheck)                     // 获取验证码
      .get('/qiniu', auth, controller.other.getQiniu)                   // 获取七牛云信息
      ;


export default router;
