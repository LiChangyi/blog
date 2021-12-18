<template>
  <div class="item">
    <div class="px-8 py-4">
      <div class="flex text-base items-center py-1 flex-wrap">
        <div class="w-1.5 h-1.5 rounded-full bg-white" />
        <div class="mx-2 flex-shrink-0">
          {{ `${article.createAt}` }}
        </div>
        <div
          class="mr-2 bg-classify px-0.5 rounded-sm w-16 text-center flex-shrink-0"
        >
          {{ article.classify }}
        </div>
        <router-link
          class="sm:mr-2 w-full mt-2 sm:w-auto sm:mt-0"
          :to="`/article/${article.path}`"
          >{{ article.title }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  data: Article;
}>();
const article = toRefs(props).data.value;
</script>
