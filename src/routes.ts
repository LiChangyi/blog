import { RouteRecordRaw } from 'vue-router';
import articleRoutes from 'plugins:article/get-routes';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/Home/index.vue'),
  },
  {
    path: '/about',
    component: () => import('@/pages/About/index.vue'),
  },
  ...articleRoutes,
  {
    path: '/:w+',
    redirect: '/',
  },
];
