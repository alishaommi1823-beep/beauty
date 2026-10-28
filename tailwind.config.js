/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe8ee',
          200: '#ffd0dd',
          300: '#fdafc4',
          400: '#fb7da3',
          500: '#f45385',
          600: '#e1306c',
          700: '#be1f56',
          800: '#9e1c49',
          900: '#841b41',
          950: '#4c0821',
        },
        petal: {
          50: '#fef7f8',
          100: '#fdeff2',
          200: '#fbdfe6',
          300: '#f7c4d2',
          400: '#f19bb4',
          500: '#e76d91',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
