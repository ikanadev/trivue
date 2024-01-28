<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "@/utils/helpers";
import 'highlight.js/styles/atom-one-dark.min.css';
import type { Author } from "@/utils";

defineProps<{
	question: string,
	choices: Array<{ text: string }>,
	explanation: string | null,
	author: Author | null;
}>();
</script>
<template>
	<div v-html="DOMPurify.sanitize(marked.parse(question) as string)" class="prose mb-8"></div>
	<div v-for="choice in choices" class="card card-compact bg-base-300 cursor-pointer shadow">
		<div class="card-body">
			<div v-html="DOMPurify.sanitize(marked.parse(choice.text) as string)" class="prose"></div>
		</div>
	</div>
	<p class="label-text mb-2 mt-8" v-if="explanation !== null">Explanation:</p>
	<div v-if="explanation !== null" v-html="DOMPurify.sanitize(marked.parse(explanation) as string)" class="prose mb-8">
	</div>
	<div v-if="author !== null" class="flex justify-end mt-2 text-sm">
		Submitted by <a class="link link-primary ml-2" :href="author.url">{{ author.name }}</a>
	</div>
</template>
