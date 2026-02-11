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
        '5xl': '3.5rem',       // 56px - hero text
      },
      lineHeight: {
        'relaxed': '1.75',     // Minimum 1.5 for readability
        'loose': '2',
      },
      colors: {
        // High contrast color palette for healthcare
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
      scale: {
        '102': '1.02',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
