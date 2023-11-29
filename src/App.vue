<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/AppFooter.vue';
import IconClose from '@/components/icons/IconClose.vue';

import { watch } from 'vue';
import { THEME_KEY } from '@/utils/constants';
import { useThemeStore } from '@/stores/theme';
import { useAlertsStore } from '@/stores/alerts';

const themeStore = useThemeStore();
const alertsStore = useAlertsStore();

watch(() => themeStore.theme, () => {
  localStorage.setItem(THEME_KEY, themeStore.theme.toString());
  const htmlEl = document.querySelector('html');
  if (!htmlEl) return;
  htmlEl.setAttribute('data-theme', themeStore.isThemeDark ? 'dark' : 'light');
}, { immediate: true });
</script>

<template>
  <div class="main_cont relative flex flex-col max-w-full min-h-screen mx-auto p-2">
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
    <div class="absolute bottom-4 left-0 right-0">
      <div class="flex flex-col gap-2 px-2">
        <div v-for="alert, index in alertsStore.alerts"
          role="alert"
          class="alert grid-flow-col grid-cols-[1fr_auto] justify-items-start text-start shadow"
          :class="[alert.type.toString()]">
          <span>{{ alert.message }}</span>
          <button @click="alertsStore.deleteAlert(index)" class="btn btn-sm btn-square btn-ghost">
            <IconClose class="inline-block" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main_cont {
  width: 480px;
}</style>
