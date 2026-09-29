/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        qleenGreen: "#2DA64F",
        qleenOrange: "#FF7A00",
        greenLight: "#b5ffcf",
        greenDark: "#0f7a40",
        brandOrange: '#f97316'
         
      },
      keyframes: {
        drawpath: {
          "0%": { strokeDasharray: "0 300" },
          "100%": { strokeDasharray: "300 300" }
        },
        pop: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" }
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      animation: {
        "draw-path": "drawpath 1.4s ease-out forwards",
        "pop": "pop 0.4s 1.3s ease-out forwards",
        "fade-in": "fadein 1s 0.5s ease-out forwards"
      },
      fontFamily: {
        // Define a new 'caveat' utility class
        caveat: ['"Caveat"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
