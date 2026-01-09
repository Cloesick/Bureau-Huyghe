/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Forest Green
        primary: {
          50: '#f2f7f4',
          100: '#e6efe9',
          200: '#ccdfd3',
          300: '#b3cfbd',
          400: '#99bfa7',
          500: '#2d5c3c',  // Main brand green
          600: '#264d33',
          700: '#1f3e29',
          800: '#182f1f',
          900: '#112015',
          950: '#0a100c',
        },
        // Accent - Metallic Gold
        accent: {
          50: '#fdfaf4',
          100: '#fbf5e9',
          200: '#f7ebd3',
          300: '#f3e1bd',
          400: '#c4a661',  // Main brand gold
          500: '#b39558',
          600: '#8c744a',
          700: '#665438',
          800: '#4d3f2a',
          900: '#332a1c',
        },
        // Success green for data viz
        success: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // Data backgrounds
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
      },
      fontFamily: {
        // Headings: Bold, authoritative
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        // Body: Readable, professional
        body: ['Roboto', 'system-ui', 'sans-serif'],
        // Data/numbers: Monospace for financial data
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'data': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
