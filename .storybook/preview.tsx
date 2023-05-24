import { ThemeProvider } from 'next-themes';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';
import './global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Components', ['Headers'], 'Projects'],
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.normal, appBg: 'white' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' },
  },
  // Remove padding from storybook in mobile
  layout: 'fullscreen',
};

export const decorators = [
  Story => (
    <ThemeProvider attribute="class" forcedTheme={useDarkMode() ? 'dark' : 'light'}>
      <Story />
    </ThemeProvider>
  ),
];
