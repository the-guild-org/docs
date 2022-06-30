import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';
import { ThemeProvider } from '@theguild/components/src';
import '@theguild/components/src/static/styles.css';
import '@theguild/components/src/static/fonts.css';

import '@algolia/autocomplete-theme-classic';
import '@theguild/components/src/static/css/SearchBarV2.css';

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
    <ThemeProvider isDarkTheme={useDarkMode()}>
      <Story />
    </ThemeProvider>
  ),
];
