/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#e6dfc7',
        dark: '#202020',
        blue: '#bfccd2',
        yellow: '#F1AC00',
        green: '#8d9f8c',
        orange: '#cf6944',
        lightDarker: '#d7cebb',
      },
      boxShadow: {
        'xl': '0 0px 30px 2px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  plugins: [],
}