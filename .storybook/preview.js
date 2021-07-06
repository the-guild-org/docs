import { ThemeProvider } from '../packages/components/src/helpers/theme';
import { GlobalStyles } from '../packages/components/src/helpers/styles';

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
      <GlobalStyles includeFonts includeBase/>
      <Story />
    </ThemeProvider>
  ),
];
