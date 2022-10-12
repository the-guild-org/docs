const config = require('@theguild/tailwind-config');

module.exports = {
  ...config,
  content: [...config.content, './packages/components/src/**/*.{ts,tsx}'],
  theme: {
    ...config.theme,
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
