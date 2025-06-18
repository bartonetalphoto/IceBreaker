/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: '#F9F9F9',
      },
      borderRadius: {
        card: '24px',
      },
    },
  },
  plugins: [],
};
