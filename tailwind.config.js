/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
     extend: {
      colors: {
        'nav-border': '#EBEAEA',
        'light-white': '#FAFAFB',
        'light-white-100': '#F1F4F5',
        'light-white-200': '#d7d7d7',
        'light-white-300': '#F3F3F4',
        'light-white-400': '#E2E5F1',
        'light-white-500': '#E4E4E4',
        'light-white-600': '#f8f7f4',
        'gray': '#4D4A4A',
        'gray-100': '#3d3d4e',
        'black-100': '#252525',
        'primary-pink': '#ea4c89',
        'gray-20':'#f3f3f4',
        'gray-50': '#D9D9D9',
        'gray-60': '#9e9ea7',
        'gray-70': '#6e6d7a',
      },
      boxShadow: {
        menu: '0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)',
      },
      screens: {
        'xs': '400px',
      },
      maxWidth: {
        '10xl': '1680px'
      }
    },
  },
  plugins: [],
}
