<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import { QuestionLevel, type Author } from "@/utils";
import { IconChevBack, IconCheck, IconClose, IconPlus, IconMinus } from '@/components/icons';
import { useRouter } from 'vue-router';
import Preview from "./Preview.vue";

import { computed, ref } from 'vue';
import * as api from '@/api';
import { useAlertsStore } from '@/stores/alerts';

enum ActiveTab { edit, preview };
type FormChoice = { text: string, isCorrect: boolean };
type FormState = {
	question: string,
	choices: FormChoice[],
	explanation: null | string,
	loading: boolean,
	duration: number,
	author: null | Author;
	level: QuestionLevel;
};

const defaultChoices = [
	{ text: 'From 2 to 4 choices', isCorrect: false },
	{ text: 'One must be correct', isCorrect: true },
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
	level: QuestionLevel.Easy,
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
	const prev = form.value.choices.find(c => c.isCorrect);
	if (prev) prev.isCorrect = false;
	choice.isCorrect = true;
}

function deleteChoice(index: number) {
	const choice = form.value.choices[index];
	if (choice.isCorrect) {
		form.value.choices[(index + 1) % form.value.choices.length].isCorrect = true;
	}
	form.value.choices.splice(index, 1);
}

function handleSubmit() {
	form.value.loading = true;
	api.saveQuestion({
		seconds: form.value.duration,
		text: form.value.question,
		level: form.value.level,
		explanation: form.value.explanation,
		author: form.value.author,
		choices: form.value.choices,
	}).then((res) => {
		router.push({ name: 'home' });
		alertsStore.successAlert(res.message);
	}).catch(() => {
		alertsStore.errorAlert('Error submitting quiz, please try again later.');
	}).finally(() => {
		form.value.loading = false;
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
		<h1 class="text-3xl text-main font-semibold text-center">NEW QUIZ</h1>
		<p class="text-center">Basic markdown supported</p>

		<div class="tabs tabs-boxed mt-6 mb-8" role="tablist">
			<button @click="activeTab = ActiveTab.edit" class="tab" :class="{ 'tab-active': activeTab === ActiveTab.edit }"
				role="tab">
				<span class="text-base font-semibold">Edit</span>
			</button>
			<button @click="activeTab = ActiveTab.preview" class="tab"
				:class="{ 'tab-active': activeTab === ActiveTab.preview }" role="tab">
				<span class="text-base font-semibold">Preview</span>
			</button>
		</div>

		<form v-if="activeTab === ActiveTab.edit" class="flex flex-col gap-4">
			<div class="flex">
				<label class="label py-0 flex-1" for="question_level">
					<span class="label-text text-base">Level:</span>
				</label>
				<select id="question_level" class="select select-sm select-bordered text-base" v-model="form.level">
					<option v-for="level in QuestionLevel" :value="level">{{ level }}</option>
				</select>
			</div>

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
					<button type="button" class="btn btn-square" :class="{ 'btn-success text-white': choice.isCorrect }"
						@click="markAsCorrect(choice)">
						<IconCheck />
					</button>
					<textarea v-model="choice.text" :class="{ 'textarea-success': choice.isCorrect }"
						class="textarea textarea-bordered font-mono flex-1" rows="1">
          </textarea>
					<button type="button" @click="deleteChoice(index)" :disabled="form.choices.length <= 2"
						class="btn btn-square btn-error text-white">
						<IconClose />
					</button>
				</div>
				<button type="button" v-if="form.choices.length < 4" @click="form.choices.push({ text: '', isCorrect: false })"
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
					<textarea v-model="form.explanation" id="question_explanation" class="textarea textarea-bordered font-mono"
						rows="5" placeholder="Please add an explanation">
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
						<label class="label cursor-pointer w-16" for="author_name">Name:</label>
						<input id="author_name" type="text" v-model="form.author.name" class="input input-bordered flex-1" />
					</div>
					<div class="flex">
						<label class="label cursor-pointer w-16" for="author_url">URL:</label>
						<input id="author_url" type="text" v-model="form.author.url" class="input input-bordered flex-1" />
					</div>
				</div>
			</div>

			<button @click.prevent="handleSubmit" type="submit" class="btn btn-primary" :disabled="!isFormValid">
				<span v-if="form.loading" class="loading loading-spinner"></span>
				{{ form.loading ? 'Submitting' : 'Submit' }}
			</button>
		</form>
		<div v-if="activeTab === ActiveTab.preview" class="flex flex-col gap-4">
			<Preview :question="form.question" :choices="form.choices" :explanation="form.explanation" :author="form.author" />
		</div>
	</main>
</template>
