/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      flex: {
        'fixed-6/100': '0 0 6%',
        'fixed-20/100': '0 0 20%',
        'fixed-74/100': '0 0 74%',
      },
    },
  },
  plugins: [],
}
