import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { HiveFooter, HiveFooterProps } from './hive-footer';

export default {
  title: 'Components/HiveFooter',
  component: HiveFooter,
  decorators: [hiveThemeDecorator],
  argTypes: {
    sameSite: {
      name: 'Same Site',
      description: 'Use this to force links to open in the same tab, using the root domain.',
    },
    resources: {
      name: 'Resources Links',
      description: "Use this to add current site's links to the footer.",
    },
  },
} satisfies Meta<HiveFooterProps>;

export const Default: StoryObj<HiveFooterProps> = {
  args: {
    sameSite: false,
    resources: [
      {
        children: 'Documentation',
        title: 'Read the Docs',
        href: '/docs1',
        onClick(e) {
          e.preventDefault();
          alert('Internal link handler');
        },
      },
      {
        children: 'Quick start',
        title: 'Learn first steps',
        href: '/docs2',
        onClick(e) {
          e.preventDefault();
          alert('Internal link handler');
        },
      },
    ],
  },
};
