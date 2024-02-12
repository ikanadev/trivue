<script setup lang="ts">
import { IconChevBack } from "@/components/icons";
import ThemeButton from "@/components/ThemeButton.vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { computed, watch } from "vue";
import { getQuestion } from "@/api";

const route = useRoute();

const id = computed(() => route.params.id as string);

const { data } = useQuery({
	queryKey: ["question", id],
	queryFn: async function() {
		return await getQuestion(id.value);
	}
});

watch(data, (xd) => {
	console.log(data.value);
});
</script>

<template>
	<main class="py-2">
		<div class="flex justify-between items-center">
			<RouterLink :to="{ name: 'questions' }" class="link flex items-center">
				<IconChevBack class="me-1" />
				<span>Back</span>
			</RouterLink>
			<ThemeButton />
		</div>
		<h1 class="text-2xl">{{ id }}</h1>
	</main>
</template>
