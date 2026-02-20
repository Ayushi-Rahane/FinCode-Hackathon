/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
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
        sans: ["Cormorant Garamond", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
