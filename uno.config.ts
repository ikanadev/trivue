import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
	presets: [presetUno()],
	theme: {
		colors: {
			main: "#42b883",
			"main-light": "#42d392",
			"main-dark": "#33a06f",
		},
		boxShadow: {
			"focus-main": "0 0 0 4px #42b88366",
		},
		fontFamily: {
			sans: "PT Sans",
			mono: "Ubuntu Mono",
		},
	},
});
