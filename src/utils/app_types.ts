export enum AppTheme {
	Light = "light",
	Dark = "dark",
}

export enum AlertType {
	Neutral = "alert",
	Info = "alert-info",
	Success = "alert-success",
	Warning = "alert-warning",
	Error = "alert-error",
}

export enum QuestionLevel {
	Easy = "basic",
	Medium = "medium",
	Hard = "expert",
}
export const ALL_LEVELS = "all";

export enum QuizSort {
	Date = "date",
	Votes = "votes",
	Duration = "duration",
}
export enum QuizOrder {
	Asc = "asc",
	Desc = "desc",
}

export type QuestionItem = {
	id: string;
	text: string;
	level: QuestionLevel;
	createdAt: string;
	votes: Votes;
};

export type Votes = {
	positive: number;
	negative: number;
};

export type AppAlert = {
	type: AlertType;
	message: string;
};

export type Choice = {
	id: string;
	text: string;
	isCorrect: boolean;
};

export type Question = {
	id: string;
	text: string;
	seconds: number;
	level: QuestionLevel;
	explanation: null | string,
	createdAt: string;
	author: null | Author;
	votes: {
		positive: number;
		negative: number;
	},
	choices: Array<Choice>;
}

export type Score = {
	points: number;
	seconds: number;
};

export type Author = {
	name: string;
	url: string;
};
