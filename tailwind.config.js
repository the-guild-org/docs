const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
    },
    extend: {
      colors: {
        'dark-blue': '#15AFD0',
        'light-blue': '#1CC8EE',
        'grayscale-line': '#E7E7E7',
        'grayscale-label': '#7F818C',
        'grayscale-placeholder': '#C4C4C4',
        'title-active': '#0B0D11',
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
        3: '3px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const containerProps = {
        width: '100%',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box',
      };

      const newUtilities = {
        '.container-max': {
          ...containerProps,
          maxWidth: '1200px',
        },

        '.container-min': {
          ...containerProps,
          maxWidth: '1024px',
        },

        '.font-default': {
          fontFamily: 'TGCFont, sans-serif',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
