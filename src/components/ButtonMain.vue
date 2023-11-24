<script setup lang="ts">
withDefaults(defineProps<{
  size: 'small' | 'medium' | 'large',
}>(), {
  size: 'medium',
})
</script>

<template>
  <button :class="[
    { 'py0.5': size === 'small', py1: size === 'medium', py2: size === 'large' },
    { 'text-lg': size === 'small', 'text-xl': size === 'medium', 'text-2xl': size === 'large' },
    { 'border-2': size === 'small', 'border-3': size === 'medium', 'border-4': size === 'large' },
    'border-main mt-4 px2 duration-400',
    'focus:outline-none focus:shadow-focus-main',
    'active:bg-main active:text-gray-50 active:transition'
  ]">
    <slot></slot>
  </button>
</template>
