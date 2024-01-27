<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import { IconTimer } from '@/components/icons';

import { type Choice, type Question } from '@/utils/app_types';
import { onUnmounted, ref, watch } from 'vue';
import { parse } from 'marked';
import { useScoreStore } from '@/stores';
import DOMPurify from 'dompurify';

const props = defineProps<{ question: Question, index: number, total: number }>();
defineEmits<{ requireNext: [] }>();

const scoreStore = useScoreStore();
const countdown = ref(props.question.seconds);
const userChoice = ref<Choice | null>(null);
const finished = ref(false);

const interval = setInterval(() => {
  if (countdown.value <= 0) return;
  countdown.value -= 1;
}, 1000);

function setUserChoice(c: Choice) {
  if (finished.value) return;
  userChoice.value = c;
  finish();
}

function finish() {
  clearInterval(interval);
  finished.value = true;
  let usedSeconds = props.question.seconds - countdown.value + 1;
  if (usedSeconds > props.question.seconds) usedSeconds = props.question.seconds;
  scoreStore.addSeconds(usedSeconds);
  if (userChoice.value === props.question.choices.find(c => c.is_correct)) {
    scoreStore.addPoint();
  }
}

watch(countdown, (newCountdown) => {
  if (newCountdown <= 0) {
    finish();
  }
});

onUnmounted(() => clearInterval(interval));
</script>

<template>
  <main class="py-2 flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-1 font-mono">
        <IconTimer class="text-2xl mt-0.5" />
        <p class="text-3xl">{{ countdown }}</p>
      </div>
      <ThemeButton />
    </div>
    <p class="font-mono text-center">QUESTION {{ props.index + 1 }}/{{ props.total }}</p>
    <div class="prose" v-html="DOMPurify.sanitize(parse(props.question.text) as string)"></div>
    <div class="flex flex-col mt-8 gap-3">
      <div v-for="choice in props.question.choices" :key="choice.id" @click="setUserChoice(choice)"
        class="card card-compact cursor-pointer shadow" :class="{
          'bg-base-300': !finished || choice !== userChoice || !choice.is_correct,
          'bg-green-300 dark:bg-green-800': finished && choice.is_correct,
          'bg-red-300 dark:bg-red-800': finished && !choice.is_correct && choice === userChoice,
        }">
        <div class="card-body">
          <div class="prose" v-html="DOMPurify.sanitize(parse(choice.text) as string)"></div>
        </div>
      </div>
    </div>
    <div class="" v-if="finished && props.question.explanation">
      <p>Explanation:</p>
      <div class="prose" v-html="DOMPurify.sanitize(parse(props.question.explanation) as string)"></div>
    </div>
    <button v-if="finished" @click="$emit('requireNext')" class="btn btn-primary">
      {{ props.index + 1 === props.total ? 'Finish' : 'Next' }}
    </button>
  </main>
</template>
