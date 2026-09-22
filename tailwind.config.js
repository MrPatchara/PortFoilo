/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      colors: {
        // Single source of truth for the palette (was hardcoded in ~40 places).
        ink: '#0C0C0C',
        mist: '#D7E2EA',
        cream: '#E1E0CC',
        brand: {
          DEFAULT: '#B600A8',
          plum: '#18011F',
          violet: '#7621B0',
          ember: '#BE4C00',
          glow: '#E9A9FF',
          amber: '#FFC46B',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        'float-alt': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, 10px, 0)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-45%)', opacity: '0' },
          '45%': { opacity: '1' },
          '100%': { transform: 'translateY(45%)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-alt': 'float-alt 5s ease-in-out 0.6s infinite',
        'scroll-cue': 'scroll-cue 1.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

