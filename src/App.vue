<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Footer from '@/components/AppFooter.vue';
</script>

<template>
  <div class="min-h-screen w-md max-w-full mx-auto flex flex-col px-2">
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
