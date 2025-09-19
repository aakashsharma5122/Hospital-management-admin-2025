/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}; 