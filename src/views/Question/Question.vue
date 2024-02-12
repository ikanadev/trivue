<script setup lang="ts">
import { IconChevBack, IconTimer, IconPlus, IconMinus } from "@/components/icons";
import {
	QuestionBody,
	ChoiceBody,
	Explanation,
	QuestionLevel,
	QuestionFooter,
	Subtitle,
} from "@/components";
import ThemeButton from "@/components/ThemeButton.vue";
import { useRoute } from "vue-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { getQuestion, voteQuestion } from "@/api";
import { QuestionVote, STALE_TIME } from "@/utils";

const route = useRoute();

const id = computed(() => route.params.id as string);
const queryClient = useQueryClient();

const { isLoading, isError, data } = useQuery({
	queryKey: ["question", id],
	staleTime: STALE_TIME,
	queryFn: async () => await getQuestion(id.value),
});

const { mutate, isPending } = useMutation({
	mutationFn: async (vote: QuestionVote) => await voteQuestion(id.value, vote),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ["question", id] });
		queryClient.invalidateQueries({ queryKey: ["questions"] });
	},
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
		<div class="divider my-0"></div>
		<div v-if="isLoading" class="flex justify-center h-36">
			<span class="loading loading-ring loading-lg"></span>
		</div>
		<div v-else-if="isError" role="alert" class="alert alert-error">
			<span class="text-error">Can't retrieve question at this time</span>
		</div>
		<div v-else-if="data" class="flex flex-col gap-5">
			<p v-if="data.author" class="text-right text-sm">
				Submitted by
				<a class="link" :href="data.author.url" target="_blank">
					{{ data.author.name }}
				</a>
			</p>
			<div class="flex justify-between items-center">
				<p>
					<IconTimer class="inline text-xl mb-0.5" /><span class="text-base">{{ data.seconds }} seconds</span>
				</p>
				<QuestionLevel :level="data.level" />
			</div>
			<div>
				<Subtitle>Question</Subtitle>
				<QuestionBody :body="data.text" />
			</div>
			<div class="flex flex-col gap-2">
				<Subtitle>Choices</Subtitle>
				<ChoiceBody v-for="choice in data.choices" :body="choice.text"
					:status="choice.isCorrect ? 'correct' : 'neutral'" />
			</div>
			<Explanation v-if="data.explanation !== null" :body="data.explanation" />
			<QuestionFooter :created-at="data.createdAt" :points="data.votes.positive - data.votes.negative" />

			<div>
				<Subtitle>Rate this question</Subtitle>
				<div class="flex justify-center gap-8 mt-2">
					<button class="btn btn-success btn-lg gap-0" :disabled="isPending" @click="mutate(QuestionVote.Positive)">
						<IconPlus class="text-5xl" />
					</button>
					<button class="btn btn-error btn-lg gap-0" :disabled="isPending" @click="mutate(QuestionVote.Negative)">
						<IconMinus class="text-5xl" />
					</button>
				</div>
			</div>
		</div>
	</main>
</template>
