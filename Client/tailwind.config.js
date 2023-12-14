/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        container: 'var(--container)',
        title: 'var(--title)',
        border: 'var(--border)',
        details: 'var(--details)',
        body: 'var(--body)'
      },
    },
  },
  plugins: [],
};
