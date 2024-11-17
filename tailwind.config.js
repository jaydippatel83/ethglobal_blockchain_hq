/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkCustom: "#F59ED3",
        yellowCustom: "#FFC567",
        blueCustom: "#bfa1ff",
        greenCustom: "#BEF0CD",
        limeCustom: "#C2FFB6",
        sckinCustom: "#fcf9ef"
      },
      borderRadius: {
        custom: "15px",
      },
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        unigo:['var(--font-unigo)']
      },
      textShadow: {
        white: "-2px -2px 0 #fff, 2px 2px 0 #fff",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-white": {
          textShadow: "-2px -2px 0 #fff, 2px 2px 0 #fff",
        },
      });
    }),
  ],
};
