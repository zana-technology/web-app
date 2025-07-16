/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      dark: {
        400: "#535862",
        700: "#414651",
        800: "#252B37",
        900: "#181D27",
        1000: "#0A0D12",
      },
      zana: {
        grey: {
          100: "#F5F5F5",
          200: "#D5D7DA",
          300: "#E9EAEB",
          400: "#A4A7AE",
          500: "#FAFAFA",
          600: "#70707B",
        },
        primary: {
          normal: "#255A5A",
          normalHover: "#255A5A",
          light: "#EFF5F5",
        },
        color: {
          100: "#F7F2EB",
          300: "#EEE2D3",
          500: "#E5D4BD",
        },
      },
      util: {
        brand: {
          500: "#9E77ED",
        },
        success: {
          50: "#ECFDF3",
          200: "#ABEFC6",
          700: "#067647",
        },
        warning: {
          50: "#FFFAEB",
          200: "#FEDF89",
          700: "#B54708",
        },
        indigo: {
          50: "#EEF4FF",
          200: "#C7D7FE",
          700: "#3538CD",
        },
        error: {
          50: "#FEF3F2",
          200: "#FECDCA",
          700: "#B42318",
        },
        grey: {
          500: "#717680",
        },
      },
    },
    fontFamily: {
      primary: ["var(--primary-font)"],
    },
    screens: {
      slg: "900px",
      xs: "480px",
    },
    keyframes: {
      chatPop: {
        "0%": { opacity: "0", transform: "scale(0.8)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },
    },
    animation: {
      chatPop: "chatPop 0.4s ease-out forwards",
    },
    backgroundImage: {
      "diagonal-stripes": `repeating-linear-gradient(
        135deg,
        #E9EAEB,
        #E9EAEB 1px,
        transparent 1px,
        transparent 6px
      )`,
    },
  },
};
export const plugins = [];
