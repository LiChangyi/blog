const router = require('koa-router')();
const tags = require('./tag');
const article = require('./article')
const work = require('./work')
const admin = require('./admin')
const setting = require('./setting')
const archives = require('./archives')

router.get('/', ctx => {
  ctx.body = 'hello!'
})

module.exports = function (app) {
  app.use(router.routes(), router.allowedMethods());
  app.use(tags.routes(), tags.allowedMethods());
  app.use(article.routes(), article.allowedMethods());
  app.use(work.routes(), work.allowedMethods());
  app.use(admin.routes(), admin.allowedMethods());
  app.use(setting.routes(), setting.allowedMethods());
  app.use(archives.routes(), archives.allowedMethods());
}