import { ViteSSG } from 'vite-ssg';
import NProgress from 'nprogress';
import { routes } from '@/routes';
import App from './App.vue';
import '@/assets/style/normalize.css';
import '@/assets/style/index.postcss';

export const createApp = ViteSSG(
  App,
  {
    routes,
  },
  ({ router, isClient }) => {
    if (isClient) {
      router.beforeEach(() => {
        console.log('licy a');
        NProgress.start();
      });
      router.afterEach(() => {
        NProgress.done();
      });
    }
  }
);
