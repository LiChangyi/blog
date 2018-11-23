import Koa from 'koa';
import Proxy from 'koa-proxy';
import convert from 'koa-convert';
import Serve from 'koa-static';
import render from './render';

const app = new Koa();

app.use(Serve('public'));

app.use(convert(Proxy({
  host: 'http://127.0.0.1:7777',
  match: /^\/api\//
})));

app.use(async (ctx) => {
  await render(ctx);
});

app.listen(8888);
console.log('http:127.0.0.1:8888');
