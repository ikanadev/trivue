<script setup lang="ts">
import { QuestionLevel } from "@/utils";
defineProps<{ level: QuestionLevel }>();
</script>
<template>
	<div class="badge badge-outline">{{ level }}</div>
</template>
