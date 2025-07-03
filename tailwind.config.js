/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          400: "#535862",
          700: "#414651",
          900: "#181D27",
        },
        zana: {
          grey: {
            100: "#F5F5F5",
            200: "#D5D7DA",
            300: "#E9EAEB",
            400: "#A4A7AE",
          },
          primary: { normal: "#255A5A" },
        },
      },
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
