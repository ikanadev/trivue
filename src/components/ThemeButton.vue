<script setup lang="ts">
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'

import { AppTheme } from '@/utils/app_types';
import { useThemeStore } from '@/stores/appState';

const themeStore = useThemeStore();

</script>

<template>
  <button class="btn btn-square btn-ghost text-3xl" @click="themeStore.toggleTheme">
    <IconSun v-if="themeStore.theme === AppTheme.Light" />
    <IconMoon v-else />
  </button>
</template>
