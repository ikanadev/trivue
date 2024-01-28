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

export enum QuizLevel {
	Easy = "easy",
	Medium = "medium",
	Hard = "hard",
}

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
