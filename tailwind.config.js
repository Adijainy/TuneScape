/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Bangers: ["Bangers", "system-ui"],
        Jomhuria: ["Jomhuria", "serif"],
      },
    },
  },
  plugins: [],
};
