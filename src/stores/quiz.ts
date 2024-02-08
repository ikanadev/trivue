import { fetchEasyQuestions } from '@/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAlertsStore, useScoreStore } from '.';
import { QuestionLevel, type Question } from '@/utils/app_types';

export const useQuizStore = defineStore('quiz', () => {
  const level = ref(QuestionLevel.Easy);
  const questions = ref<Question[]>([]);
  const loading = ref(false);

  function setEasyQuestions(newQuestions: Question[]) {
    level.value = QuestionLevel.Easy;
    questions.value = newQuestions;
  }

  function setMediumQuestions(newQuestions: Question[]) {
    level.value = QuestionLevel.Medium;
    questions.value = newQuestions;
  }

  function setHardQuestions(newQuestions: Question[]) {
    level.value = QuestionLevel.Hard;
    questions.value = newQuestions;
  }

  async function loadEasyQuestions() {
    const alertsStore = useAlertsStore();
    const scoreStore = useScoreStore();
    scoreStore.reset();
    level.value = QuestionLevel.Easy;
    loading.value = true;
    try {
      await new Promise(res => setTimeout(res, 1000));
      const resp = await fetchEasyQuestions();
      loading.value = false;
      questions.value = resp;
      scoreStore.setTotalQuestions(resp.length);
      const totalSeconds = resp.reduce((time, q) => time + q.seconds, 0);
      scoreStore.setTotalSeconds(totalSeconds);
    } catch (e) {
      alertsStore.errorAlert((e as Error).toString());
      loading.value = false;
    }
  }

  function reset() {
    level.value = QuestionLevel.Easy;
    questions.value = [];
  }

  return {
    level,
    questions,
    loading,
    setEasyQuestions,
    setMediumQuestions,
    setHardQuestions,
    loadEasyQuestions,
    reset,
  } as const;
});
