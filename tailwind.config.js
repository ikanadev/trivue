/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['PT Sans', 'sans-serif'],
      mono: ['Ubuntu Mono', 'monospace'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes").light,
          primary: "#1f4967",
          secondary: "#156a73",
          accent: "#4bbca8",
        },
        dark: {
          ...require("daisyui/src/theming/themes").dark,
          primary: "#4f7997",
          secondary: "#257a83",
          accent: "#3bac98",
        },
      },
    ],
  },
}

