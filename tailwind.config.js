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
          panel: '#0e0f11',
          surface: '#141619',
          elevated: '#1b1d21',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#f5f6f8',
          muted: '#8b909a',
        },
        light: {
          bg: '#ffffff',
          panel: '#fafafa',
          surface: '#f4f5f7',
          elevated: '#eaecef',
          border: 'rgba(0, 0, 0, 0.08)',
          text: '#111214',
          muted: '#525866',
        },
        brand: {
          blue: '#0066ff',
          glow: '#2585ff',
          hover: '#0052cc',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
