/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-240': 'repeat(auto-fill, minmax(240px, 1fr))',
      },
      boxShadow: {
        'custom': '0 0 10px #00000015',
      },
      borderRadius: {
        'custom': '15px 15px 0px 0px', 
      }
    },
  },
  plugins: [],
}

