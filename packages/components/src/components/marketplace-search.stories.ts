import { Meta, StoryObj } from '@storybook/react';
import { dummyMarketplaceSearch } from '../helpers/dummy';
import { MarketplaceSearch } from './marketplace-search';

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
} satisfies Meta<typeof MarketplaceSearch>;

type Story = StoryObj<typeof MarketplaceSearch>;

export const Default: Story = { args: dummyMarketplaceSearch };
