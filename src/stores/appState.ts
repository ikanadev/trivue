import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLocalTheme } from '@/utils/helpers';
import { AppTheme } from '@/utils/app_types';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(getLocalTheme());
  const isThemeDark = computed(() => theme.value === AppTheme.Dark);

  function toggleTheme() {
    theme.value = isThemeDark.value ? AppTheme.Light : AppTheme.Dark;
  }

  return { theme, isThemeDark, toggleTheme }
})
