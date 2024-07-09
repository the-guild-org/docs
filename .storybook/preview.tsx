import { ThemeProvider } from 'next-themes';
import { useDarkMode } from 'storybook-dark-mode';
import { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import './global.css';

export const parameters: Preview['parameters'] = {
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
    classTarget: 'html',
  },
  // Remove padding from storybook in mobile
  layout: 'fullscreen',
};

export const decorators: Preview['decorators'] = [
  Story => {
    const theme = useDarkMode() ? 'dark' : 'light';
    return (
      <ThemeProvider attribute="class" forcedTheme={theme}>
        <Story />
      </ThemeProvider>
    );
  },
];
