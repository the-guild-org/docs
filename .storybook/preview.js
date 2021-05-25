import { ThemeProvider } from '../packages/the-guild-components/src/helpers/theme';
import { GlobalStyles } from '../packages/the-guild-components/src/helpers/styles';

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
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
