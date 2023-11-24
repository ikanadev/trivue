<script setup lang="ts">
import { AppTheme } from '@/utils/app_types';
import { THEME_KEY } from '@/utils/constants';
import { getLocalTheme } from '@/utils/helpers';
import { watchEffect, ref, computed } from 'vue';

import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'

const theme = ref(getLocalTheme());
const isThemeDark = computed(() => theme.value === AppTheme.Dark);

function toggleTheme() {
  theme.value = isThemeDark.value ? AppTheme.Light : AppTheme.Dark;
}

watchEffect(() => {
  localStorage.setItem(THEME_KEY, theme.value.toString());
  const htmlEl = document.querySelector('html');
  if (!htmlEl) return;
  if (isThemeDark.value) {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark');
  }
});

</script>

<template>
  <button
    class="focus:outline-none focus:shadow-focus-main inline-block text-3xl p-1"
    :class="isThemeDark ? 'text-blue-3' : 'text-orange-4'" @click="toggleTheme">
    <IconSun v-if="theme === AppTheme.Light" />
    <IconMoon v-else />
  </button>
</template>
