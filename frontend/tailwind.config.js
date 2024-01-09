/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-light": "#FFFFFF",
        "base-dark": "#404040",
        accent: {
          100: "#B57ACC",
          200: "#7F3D99",
          300: "#290039",
        },
      },
    },
  },
  plugins: [],
};
