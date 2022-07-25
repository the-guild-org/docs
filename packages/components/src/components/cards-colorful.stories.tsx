import { Story, Meta } from '@storybook/react/types-6-0';
import { dummyCardsColorful } from '../helpers/dummy';
import { CardsColorful, CardsColorfulProps } from './cards-colorful';

export default {
  title: 'Components/Cards/Colorful',
  component: CardsColorful,
  argTypes: {
    cards: {
      name: 'Cards',
    },
  },
} as Meta;

const Template: Story<CardsColorfulProps> = args => <CardsColorful {...args} />;

export const Default = Template.bind({});

Default.args = dummyCardsColorful;
