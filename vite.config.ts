import { UserConfig } from 'vite';
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';
import ViteRestart from 'vite-plugin-restart';
import Article from './plugins/article';
import { cdnUrl } from './env';

const config: UserConfig = {
  base: cdnUrl,
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
      restart: ['./article/**/*.md'],
    }),
  ],
  server: {
    host: '0.0.0.0'
  }
};

export default config;
