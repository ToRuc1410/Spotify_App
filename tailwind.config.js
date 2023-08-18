/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [],
  darkMode: 'className',
  theme: {
    extend: {
      colors: {
        darkslategray: '#404058',
        darkslatepurple: '#152d3f',
        darkslatered: '#59041a',
        darkslategrown: '#372b32'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
