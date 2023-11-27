<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconCheck from '@/components/icons/IconCheck.vue';

import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="py-2">
    <div class="flex justify-end">
      <ThemeButton />
    </div>
    <h1 class="text-primary text-6xl font-700 text-center mt-4 md:mt-20 font-mono tracking-tight">
      TRIVUE
    </h1>
    <p class="text-center text-xl mt-4">
      How much do you know about your favorite framework?
    </p>
    <h2 class="text-xl font-mono font-bold text-main mt-8">START:</h2>
    <div class="flex flex-col gap-4 mt-4">
      <button class="btn btn-primary btn-lg text-xl">Easy</button>
      <button class="btn btn-primary btn-lg text-xl">Medium</button>
      <button class="btn btn-primary btn-lg text-xl">Hard</button>
      <div class="flex justify-around mt-8 md:mt-20">
        <RouterLink :to="{name: 'new_quiz'}" class="btn btn-neutral btn-sm btn-ghost">
          <IconAdd />Submit
        </RouterLink>
        <button class="btn btn-neutral btn-sm btn-ghost"><IconCheck />Rate</button>
      </div>
    </div>

  </main>
</template>
