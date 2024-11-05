import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { IMarketplaceListProps } from '../types/components';
import { MarketplaceList } from './marketplace-list';
import { dummyMarketplaceSearch } from './marketplace-search.stories';

const meta: Meta<typeof MarketplaceList> = {
  title: 'Components/MarketplaceList',
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
    colorScheme: {
      control: {
        type: 'select',
      },
      options: ['green', 'black'],
    },
  },
  decorators: [
    hiveThemeDecorator,
    Story => (
      <div className="p-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MarketplaceList>;

export const Default: Story = {
  name: 'MarketplaceList',
  args: dummyMarketplaceList(),
};

export const Green: Story = {
  name: 'MarketplaceList Green',
  args: { ...Default.args, colorScheme: 'green' },
};

function dummyMarketplaceList(): IMarketplaceListProps {
  return {
    title: 'Trending & Last Update',
    placeholder: 'There are no items available...',
    pagination: 4,
    items: dummyMarketplaceSearch().primaryList.items,
  };
}
