<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "@/utils/helpers";
import 'highlight.js/styles/atom-one-dark.min.css';

const props = defineProps<{
	question: string,
	choices: Array<{ text: string}>,
	includeExplanation: boolean,
	explanation: string,
}>();
</script>
<template>
	<div v-html="DOMPurify.sanitize(marked.parse(question) as string)" class="prose mb-8"></div>
	<div v-for="choice in choices" class="card card-compact bg-base-300 cursor-pointer shadow">
		<div class="card-body">
			<div v-html="DOMPurify.sanitize(marked.parse(choice.text) as string)" class="prose"></div>
		</div>
	</div>
	<p class="label-text mb-2 mt-8" v-if="includeExplanation">Explanation:</p>
	<div v-if="includeExplanation" v-html="DOMPurify.sanitize(marked.parse(explanation) as string)" class="prose mb-8"></div>
</template>
