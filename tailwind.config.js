/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--primary-font)"],
      },
      screens: {
        slg: "900px",
        xs: "480px",
      },
    },
  },
  plugins: [],
};
