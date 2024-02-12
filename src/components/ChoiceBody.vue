<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "@/utils/helpers";
import 'highlight.js/styles/tokyo-night-dark.css';

defineProps<{ status: "correct" | "incorrect" | "neutral", body: string }>();
</script>
<template>
	<div class="card card-compact shadow" :class="{
		'bg-base-300': status === 'neutral',
		'bg-green-400 dark:bg-green-900': status === 'correct',
		'bg-red-300 dark:bg-red-800': status === 'incorrect',
	}">
		<div class="card-body">
			<div class="prose" v-html="DOMPurify.sanitize(marked.parse(body) as string)"></div>
		</div>
	</div>
</template>
