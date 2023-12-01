<script setup lang="ts">
import QuizQuestion from './QuizQuestion.vue';

import { useQuizStore } from '@/stores/quiz';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const quizStore = useQuizStore();
const questionIndex = ref<number | null>(null);

onMounted(() => {
  if (quizStore.questions.length === 0) {
    router.push({ name: 'home' });
    return;
  }
  questionIndex.value = 0;
});
</script>
<template>
  <QuizQuestion v-if="questionIndex !== null" :question="quizStore.questions[questionIndex]" :index="questionIndex"
    :total="quizStore.questions.length" />
</template>
