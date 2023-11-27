<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import IconChevBack from '@/components/icons/IconChevBack.vue';

import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const question = ref('');
</script>
<template>
  <main class="py2">
    <div class="flex justify-between items-center">
      <RouterLink :to="{name: 'home'}" class="flex items-center underline underline-2 underline-offset-3 font-semibold">
        <IconChevBack class="mt1 me1" />
        <span>Back</span>
      </RouterLink>
      <ThemeButton />
    </div>
    <h1 class="text-2xl text-main font-semibold text-center font-mono">NEW QUIZ</h1>
    <p class="text-center text-sm">Basic markdown supported</p>
    <div class="flex flex-col">
      <label for="question_body" class="mb0.5">Question:</label>
      <textarea v-model="question" id="question_body"
        class="font-mono bg-transparent py1 px2 b-main b-3 focus:outline-none focus:shadow-focus-main" rows="5">
      </textarea>
      <p class="mb0.5 mt2">Choices:</p>
      <div class="flex items-center">
        <div>V</div>
        <textarea v-model="question" id="question_body"
          class="font-mono bg-transparent py1 px2 b-secondary b-3 focus:outline-none focus:shadow-focus-main flex-1" rows="1">
        </textarea>
        <div>X</div>
      </div>
    </div>
    <h1 class="text-2xl text-main font-semibold text-center font-mono">PREVIEW</h1>
  </main>
</template>
