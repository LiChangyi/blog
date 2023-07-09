import articleRoutes from 'plugins:article/get-routes';
import { type RouteRecordRaw } from 'vue-router';

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
