import '@/assets/style/normalize.css';
import '@/assets/style/index.postcss';

import NProgress from 'nprogress';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ViteSSG } from 'vite-ssg';

import { routes } from '@/routes';

import App from './App.vue';

export const createApp = ViteSSG(
  App,
  {
    routes,
  },
  ({ router, isClient }) => {
    if (isClient) {
      router.beforeEach(() => {
        NProgress.start();
      });
      router.afterEach(() => {
        NProgress.done();
      });
    }
  }
);
