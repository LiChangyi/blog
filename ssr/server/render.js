import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/App';
import { getStore } from '../client/store';
import defaultLayout from './layout/defualt';
import routes from '../client/routes';
import serverApi from '../client/axios/serverApi';

export default async (ctx) => {
  const store = getStore();
  const promises = [];
  const matchedRoutes = matchRoutes(routes, ctx.path);

  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store, serverApi, ctx.path));
    }
  });

  await Promise.all(promises);
  const context = {};
  const content = renderToString(
    <Provider store={ store }>
      <StaticRouter location={ ctx.url } context={ context }>
        <App />
      </StaticRouter>
    </Provider>
  );
  if ( context.action === 'REPLACE' ) {
    ctx.redirect(context.url);
  }
  const helmet = Helmet.renderStatic();
  ctx.body = defaultLayout(content, store, helmet);
};
