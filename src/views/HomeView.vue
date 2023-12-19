<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import { RouterLink } from 'vue-router';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchEasyQuestions } from '@/api';
import { useQuizStore, useScoreStore } from '@/stores';

type LoadingState = {
  easy: boolean,
  medium: boolean,
  hard: boolean,
};

const router = useRouter();
const quizStore = useQuizStore();
const scoreStore = useScoreStore();
const loadingState = ref<LoadingState>({ easy: false, medium: false, hard: false });
const somethingIsLoading = computed(() => {
  return loadingState.value.easy || loadingState.value.medium || loadingState.value.hard;
});

function loadEasyQuestions() {
  loadingState.value.easy = true;
  fetchEasyQuestions().then((res) => {
    quizStore.setEasyQuestions(res);
    scoreStore.setTotalQuestions(res.length);
    const totalSeconds = res.reduce((sum, a) => sum + a.seconds, 0);
    scoreStore.setTotalSeconds(totalSeconds);
    router.push({ name: 'quiz' });
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    loadingState.value.easy = false;
  });
}
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
      <button @click="loadEasyQuestions" :disabled="somethingIsLoading" class="btn btn-primary btn-lg text-xl">
        <span v-if="loadingState.easy" class="loading loading-spinner"></span>
        {{ loadingState.easy ? 'Fetching questions' : 'Easy' }}
      </button>
      <button :disabled="somethingIsLoading" class="btn btn-primary btn-lg text-xl">
        <span v-if="loadingState.medium" class="loading loading-spinner"></span>
        {{ loadingState.medium ? 'Fetching questions...' : 'Medium' }}
      </button>
      <button :disabled="somethingIsLoading" class="btn btn-primary btn-lg text-xl">
        <span v-if="loadingState.hard" class="loading loading-spinner"></span>
        {{ loadingState.hard ? 'Fetching questions...' : 'Hard' }}
      </button>
      <div class="flex justify-around mt-8 md:mt-20">
        <RouterLink :to="{ name: 'new_quiz' }" class="btn btn-neutral btn-sm btn-ghost">
          <IconAdd />Submit
        </RouterLink>
        <button class="btn btn-neutral btn-sm btn-ghost">
          <IconCheck />Rate
        </button>
      </div>
    </div>

  </main>
</template>
