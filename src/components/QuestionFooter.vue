<script setup lang="ts">
import { IconHeart, IconHeartBroken } from "@/components/icons";
defineProps<{
	createdAt: string;
	points: number;
}>();

</script>
<template>
	<div class="flex justify-between items-center">
		<div class="text-xs italic">{{ new Date(createdAt).toLocaleString() }}</div>
		<div class="flex items-center gap-1">
			<IconHeart v-if="points > 0" class="text-xl text-red-500" />
			<IconHeart v-else-if="points === 0" class="text-xl text-gray-500" />
			<IconHeartBroken v-else class="text-xl text-gray-500" />
			<p class="text-lg">{{ points }}</p>
		</div>
	</div>
</template>
