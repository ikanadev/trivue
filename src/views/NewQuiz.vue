<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import IconChevBack from '@/components/icons/IconChevBack.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import { RouterLink } from 'vue-router';

import { computed, ref } from 'vue';
import { parse } from 'marked';

type FormChoice = { text: string, correct: boolean };
const defaultChoices = [{ text: 'From 2 to 4 choices', correct: false }, { text: 'One must be correct', correct: true }];

const question = ref(`
What will be the **output** of this?
\`\`\`
import ThemeButton from 'vue-router';
\`\`\`
`);
const choices = ref<FormChoice[]>(defaultChoices);
const includeExplanation = ref(false);
const explanation = ref('');

const questionHtml = computed(() => parse(question.value));

const isFormValid = computed(() => {
  let valid = question.value.trim().length > 0;
  valid &&= choices.value.every(c => c.text.trim().length > 0);
  if (includeExplanation.value) valid &&= explanation.value.trim().length > 0;
  return valid;
});

function markAsCorrect(choice: FormChoice) {
  const prev = choices.value.find(c => c.correct);
  if (prev) prev.correct = false;
  choice.correct = true;
}

function deleteChoice(index: number) {
  const choice = choices.value[index];
  if (choice.correct) {
    choices.value[(index + 1) % choices.value.length].correct = true;
  }
  choices.value.splice(index, 1);
}

function handleSubmit() {
  console.log({
    question: question.value,
    choices: choices.value,
    explanation: includeExplanation.value ? explanation.value : null
  });
}

</script>
<template>
  <main class="py2">
    <div class="flex justify-between items-center">
      <RouterLink :to="{ name: 'home' }" class="link flex items-center">
        <IconChevBack class="me-1" />
        <span>Back</span>
      </RouterLink>
      <ThemeButton />
    </div>
    <h1 class="text-2xl text-main font-semibold text-center font-mono">NEW QUIZ</h1>
    <p class="text-center text-sm">Basic markdown supported</p>
    <form class="flex flex-col gap-4">
      <div class="form-control">
        <label class="label" for="question_body">
          <span class="label-text">Question:</span>
        </label>
        <textarea v-model="question" id="question_body" class="textarea textarea-bordered textarea-sm font-mono" rows="5">
        </textarea>
      </div>
      <div class="flex flex-col gap-2">
        <p class="label-text">Choices:</p>
        <div v-for="choice, index in choices" class="flex items-center gap-1">
          <button type="button" class="btn btn-square btn-sm" :class="{ 'btn-success text-white': choice.correct }"
            @click="markAsCorrect(choice)">
            <IconCheck />
          </button>
          <textarea :value="choice.text" @input="choice.text = ($event.target as HTMLInputElement).value"
            :class="{ 'textarea-success': choice.correct }"
            class="textarea textarea-sm textarea-bordered font-mono flex-1" rows="1">
          </textarea>
          <button type="button" @click="deleteChoice(index)" :disabled="choices.length <= 2"
            class="btn btn-square btn-sm btn-error text-white">
            <IconClose />
          </button>
        </div>
        <button type="button" v-if="choices.length < 4" @click="choices.push({ text: '', correct: false })"
          class="btn btn-sm btn-neutral btn-ghost">
          <IconPlus />Add choice
        </button>
      </div>
      <div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Include explanation</span>
            <input type="checkbox" class="checkbox checkbox-sm" v-model="includeExplanation" />
          </label>
        </div>
        <div v-if="includeExplanation" class="form-control">
          <label class="label" for="question_explanation">
            <span class="label-text">Explanation:</span>
          </label>
          <textarea v-model="explanation" id="question_explanation"
            class="textarea textarea-bordered textarea-sm font-mono" rows="5">
          </textarea>
        </div>
      </div>
      <button @click.prevent="handleSubmit" type="submit" class="btn btn-primary" :disabled="!isFormValid">
        Submit
      </button>
    </form>
    <div class="divider"></div>
    <h1 class="text-2xl text-main font-semibold text-center font-mono">PREVIEW</h1>
    <div class="flex flex-col gap-4 mt-4">
      <div v-html="questionHtml" class="prose mb-4"></div>
      <div v-for="choice in choices" class="card card-compact bg-base-300 cursor-pointer shadow">
        <div class="card-body">
          <div v-html="parse(choice.text)" class="prose"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
#question_card:before {
  content: '';
  position: absolute;
  background: red;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
