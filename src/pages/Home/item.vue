<template>
  <div class="py-4 flex text-base items-center gap-2 flex-wrap">
    <div class="w-1.5 h-1.5 rounded-full bg-white" />
    <div class="flex-shrink-0">
      {{ `${article.createAt}` }}
    </div>
    <div class="bg-classify px-0.5 rounded-sm w-16 text-center flex-shrink-0">
      {{ article.classify }}
    </div>
    <router-link :to="`/article/${article.path}`">
      {{ article.title }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  data: Article;
}>();
const article = toRefs(props).data.value;
</script>
