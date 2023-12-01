<script setup lang="ts">
import { useScoreStore } from '@/stores';

const scoreStore = useScoreStore();
</script>
<template>
  <p>Points: {{ scoreStore.points }}</p>
  <p>Seconds: {{ scoreStore.seconds }}</p>
</template>
