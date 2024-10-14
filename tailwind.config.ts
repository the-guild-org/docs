import tailwindAnimate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';
import config, { Config } from '@theguild/tailwind-config';

export default {
  ...config,
  content: ['./packages/components/src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      colors: {
        ...config.theme.extend.colors,
        primary: config.theme.extend.colors['hive-yellow'],
      },
      fontFamily: {
        sans: [`var(--font-sans, ${fontFamily.sans.slice(0, 3).join(', ')})`, ...fontFamily.sans],
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
  darkMode: ['variant', '&:not(.light *)'],
  plugins: [tailwindAnimate],
} satisfies Config;
