/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        shake: "shake 0.5s cubic-bezier(.1,.9,.95,.99) both",
        "spin-slow": "spin 6s linear infinite",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-2px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
