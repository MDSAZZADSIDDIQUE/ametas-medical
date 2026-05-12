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
        primary: {
          DEFAULT: 'var(--color-primary, #2c5da7)',
          dark: 'var(--color-primary-dark, #1e4580)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary, #fcb040)',
          light: 'var(--color-secondary-light, #ffd580)',
        },
        text: {
          main: '#333333',
          light: '#666666',
          muted: '#999999',
        },
        bg: {
          light: '#f8f9fa',
        }
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
