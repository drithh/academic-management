/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Roboto Mono', 'sans-serif'],
        heading: ['Roboto Mono', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
