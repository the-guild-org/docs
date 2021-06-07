import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IMarketplaceSearchProps } from '../types/components';
import { dummyMarketplaceSearch } from '../helpers/dummy';

import { MarketplaceSearch } from './MarketplaceSearch';

export default {
  title: 'Components/Marketplace/Search',
  component: MarketplaceSearch,
  argTypes: {
    title: {
      name: 'Title',
    },
    placeholder: {
      name: 'Input Placeholder',
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<IMarketplaceSearchProps> = (args) => (
  <MarketplaceSearch {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...dummyMarketplaceSearch,
};
