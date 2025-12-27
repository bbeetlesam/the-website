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
        bgLight: '#fdfbf6',
        bgDark: '#272727',
        textDark: '#32312e',
        textLight: 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
}
