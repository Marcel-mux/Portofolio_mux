/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#08090a',
          panel: '#0f1011',
          surface: '#151618',
          elevated: '#1c1d20',
          border: 'rgba(255, 255, 255, 0.07)',
          text: '#f7f8f8',
          muted: '#8a8f98',
        },
        light: {
          bg: '#ffffff',
          panel: '#fbfbfb',
          surface: '#f5f5f5',
          elevated: '#eaeaea',
          border: 'rgba(0, 0, 0, 0.08)',
          text: '#171717',
          muted: '#666666',
        },
        brand: {
          indigo: '#5e6ad2',
          glow: '#7170ff',
          hover: '#828fff',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
