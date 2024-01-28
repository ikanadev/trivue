import { QuizLevel, type Author } from "@/utils";
import { ky } from "./ky";
/*{
	"seconds": 10,
	"text": "Life is hard?",
	"level": "expert",
	"explanation": "you know it, I know it",
	"author": {
		"url": "https://mio.co",
		"name": "Mio"
	},
	"choices": [
		{
			"text": "yes",
			"isCorrect": true
		},
		{
			"text": "no",
			"isCorrect": false
		}
	]
}*/
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
