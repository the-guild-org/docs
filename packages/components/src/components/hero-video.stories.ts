import { Meta, StoryObj } from '@storybook/react';
import { dummyHeroVideo } from '../helpers/dummy';
import { HeroVideo } from './hero-video';

export default {
  title: 'Components/Heroes/Video',
  component: HeroVideo,
  argTypes: {
    title: {
      name: 'Title',
    },
    description: {
      name: 'Description',
    },
    video: {
      name: 'Video',
    },
    flipped: {
      name: 'Flip Orientation',
    },
    link: {
      name: 'Link',
    },
  },
} satisfies Meta<typeof HeroVideo>;

type Story = StoryObj<typeof HeroVideo>;

export const Default: Story = { args: dummyHeroVideo };
