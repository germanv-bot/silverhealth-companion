/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Senior-friendly font sizes (WCAG AAA compliant)
        'base': '1.125rem',    // 18px - minimum body text
        'lg': '1.25rem',       // 20px
        'xl': '1.5rem',        // 24px - h3
        '2xl': '2rem',         // 32px - h2
        '3xl': '2.5rem',       // 40px - h1
        '4xl': '3rem',         // 48px - extra large headings
      },
      lineHeight: {
        'relaxed': '1.75',     // Minimum 1.5 for readability
        'loose': '2',
      },
      colors: {
        // High contrast color palette
        'primary': {
          DEFAULT: '#0066CC',
          dark: '#003366',
        },
        'text': {
          DEFAULT: '#1A1A1A',
          dark: '#000000',
        },
        'error': '#CC0000',
        'success': '#006600',
      },
      spacing: {
        // Generous spacing for accessibility
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
      minHeight: {
        'touch': '44px',  // Minimum touch target size
      },
      minWidth: {
        'touch': '44px',  // Minimum touch target size
      },
    },
  },
  plugins: [],
}
