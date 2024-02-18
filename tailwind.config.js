/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Bangers: ["Bangers", "system-ui"],
        Jomhuria: ["Jomhuria", "serif"],
      },
      colors: {
        wine: {
          5: "#E4BCDE",
          15: "#96437c",
          20: "#af408c",
          25: "#943a82",
          30: "#811B60",
          50: "#562546",
          70: "#411831",
        },
      },
    },
  },
  plugins: [],
};
