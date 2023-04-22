/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00f',
        },
      },
    },
  },
  important: '#react-scanner-layout',
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
