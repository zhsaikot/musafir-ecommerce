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
          DEFAULT: '#111416', // Charcoal from the MUSAFIR wordmark
          light: '#202427',   // Elevated charcoal surfaces
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