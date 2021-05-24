import './storybook.css';

import { ThemeProvider } from '../packages/the-guild-components/src/helpers/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];