const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./packages/**/*.{html,ts,tsx}'],
  theme: {
    container: {
      center: true,
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
      colors: {
        'dark-blue': '#15afd0',
        'light-blue': '#1cc8ee',
        'grayscale-line': '#e7e7e7',
        'grayscale-label': '#7f818c',
        'grayscale-placeholder': '#c4c4c4',
        'title-active': '#0b0d11',
      },
      screens: {
        xs: '360px',
      },
      zIndex: {
        1: 1,
      },
      height: {
        1.25: '0.3125rem',
        4.5: '1.125rem',
      },
      width: {
        1.25: '0.3125rem',
        4.5: '1.125rem',
        fit: 'fit-content',
      },
      minWidth: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },
      maxWidth: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },
      borderWidth: {
        3: 3,
      },
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
  plugins: [
    plugin(({ addUtilities, addVariant }) => {
      addUtilities({
        '.font-default': {
          fontFamily: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        },
      });
    }),
    require('@tailwindcss/line-clamp'),
  ],
};
