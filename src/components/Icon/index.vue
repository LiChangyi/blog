<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>
<script setup lang="ts">
defineProps<{
  type: string;
}>();
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
