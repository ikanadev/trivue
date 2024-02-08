<script setup lang="ts">
import ThemeButton from "@/components/ThemeButton.vue";
import { QuizSort, QuizOrder, QuestionLevel, ALL_LEVELS } from "@/utils";
import { IconSortAscending, IconSortDescending } from "@/components/icons";
import Pagination from "./Pagination.vue";

import { getQuestions } from "@/api";
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

const page = ref(1);
const quizLevel = ref<QuestionLevel | typeof ALL_LEVELS>(ALL_LEVELS);
const sortBy = ref(QuizSort.Date);
const sortOrder = ref(QuizOrder.Desc);

const { isLoading, isError, data } = useQuery({
	queryKey: [
		"questions",
		{
			page: 1,
			quizLevel: quizLevel,
			sortBy: sortBy,
			sortOrder: sortOrder,
		},
	],
	staleTime: 5 * 60 * 1000,
	queryFn: async function () {
		return await getQuestions({
			page: page.value,
			sort: sortBy.value,
			order: sortOrder.value,
			level: quizLevel.value,
		});
	},
});

function setPage(n: number) {
	page.value = n;
}

</script>

<template>
	<main class="py-2">
		<div class="flex justify-end">
			<ThemeButton />
		</div>
		<div class="flex justify-end items-end gap-2">
			<label class="form-control">
				<div class="label pb-0">
					<span class="label-text">Level</span>
				</div>
				<select class="select select-bordered select-sm" v-model="quizLevel">
					<option :value="ALL_LEVELS">{{ ALL_LEVELS }}</option>
					<option v-for="sort in QuestionLevel" :value="sort">
						{{ sort[0].toUpperCase() + sort.substring(1) }}
					</option>
				</select>
			</label>

			<label class="form-control">
				<div class="label pb-0">
					<span class="label-text">Sort by</span>
				</div>
				<select class="select select-bordered select-sm" v-model="sortBy">
					<option v-for="sort in QuizSort" :value="sort">
						{{ sort[0].toUpperCase() + sort.substring(1) }}
					</option>
				</select>
			</label>

			<label class="swap">
				<input type="checkbox" v-model="sortOrder" :true-value="QuizOrder.Asc" :false-value="QuizOrder.Desc" />
				<div class="swap-on btn btn-active btn-sm">
					<IconSortAscending class="text-lg" />
				</div>
				<div class="swap-off btn btn-active btn-sm">
					<IconSortDescending class="text-lg" />
				</div>
			</label>
		</div>
		<div>
			<div v-if="isLoading" class="flex justify-center h-36">
				<span class="loading loading-ring loading-lg"></span>
			</div>
			<div v-else-if="isError" role="alert" class="alert alert-error">
				<span>Can't retrieve questions at this time</span>
			</div>
			<div v-else-if="data">
				<div>Total items: {{ data.total }}</div>
				<Pagination :current-page="page" :total-items="32" :set-page="setPage" />
			</div>
		</div>
	</main>
</template>
