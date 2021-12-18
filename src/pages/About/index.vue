<template>
  <div>
    <div>
      <div
        class="flex text-gray-400 items-center text-base mb-2"
        v-for="(item, index) in infos"
        :key="index"
      >
        <Icon class="text-gray-200 mr-2" :type="item.icon" />
        <span v-if="item.icon !== 'comment'">{{ item.content }}</span>
        <div v-else class="flex text-base">
          <div class="mr-2" v-for="(item, index) in links" :key="index">
            <a :href="item.link" target="__blank" rel="noopener"
              ><Icon :type="item.icon"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SUFFIX_TITLE } from '@/common/constant';
import { useHead } from '@vueuse/head';
import Icon from '@/components/Icon/index.vue';
const infos = [
  {
    icon: 'user',
    content: '李昌义（Licy）',
  },
  {
    icon: 'school',
    content: '成都大学',
  },
  {
    icon: 'company',
    content: '字节跳动-内容安全',
  },
  {
    icon: 'comment',
  },
];

const links = [
  {
    icon: 'github',
    link: 'https://github.com/LiChangyi',
  },
  {
    icon: 'juejin',
    link: 'https://juejin.cn/user/3403743729816398',
  },
  {
    icon: 'email',
    link: 'mailto:licy97love@gmail.com',
  },
];

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
