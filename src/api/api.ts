import { QuestionLevel, QuizOrder, QuizSort, ALL_LEVELS, ITEMS_PER_PAGE } from "@/utils";
import type { Author, QuestionItem } from "@/utils";
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
