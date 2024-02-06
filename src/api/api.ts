import { QuizLevel, QuizOrder, QuizSort, type Author } from "@/utils";
import { ky } from "./ky";

export type ApiMessage = {
	message: string;
};

export type NewQuestionReq = {
	seconds: number;
	text: string;
	level: QuizLevel;
	explanation: string | null;
	author: Author | null;
	choices: { text: string, isCorrect: boolean }[];
};
export async function saveQuestion(data: NewQuestionReq) {
	return await ky.post("trivue/questions", { json: data }).json() as ApiMessage;
}

export async function getQuestions(
	page: number,
	sort: QuizSort,
	order: QuizOrder,
	level: QuizLevel,
) {
	return await ky.get(
		"trivue/questions",
		{ searchParams: { size: 15, page, sort, order, level, } },
	);
}
