<script setup lang="ts">
withDefaults(defineProps<{
  size: 'small' | 'medium' | 'large',
  variant: 'primary' | 'secondary'
}>(), {
  size: 'medium',
  variant: 'primary',
})
</script>

<template>
  <button :class="[
    { 'py0.5': size === 'small', py1: size === 'medium', py2: size === 'large' },
    { 'text-lg': size === 'small', 'text-xl': size === 'medium', 'text-2xl': size === 'large' },
    { 'bg-main': variant === 'primary', 'bg-secondary': variant === 'secondary' },
    { 'hover:bg-main-dark': variant === 'primary', 'hover:bg-secondary-dark': variant === 'secondary' },
    { 'focus:shadow-focus-main': variant === 'primary', 'focus:shadow-focus-secondary': variant === 'secondary' },
    'text-gray-50 px2 duration-300 outline-none',
  ]">
    <slot></slot>
  </button>
</template>
