<script setup lang="ts">
import QuizQuestion from './QuizQuestion.vue';

import { useQuizStore } from '@/stores/quiz';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const quizStore = useQuizStore();
const questionIndex = ref<number | null>(null);
const loadingNext = ref(false);

function handleNext() {
  if (questionIndex.value === null) return;
  if (questionIndex.value + 1 === quizStore.questions.length) {
    router.push({ name: 'result' });
    return;
  }
  loadingNext.value = true;
  questionIndex.value++;
  setTimeout(() => loadingNext.value = false, 200);
}

onMounted(() => {
  if (quizStore.questions.length === 0) {
    router.push({ name: 'home' });
    return;
  }
  questionIndex.value = 0;
});
</script>
<template>
  <QuizQuestion v-if="questionIndex !== null && !loadingNext" :question="quizStore.questions[questionIndex]"
    :index="questionIndex" :total="quizStore.questions.length" @require-next="handleNext" />
</template>
