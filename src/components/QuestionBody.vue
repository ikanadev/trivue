<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "@/utils/helpers";
import 'highlight.js/styles/tokyo-night-dark.css';

defineProps<{ body: string }>();
</script>
<template>
	<div v-html="DOMPurify.sanitize(marked.parse(body) as string)" class="prose"></div>
</template>
