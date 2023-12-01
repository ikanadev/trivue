import { defineStore } from "pinia";
import { ref } from "vue";

export const useScoreStore = defineStore('score', () => {
  const correctQuestions = ref(0);
  const totalQuestions = ref(0);
  const seconds = ref(0);

  function addPoint() {
    correctQuestions.value++;
  }

  function addSeconds(n: number) {
    seconds.value += n;
  }

  function setTotalQuestions(n: number) {
    totalQuestions.value = n;
  }

  return { correctQuestions, seconds, addPoint, addSeconds, setTotalQuestions } as const;
});
