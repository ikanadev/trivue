<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import { IconChevBack, IconCheck, IconClose, IconPlus, IconMinus } from '@/components/icons';
import { RouterLink, useRouter } from 'vue-router';
import DOMPurify from 'dompurify';

import { computed, ref } from 'vue';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { submitQuiz } from '@/api';
import { useAlertsStore } from '@/stores/alerts';

import 'highlight.js/styles/atom-one-dark.min.css';

const marked = new Marked(
	markedHighlight({
		langPrefix: 'code_block ',
		highlight(code, lang, _) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	}),
);

enum ActiveTab { edit, preview };
type FormChoice = { text: string, correct: boolean };
type FormState = {
	question: string,
	choices: FormChoice[],
	includeExplanation: boolean,
	explanation: string,
	loading: boolean,
	duration: number,
};

const defaultChoices = [{ text: 'From 2 to 4 choices', correct: false }, { text: 'One must be correct', correct: true }];

const router = useRouter();
const alertsStore = useAlertsStore();

const activeTab = ref(ActiveTab.edit);
const form = ref<FormState>({
	question: `What will be the **output** of this?
\`\`\`js
console.log('Hello world');
\`\`\``,
	choices: defaultChoices,
	includeExplanation: false,
	explanation: '',
	loading: false,
	duration: 15,
});

const isFormValid = computed(() => {
	let valid = form.value.question.trim().length > 0;
	valid &&= form.value.choices.every(c => c.text.trim().length > 0);
	if (form.value.includeExplanation) valid &&= form.value.explanation.trim().length > 0;
	return valid;
});

function markAsCorrect(choice: FormChoice) {
	const prev = form.value.choices.find(c => c.correct);
	if (prev) prev.correct = false;
	choice.correct = true;
}

function deleteChoice(index: number) {
	const choice = form.value.choices[index];
	if (choice.correct) {
		form.value.choices[(index + 1) % form.value.choices.length].correct = true;
	}
	form.value.choices.splice(index, 1);
}

function handleSubmit() {
	console.log({
		question: form.value.question,
		choices: form.value.choices,
		explanation: form.value.includeExplanation ? form.value.explanation : null
	});
	form.value.loading = true;
	submitQuiz().then(() => {
		form.value.loading = false;
		router.push({ name: 'home' });
		alertsStore.successAlert('Quiz submitted successfully, thanks for you collaboration!');
	}).catch(() => {
		alertsStore.errorAlert('Error submitting quiz, please try again later.');
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

		<div class="tabs tabs-boxed mt-6 mb-4" role="tablist">
			<button @click="activeTab = ActiveTab.edit" class="tab" :class="{ 'tab-active': activeTab === ActiveTab.edit }"
				role="tab">
				Edit
			</button>
			<button @click="activeTab = ActiveTab.preview" class="tab"
				:class="{ 'tab-active': activeTab === ActiveTab.preview }" role="tab">
				Preview
			</button>
		</div>

		<form v-if="activeTab === ActiveTab.edit" class="flex flex-col gap-5">
			<div class="form-control">
				<label class="label pt-0" for="question_body">
					<span class="label-text">Question:</span>
				</label>
				<textarea v-model="form.question" id="question_body" class="textarea textarea-bordered textarea-sm font-mono"
					rows="5">
        </textarea>
			</div>

			<div class="flex flex-col gap-2">
				<p class="label-text">Choices:</p>
				<div v-for="choice, index in form.choices" class="flex items-center gap-1">
					<button type="button" class="btn btn-square" :class="{ 'btn-success text-white': choice.correct }"
						@click="markAsCorrect(choice)">
						<IconCheck />
					</button>
					<textarea :value="choice.text" @input="choice.text = ($event.target as HTMLInputElement).value"
						:class="{ 'textarea-success': choice.correct }"
						class="textarea textarea-sm textarea-bordered font-mono flex-1" rows="1">
          </textarea>
					<button type="button" @click="deleteChoice(index)" :disabled="form.choices.length <= 2"
						class="btn btn-square btn-error text-white">
						<IconClose />
					</button>
				</div>
				<button type="button" v-if="form.choices.length < 4" @click="form.choices.push({ text: '', correct: false })"
					class="btn btn-sm btn-neutral btn-ghost">
					<IconPlus />Add choice
				</button>
			</div>

			<div>
				<p class="label-text mb-2">Seconds to answer:</p>
				<div class="flex justify-around items-center">
					<button @click="form.duration -= 5;" :disabled="form.duration <= 5" class="btn btn-square" type="button">
						<IconMinus />
					</button>
					<p class="text-2xl font-mono">{{ form.duration }}</p>
					<button @click="form.duration += 5" :disabled="form.duration >= 60" class="btn btn-square" type="button">
						<IconPlus />
					</button>
				</div>
			</div>

			<div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Include explanation</span>
						<input type="checkbox" class="checkbox checkbox-sm" v-model="form.includeExplanation" />
					</label>
				</div>
				<div v-if="form.includeExplanation" class="form-control">
					<label class="label" for="question_explanation">
						<span class="label-text">Explanation:</span>
					</label>
					<textarea v-model="form.explanation" id="question_explanation"
						class="textarea textarea-bordered textarea-sm font-mono" rows="5">
          </textarea>
				</div>
			</div>

			<button @click.prevent="handleSubmit" type="submit" class="btn btn-primary" :disabled="!isFormValid">
				<span v-if="form.loading" class="loading loading-spinner"></span>
				{{ form.loading ? 'Submitting' : 'Submit' }}
			</button>
		</form>
		<div v-if="activeTab === ActiveTab.preview" class="flex flex-col gap-4">
			<div v-html="DOMPurify.sanitize(marked.parse(form.question) as string)" class="prose mb-8"></div>
			<div v-for="choice in form.choices" class="card card-compact bg-base-300 cursor-pointer shadow">
				<div class="card-body">
					<div v-html="DOMPurify.sanitize(marked.parse(choice.text) as string)" class="prose"></div>
				</div>
			</div>
		</div>
	</main>
</template>

<style>
.prose pre {
	background: #131313;
}
</style>
