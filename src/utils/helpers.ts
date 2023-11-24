import { AppTheme } from "./app_types";
import { THEME_KEY } from "./constants";

export function getLocalTheme(): AppTheme {
	const theme = localStorage.getItem(THEME_KEY);
	if (theme === "light") return AppTheme.Light;
	return AppTheme.Dark;
}
