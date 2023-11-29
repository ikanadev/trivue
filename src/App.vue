<script setup lang="ts">
import Footer from '@/components/AppFooter.vue';

import { watch } from 'vue';
import { RouterView } from 'vue-router'
import { THEME_KEY } from '@/utils/constants';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

watch(() => themeStore.theme, () => {
  localStorage.setItem(THEME_KEY, themeStore.theme.toString());
  const htmlEl = document.querySelector('html');
  if (!htmlEl) return;
  htmlEl.setAttribute('data-theme', themeStore.isThemeDark ? 'dark' : 'light');
}, { immediate: true });
</script>

<template>
  <div class="main_cont flex flex-col max-w-full min-h-screen mx-auto p-2">
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.main_cont {
  width: 420px;
}
</style>
