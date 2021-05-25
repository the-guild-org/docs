import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IHeroMarketplaceProps } from '../types/components';

import { HeroMarketplace } from './HeroMarketplace';
import { dummyHeroMarketplace } from '../helpers/dummy';

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
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<IHeroMarketplaceProps> = (args) => (
  <HeroMarketplace {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...dummyHeroMarketplace,
};
