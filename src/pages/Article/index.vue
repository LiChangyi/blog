<template>
  <main>
    <h1 class="text-4xl text-white mb-2">
      {{ article.title }}
    </h1>
    <div class="text-right">
      {{ article.createAt }}
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <article class="article" v-html="article.content" />
  </main>
</template>

<script setup lang="ts">
import './markdown.postcss';

import { useHead } from '@vueuse/head';
import { computed, onMounted, onUnmounted } from 'vue';

import { SUFFIX_TITLE } from '@/common/constant';

const props = defineProps<{
  article: Article;
}>();

useHead({
  title: computed(() => `${props.article.title}${SUFFIX_TITLE}`),
  meta: [
    {
      name: 'description',
      content: computed(() => props.article.desc),
    },
  ],
});

let observer: IntersectionObserver | null = null;
// 图片懒加载
const setImageLazyLoad = () => {
  const imageEls = document.querySelectorAll('.article .image');
  observer = new IntersectionObserver(
    (changes) => {
      changes.forEach((change) => {
        const el = change.target as HTMLImageElement;
        if (change.isIntersecting) {
          if (el.dataset.src) {
            el.src = el.dataset.src;
          }
          observer?.unobserve(el);
        }
      });
    },
    {
      rootMargin: '200px',
    }
  );
  Array.from(imageEls).forEach((el) => {
    observer?.observe(el);
  });
};

onMounted(() => {
  setImageLazyLoad();
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>
