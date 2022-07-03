const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./packages/components/**/*.{html,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      red: colors.red,
      cyan: colors.cyan,
    },
    extend: {
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
