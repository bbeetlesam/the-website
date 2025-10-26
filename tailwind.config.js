/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        TASA: ["TASA Explorer", 'sans-writing'],
        winky: ["Winky Sans", 'sans-writing']
      },
      colors: {
        bgLight: '#f8f7f3',
        bgDark: '#272727',
        textDark: '#222222',
        textLight: 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
}
