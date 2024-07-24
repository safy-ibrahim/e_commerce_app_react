/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/Components/**/*.jsx',
    'index.html'
  ],
  theme: {
    extend: {
      colors: {
        customColor1: '#22db14', // Your custom color name and value
        customColorHover: '#1f513b'
      },
    },
  },
  plugins: [],
}

