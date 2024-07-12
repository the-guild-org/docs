import { Meta, StoryObj } from '@storybook/react';
import { dummyMarketplaceList } from '../helpers/dummy';
import { MarketplaceList } from './marketplace-list';

export default {
  title: 'Components/Marketplace/List',
  component: MarketplaceList,
  argTypes: {
    title: {
      name: 'Title',
    },
    placeholder: {
      name: 'No Results Placeholder',
    },
    pagination: {
      name: 'Products / Page',
    },
    items: {
      name: 'Items',
    },
  },
} satisfies Meta<typeof MarketplaceList>;

type Story = StoryObj<typeof MarketplaceList>;

export const Default: Story = { args: dummyMarketplaceList };
