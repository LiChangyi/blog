<template>
  <div>
    <h1 class="text-4xl font-extrabold text-main-color mb-8">About Me</h1>
    <div class="text-base text-secondary-color leading-7">
      <p>Hi all!!!</p>
      <p>
        我是李昌义（Licy），是一名前端开发工程师。毕业于成都大学（2020届计算机科学与技术），目前就职于字节跳动。
      </p>
      <p>主要的工作内容是低代码建站方面，希望可以和大家一起讨论。</p>
      <p>
        你可以通过
        <a
          class="about-link"
          href="https://github.com/LiChangyi"
          target="_blank"
          >GitHub</a
        >，
        <a
          class="about-link"
          href="https://juejin.cn/user/3403743729816398"
          target="_blank"
          >掘金</a
        >，
        <a class="about-link" href="mailto:licy97love@gmail.com" target="_blank"
          >Email</a
        >
        联系我。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.postcss';

import { useHead } from '@vueuse/head';

import { SUFFIX_TITLE } from '@/common/constant';

useHead({
  title: `About${SUFFIX_TITLE}`,
  meta: [
    {
      name: 'keywords',
      content: 'licy blog 李昌义的博客 前端 前端交流 前端学习',
    },
  ],
});
</script>
