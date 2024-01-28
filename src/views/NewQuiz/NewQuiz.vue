<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import { IconChevBack, IconCheck, IconClose, IconPlus, IconMinus } from '@/components/icons';
import { RouterLink, useRouter } from 'vue-router';
import Preview from "./Preview.vue";

import { computed, ref } from 'vue';
import { submitQuiz } from '@/api';
import { useAlertsStore } from '@/stores/alerts';

enum ActiveTab { edit, preview };
type FormChoice = { text: string, correct: boolean };
type AuthorInfo = { name: string, url: string };
type FormState = {
	question: string,
	choices: FormChoice[],
	explanation: null | string,
	loading: boolean,
	duration: number,
	author: null | AuthorInfo;
};

const defaultChoices = [
	{ text: 'From 2 to 4 choices', correct: false },
	{ text: 'One must be correct', correct: true },
];

const router = useRouter();
const alertsStore = useAlertsStore();

const activeTab = ref(ActiveTab.edit);
const form = ref<FormState>({
	question: `What will be the **output** of this?
\`\`\`js
console.log('Hello world');
\`\`\``,
	choices: defaultChoices,
	explanation: null,
	loading: false,
	duration: 15,
	author: null,
});

const isFormValid = computed(() => {
	let valid = form.value.question.trim().length > 0;
	valid &&= form.value.choices.every(c => c.text.trim().length > 0);
	if (form.value.explanation) valid &&= form.value.explanation.trim().length > 0;
	if (form.value.author) {
		valid &&= (form.value.author.name.trim().length > 0);
		valid &&= (form.value.author.url.trim().length > 0);
	}
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
		explanation: form.value.explanation,
		authos: form.value.author,
	});
	/*
	form.value.loading = true;
	submitQuiz().then(() => {
		form.value.loading = false;
		router.push({ name: 'home' });
		alertsStore.successAlert('Quiz submitted successfully, thanks for you collaboration!');
	}).catch(() => {
		alertsStore.errorAlert('Error submitting quiz, please try again later.');
	});
	*/
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
		<h1 class="text-3xl text-main font-semibold text-center">NEW QUIZ</h1>
		<p class="text-center">Basic markdown supported</p>

		<div class="tabs tabs-boxed mt-6 mb-6" role="tablist">
			<button @click="activeTab = ActiveTab.edit" class="tab" :class="{ 'tab-active': activeTab === ActiveTab.edit }"
				role="tab">
				<span class="text-base font-semibold">Edit</span>
			</button>
			<button @click="activeTab = ActiveTab.preview" class="tab"
				:class="{ 'tab-active': activeTab === ActiveTab.preview }" role="tab">
				<span class="text-base font-semibold">Preview</span>
			</button>
		</div>

		<form v-if="activeTab === ActiveTab.edit" class="flex flex-col gap-6">
			<div class="form-control">
				<label class="label pt-0" for="question_body">
					<span class="label-text text-base">Question:</span>
				</label>
				<textarea v-model="form.question" id="question_body" class="textarea textarea-bordered textarea-sm font-mono"
					rows="5">
        </textarea>
			</div>

			<div class="flex flex-col gap-2">
				<p class="label-text text-base">Choices:</p>
				<div v-for="choice, index in form.choices" class="flex items-center gap-1">
					<button type="button" class="btn btn-square" :class="{ 'btn-success text-white': choice.correct }"
						@click="markAsCorrect(choice)">
						<IconCheck />
					</button>
					<textarea :value="choice.text" @input="choice.text = ($event.target as HTMLInputElement).value"
						:class="{ 'textarea-success': choice.correct }" class="textarea textarea-bordered font-mono flex-1" rows="1">
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
				<p class="mb-2">Seconds to answer:</p>
				<div class="flex justify-evenly items-center">
					<button @click="form.duration -= 5;" :disabled="form.duration <= 5" class="btn btn-square" type="button">
						<IconMinus />
					</button>
					<p class="text-2xl font-mono">{{ form.duration }}</p>
					<button @click="form.duration += 5" :disabled="form.duration >= 120" class="btn btn-square" type="button">
						<IconPlus />
					</button>
				</div>
			</div>

			<div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text text-base">Include explanation</span>
						<input type="checkbox" class="checkbox checkbox-sm" :checked="form.explanation !== null"
							@input="form.explanation = form.explanation === null ? '' : null" />
					</label>
				</div>
				<div v-if="form.explanation !== null" class="form-control">
					<textarea v-model="form.explanation" id="question_explanation"
						class="textarea textarea-bordered font-mono" rows="5" placeholder="Please add an explanation">
          </textarea>
				</div>
			</div>

			<div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text text-base">Include author info</span>
						<input type="checkbox" class="checkbox checkbox-sm" :checked="form.author !== null"
							@input="form.author = form.author === null ? { name: '', url: '' } : null" />
					</label>
				</div>
				<div class="flex flex-col gap-2" v-if="form.author">
					<div class="flex">
						<label class="label cursor-pointer w-16" for="author_name">
							Name:
						</label>
						<input id="author_name" type="text" :value="form.author.name" class="input input-bordered flex-1"
							@input="form.author.name = ($event.target as HTMLInputElement).value" />
					</div>
					<div class="flex">
						<label class="label cursor-pointer w-16" for="author_url">
							URL:
						</label>
						<input id="author_url" type="text" :value="form.author.url" class="input input-bordered flex-1"
							@input="form.author.url = ($event.target as HTMLInputElement).value" />
					</div>
				</div>
			</div>

			<button @click.prevent="handleSubmit" type="submit" class="btn btn-primary" :disabled="!isFormValid">
				<span v-if="form.loading" class="loading loading-spinner"></span>
				{{ form.loading ? 'Submitting' : 'Submit' }}
			</button>
		</form>
		<div v-if="activeTab === ActiveTab.preview" class="flex flex-col gap-4">
			<Preview :question="form.question" :choices="form.choices" :explanation="form.explanation || ''"
				:includeExplanation="form.explanation !== null" />
		</div>
	</main>
</template>

<style>
.prose pre {
	background: #131313;
}
</style>
