/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./javascripts/**/*.{html,js}", "index.html"],
  theme: {
    extend: {
      colors: {
        'symphony-light-blue': '#41c9f9',
        'symphony-dark-blue': '#3e86fa',
        'symphony-background-blue': '#15376e',
        'symphony-light-green': '#7cfcb9',
        'symphony-dark-green': '#29ea8a'        
      }
    },
  },
  plugins: [],
}

