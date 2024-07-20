import config, { Config } from '@theguild/tailwind-config';

export default {
  ...config,
  content: ['./packages/components/src/**/*.{ts,tsx}'],
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
} satisfies Config;
