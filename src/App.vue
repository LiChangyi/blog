<template>
  <Header />
  <router-view class="main" />
  <Footer />
</template>
<script setup lang="ts">
import Footer from '@/components/Footer/index.vue';
import Header from '@/components/Header/index.vue';
</script>
