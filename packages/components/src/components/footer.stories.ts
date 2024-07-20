import { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

export default {
  title: 'Components/Footer',
  component: Footer,
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
} satisfies Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
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
