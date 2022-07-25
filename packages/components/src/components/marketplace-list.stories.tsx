import { Story, Meta } from '@storybook/react/types-6-0';
import { IMarketplaceListProps } from '../types/components';
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
} as Meta;

const Template: Story<IMarketplaceListProps> = args => <MarketplaceList {...args} />;

export const Default = Template.bind({});
Default.args = dummyMarketplaceList;
