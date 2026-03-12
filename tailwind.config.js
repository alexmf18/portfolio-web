/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0b0d11',
        panel: '#13161b',
        line: '#2a2f38',
        accent: '#f4f6f8',
        muted: '#9ca3af',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 40px rgba(0,0,0,0.35)',
      },
      fontFamily: {
        display: ['Teko', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      letterSpacing: {
        wideplus: '0.2em',
      },
    },
  },
  plugins: [],
}
