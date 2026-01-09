/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Bureau Huyghe Green
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
        // Accent - Metallic Gold/Bronze
        accent: {
          50: '#fbf8f1',
          100: '#f7f1e3',
          200: '#efe3c7',
          300: '#e7d5ab',
          400: '#c4a661',  // Main brand gold
          500: '#b39558',
          600: '#8c744a',
          700: '#665438',
          800: '#4d3f2a',
          900: '#332a1c',
        },
        // Surface colors
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        }
      }
    }
  },
  plugins: [],
}
