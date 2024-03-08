// const {tailwindTransform} = require('postcss-lit');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["*.html","./src/**/*.{html,js,ts}"],
  // transform: {
  //   js: tailwindTransform
  // },
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}