<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "@/utils/helpers";
import Subtitle from "./Subtitle.vue";
import 'highlight.js/styles/tokyo-night-dark.css';

defineProps<{ body: string }>();
</script>
<template>
	<div>
		<Subtitle>Explanation</Subtitle>
		<p v-html="DOMPurify.sanitize(marked.parse(body) as string)" class="prose text-sm"></p>
	</div>
</template>
