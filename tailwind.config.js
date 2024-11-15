/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0057FF",  // Background blue
        accentYellow: "#FFDA77", // Card background yellow
        darkText: "#1A1A1A",     // Dark text color
        lightGray: "#F2F2F2",    // Light gray for backgrounds
        secondaryText: "#606060", // Light text for descriptions
        highlightGreen: "#A0F2E3" // Countdown highlight color
      },
    },
  },
  plugins: [],
};
