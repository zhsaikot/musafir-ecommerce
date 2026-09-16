/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MUSAFIR Brand Colors (Black & Gold)
        primary: {
          light: '#fcd34d', 
          DEFAULT: '#d4af37', // Premium Metallic Gold
          dark: '#997a00',
        },
        dark: {
          DEFAULT: '#050505', // Deep Black (Logo Background)
          light: '#1a1a1a',   // Slightly lighter black for cards/sections
        },
        gold: {
          DEFAULT: '#d4af37',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Optional: For premium headings
      },
    },
  },
  plugins: [],
}