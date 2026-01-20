/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Teal
        primary: {
          50: '#f3f6f7',
          100: '#e7edef',
          200: '#cfdbdf',
          300: '#b6c8cf',
          400: '#89a4ad',
          500: '#2f4e5d',  // Main brand teal
          600: '#294552',
          700: '#223a44',
          800: '#1b2f36',
          900: '#142329',
          950: '#0d171b',
        },
        // Accent - Bright Yellow
        accent: {
          50: '#fff9e6',
          100: '#fff2cc',
          200: '#ffe699',
          300: '#ffd966',
          400: '#ffcb00',  // Main brand yellow
          500: '#e6b700',
          600: '#cca300',
          700: '#997a00',
          800: '#665100',
          900: '#332900',
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
