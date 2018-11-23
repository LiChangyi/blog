import * as Koa from 'koa';
const onerror = require('koa-onerror');
const logger = require('koa-logger');
import koaBody = require('koa-body');
import router from './routes';
import mongodb = require('./db');

const app = new Koa();
onerror(app);

mongodb.connect();

app.use(koaBody({
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}));

app.use(logger());

app.use(router.routes());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;
