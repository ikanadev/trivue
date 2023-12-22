<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { IconHome } from '@/components/icons';

import { useQuizStore, useScoreStore } from '@/stores';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const scoreStore = useScoreStore();
const quizStore = useQuizStore();
const router = useRouter();

const score = computed(() => {
  return Math.round((scoreStore.correctQuestions / scoreStore.totalQuestions) * 100);
});

onMounted(() => {
  quizStore.reset();
  if (scoreStore.totalSeconds === 0) {
    router.push({ name: 'home' });
  }
});

</script>
<template>
  <main class="py-2">
    <h1 class="text-8xl text-center text-primary font-mono py-8">
      {{ scoreStore.correctQuestions }}/{{ scoreStore.totalQuestions }}
    </h1>
    <p class="text-xl text-center" v-if="score === 100"><span class="text-primary">Congratulations!</span> you really own
      vue.</p>
    <p class="text-xl text-center" v-if="score >= 75 && score < 100">That was <span class="text-primary">really
        good!</span> But it can be better, what
      about another round?.</p>
    <p class="text-xl text-center" v-if="score >= 50 && score < 75"><span class="text-primary">Good enough!</span>, what
      about another round?.</p>
    <p class="text-xl text-center" v-if="score < 50">Not the best <span class="text-primary">score</span>, but surely you
      can improve with
      some practice.</p>
    <p class="text-xl text-center mt-4">Quiz finished in
      <span class="text-primary font-bold">{{ scoreStore.seconds }}</span>
      seconds which is
      <span class="text-primary font-bold">{{ Math.round((scoreStore.seconds / scoreStore.totalSeconds) * 100) }}%</span>
      of the available time.
    </p>
    <div class="mt-8 flex flex-col gap-4">
      <RouterLink :to="{ name: 'home' }" class="btn btn-primary text-lg">
        <IconHome class="text-xl" /> Home
      </RouterLink>
    </div>
  </main>
</template>
