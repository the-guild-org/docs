import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../.storybook/hive-theme-decorator';
import { dummyMarketplaceList } from '../helpers/dummy';
import { MarketplaceList } from './marketplace-list';

const meta: Meta<typeof MarketplaceList> = {
  title: 'Components/Marketplace/MarketplaceList',
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
  decorators: [
    hiveThemeDecorator,
    Story => (
      <div className="bg-green-1000">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MarketplaceList>;

export const Default: Story = {
  name: 'MarketplaceList',
  args: dummyMarketplaceList,
};
