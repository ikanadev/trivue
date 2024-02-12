import {
	QuestionLevel,
	QuizOrder,
	QuizSort,
	QuestionVote,
	ALL_LEVELS,
	ITEMS_PER_PAGE,
} from "@/utils";
import type { Author, QuestionItem, Question } from "@/utils";
import { ky } from "./ky";

export type ApiMessage = {
	message: string;
};

export type NewQuestionReq = {
	seconds: number;
	text: string;
	level: QuestionLevel;
	explanation: string | null;
	author: Author | null;
	choices: { text: string, isCorrect: boolean }[];
};
export async function saveQuestion(data: NewQuestionReq) {
	return await ky.post("trivue/questions", { json: data }).json() as ApiMessage;
}

export type GetQuestionsParams = {
	page: number;
	sort: QuizSort;
	order: QuizOrder;
	level: QuestionLevel | typeof ALL_LEVELS;
};

export async function getQuestions(params: GetQuestionsParams) {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	return await ky.get(
		"trivue/questions",
		{ searchParams: { size: ITEMS_PER_PAGE, ...params } },
	).json() as { total: number, questions: Array<QuestionItem> };
}

export async function getQuestion(id: string) {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	return await ky.get(`trivue/questions/${id}`).json() as Question;
}

export async function voteQuestion(id: string, vote: QuestionVote) {
	return await ky.post(
		`trivue/questions/${id}/vote`, { json: { vote } },
	).json() as ApiMessage;
}
