/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  future: {
    // hover: utilities only apply with a real pointer, so a tap on a phone
    // doesn't leave things stuck in their hover state
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        base: "#0b0d11",
        panel: "#13161b",
        accent: "#f3f4f6",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
