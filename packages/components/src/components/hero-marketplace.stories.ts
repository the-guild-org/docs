import { Meta, StoryObj } from '@storybook/react';
import { dummyHeroMarketplace } from '../helpers/dummy';
import { HeroMarketplace } from './hero-marketplace';

export default {
  title: 'Components/Heroes/Marketplace',
  component: HeroMarketplace,
  argTypes: {
    title: {
      name: 'Title',
    },
    description: {
      name: 'Description',
    },
    link: {
      name: 'Call to Action',
    },
  },
} satisfies Meta<typeof HeroMarketplace>;

type Story = StoryObj<typeof HeroMarketplace>;

export const Default: Story = { args: dummyHeroMarketplace };
