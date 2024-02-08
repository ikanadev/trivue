<script setup lang="ts">
import ThemeButton from "@/components/ThemeButton.vue";
import { QuizSort, QuizOrder, QuestionLevel, ALL_LEVELS, marked } from "@/utils";
import { IconSortAscending, IconSortDescending } from "@/components/icons";
import Pagination from "./Pagination.vue";
import Star from "./Star.vue";

import DOMPurify from "dompurify";
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
			page: page,
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
		<div class="flex items-end gap-2">
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
			<div class="flex-1"></div>

			<ThemeButton />
		</div>
		<div>
			<div v-if="isLoading" class="flex justify-center h-36">
				<span class="loading loading-ring loading-lg"></span>
			</div>
			<div v-else-if="isError" role="alert" class="alert alert-error">
				<span class="text-error">Can't retrieve questions at this time</span>
			</div>
			<div v-else-if="data" class="mt-4">
				<div class="flex flex-col gap-4 mb-6">
					<div v-for="question in data.questions" class="card shadow-lg bg-base-200 card-compact" :key="question.id">
						<div class="card-body">
							<div class="card-actions justify-end items-center">
								<div class="badge">{{ question.level }}</div>
							</div>
							<div v-html="DOMPurify.sanitize(marked.parse(question.text) as string)" class="prose"></div>
							<div class="card-actions justify-between items-center mt-3">
								<div class="text-sm italic">{{ new Date(question.createdAt).toLocaleString() }}</div>
								<div class="flex items-center gap-1">
									<Star width="24" height="24" :points="question.votes.positive - question.votes.negative" />
									<p class="text-lg">{{ question.votes.positive - question.votes.negative }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Pagination :current-page="page" :total-items="data.total" :set-page="setPage" />
			</div>
		</div>
	</main>
</template>
