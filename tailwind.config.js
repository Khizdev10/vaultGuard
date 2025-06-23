import daisyui from "daisyui";

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // Add this line
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Add themes you want to use
    // You can customize more here: https://daisyui.com/docs/config/
  },
};