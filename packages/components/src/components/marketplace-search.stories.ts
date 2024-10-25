import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { dummyMarketplaceSearch } from '../helpers/dummy';
import { MarketplaceSearch } from './marketplace-search';

export default {
  title: 'Components/Marketplace/MarketplaceSearch',
  component: MarketplaceSearch,
  argTypes: {
    title: {
      name: 'Title',
    },
    placeholder: {
      name: 'Input Placeholder',
    },
    colorScheme: {
      control: {
        type: 'select',
      },
      options: ['green', 'black'],
    },
  },
  decorators: [hiveThemeDecorator],
} satisfies Meta<typeof MarketplaceSearch>;

type Story = StoryObj<typeof MarketplaceSearch>;

export const Default: Story = {
  name: 'MarketplaceSearch',
  args: dummyMarketplaceSearch,
};
