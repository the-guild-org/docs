import { Meta, StoryObj } from '@storybook/react';
import { dummyHeroGradient } from '../helpers/dummy';
import { HeroGradient } from './hero-gradient';

export default {
  title: 'Components/Heroes/Gradient',
  component: HeroGradient,
  argTypes: {
    title: {
      name: 'Title',
    },
    description: {
      name: 'Description',
    },
    image: {
      name: 'Illustration',
    },
    link: {
      name: 'Call to Action',
    },
    version: {
      name: 'Library Version',
    },
    colors: {
      name: 'Background Glow Colors',
    },
  },
} satisfies Meta<typeof HeroGradient>;

type Story = StoryObj<typeof HeroGradient>;

export const Default: Story = { args: dummyHeroGradient };

export const MultiLinks = {
  args: {
    ...dummyHeroGradient,
    link: [
      {
        children: 'Start Learning',
        title: 'Start Learning',
        href: '#',
      },
      {
        children: 'Docs',
        title: 'Docs',
        href: '#2',
      },
    ],
  },
};
