/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F",
        accent: "#00C896",
        danger: "#FF4D4D",
        warning: "#FFA500",
        surface: "#0F1B2D",
        card: "#162133",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
