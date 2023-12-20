import { defineStore } from 'pinia';
import { ref } from 'vue';
import { QuizLevel, type Question } from '@/utils/app_types';

export const useQuizStore = defineStore('quiz', () => {
  const level = ref(QuizLevel.Easy);
  const questions = ref<Question[]>([]);

  function setEasyQuestions(newQuestions: Question[]) {
    level.value = QuizLevel.Easy;
    questions.value = newQuestions;
  }

  function setMediumQuestions(newQuestions: Question[]) {
    level.value = QuizLevel.Medium;
    questions.value = newQuestions;
  }

  function setHardQuestions(newQuestions: Question[]) {
    level.value = QuizLevel.Hard;
    questions.value = newQuestions;
  }

  function reset() {
    level.value = QuizLevel.Easy;
    questions.value = [];
  }

  return {
    level,
    questions,
    setEasyQuestions,
    setMediumQuestions,
    setHardQuestions,
    reset,
  } as const;
});
