<template>
  <Header />
  <router-view class="main" />
  <Footer />
</template>
<script setup lang="ts">
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue';
</script>
