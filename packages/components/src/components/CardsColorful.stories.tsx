import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ICardsColorfulProps } from '../types/components';
import { dummyCardsColorful } from '../helpers/dummy';

import { CardsColorful } from './CardsColorful';

export default {
  title: 'Components/Cards/Colorful',
  component: CardsColorful,
  argTypes: {
    cards: {
      name: 'Cards',
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<ICardsColorfulProps> = (args) => (
  <CardsColorful {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...dummyCardsColorful,
};
