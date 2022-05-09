import { ThemeProvider } from '@theguild/components/src/helpers/theme';
import { GlobalStyles } from '@theguild/components/src/helpers/styles';

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
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <GlobalStyles includeFonts includeBase />
      <Story />
    </ThemeProvider>
  ),
];
