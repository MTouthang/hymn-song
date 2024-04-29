/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
       
        'hero-bg-image': "url('./src/assets/images/kws-logo.png')",
       
      }
    },
  },
  plugins: [],
};
