import type { Story, Meta } from '@storybook/react/types-6-0';
import type { ICardsColorfulProps } from '../types/components';
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
} as Meta;

const Template: Story<ICardsColorfulProps> = (args) => (
  <CardsColorful {...args} />
);

export const Default = Template.bind({});

Default.args = dummyCardsColorful;
