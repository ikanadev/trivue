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
	is_correct: boolean;
};

export type Question = {
	id: string;
	text: string;
	seconds: number;
	explanation?: string;
	choices: Choice[];
};

export type Score = {
	points: number;
	seconds: number;
};

export type Author = {
	name: string;
	url: string;
};
