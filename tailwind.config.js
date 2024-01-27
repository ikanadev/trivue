/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {},
    fontFamily: {
      mono: ['Monaspace', 'monospace'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
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

