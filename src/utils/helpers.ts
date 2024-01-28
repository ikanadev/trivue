import { AppTheme } from "./app_types";
import { THEME_KEY } from "./constants";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

export function getLocalTheme(): AppTheme {
	const theme = localStorage.getItem(THEME_KEY);
	if (theme === "light") return AppTheme.Light;
	return AppTheme.Dark;
}

export const marked = new Marked(
	markedHighlight({
		langPrefix: 'code_block ',
		highlight(code, lang, _) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	}),
);
