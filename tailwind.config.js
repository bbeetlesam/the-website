/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['"Balsamiq Sans"', 'cursive'],
      },
      colors: {
        bgLight: '#f8f7f3',
        bgDark: '#242424',
        textLight: '#242424',
        textDark: 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
}
