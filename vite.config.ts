import { UserConfig } from 'vite';
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';
import ViteRestart from 'vite-plugin-restart';
import Article from './plugins/article';

const isProd: boolean = process.env.NODE_ENV === 'production' ? true : false;

const config: UserConfig = {
  base: isProd ? 'https://cdn.jsdelivr.net/gh/lichangyi/blog@gh-pages/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname),
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    Article(),
    ViteRestart({
      restart: ['./article/*.md'],
    }),
  ],
};

export default config;
