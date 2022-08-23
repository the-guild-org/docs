import { Story, Meta } from '@storybook/react';
import { IHeroMarketplaceProps } from '../types/components';
import { HeroMarketplace } from './hero-marketplace';
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
} as Meta;

const Template: Story<IHeroMarketplaceProps> = args => <HeroMarketplace {...args} />;

export const Default = Template.bind({});
Default.args = dummyHeroMarketplace;
