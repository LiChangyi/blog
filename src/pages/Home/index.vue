<template>
  <main>
    <div class="article-list">
      <Item
        v-for="(article, index) in allArticle"
        :key="index"
        :data="article"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import allArticle from 'plugins:article/all';

import { SUFFIX_TITLE } from '@/common/constant';

import Item from './item.vue';

useHead({
  title: `Home${SUFFIX_TITLE}`,
  meta: [
    {
      name: 'keywords',
      content: 'licy blog 李昌义的博客 前端 前端交流 前端学习',
    },
  ],
});
</script>
