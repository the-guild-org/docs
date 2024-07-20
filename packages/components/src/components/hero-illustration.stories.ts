import { Meta, StoryObj } from '@storybook/react';
import { dummyHeroIllustration } from '../helpers/dummy';
import { HeroIllustration } from './hero-illustration';

export default {
  title: 'Components/Heroes/Illustration',
  component: HeroIllustration,
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
    flipped: {
      name: 'Flip Orientation',
    },
    link: {
      name: 'Link',
    },
  },
} satisfies Meta<typeof HeroIllustration>;

type Story = StoryObj<typeof HeroIllustration>;

export const Default: Story = { args: dummyHeroIllustration };
export const Flipped: Story = {
  args: {
    ...dummyHeroIllustration,
    flipped: false,
  },
};
