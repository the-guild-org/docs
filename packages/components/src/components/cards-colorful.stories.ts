import { Meta, StoryObj } from '@storybook/react';
import { dummyCardsColorful } from '../helpers/dummy';
import { CardsColorful } from './cards-colorful';

export default {
  title: 'Components/Cards/Colorful',
  component: CardsColorful,
  argTypes: {
    cards: {
      name: 'Cards',
    },
  },
} satisfies Meta<typeof CardsColorful>;

type Story = StoryObj<typeof CardsColorful>;

export const Default: Story = {
  args: dummyCardsColorful,
};
