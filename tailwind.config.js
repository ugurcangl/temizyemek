/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f8f4ea',
        linen: '#fdfaf4',
        sage: '#7b8f4e',
        olive: '#51623a',
        apricot: '#dd8b45',
        sand: '#e8ddc8',
        ink: '#2d3325',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        card: '0 18px 40px rgba(76, 86, 48, 0.12)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 20% 20%, rgba(123, 143, 78, 0.08), transparent 32%), radial-gradient(circle at 80% 0%, rgba(221, 139, 69, 0.08), transparent 24%), radial-gradient(circle at 50% 80%, rgba(232, 221, 200, 0.55), transparent 28%)',
      },
    },
  },
  plugins: [],
};
