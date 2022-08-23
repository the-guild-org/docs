import { Story, Meta } from '@storybook/react';
import { IFooterProps } from '../types/components';
import { Footer } from './footer';

export default {
  title: 'Components/Footers',
  component: Footer,
  argTypes: {
    sameSite: {
      name: 'Same Site',
      description: 'Use this to force links to open in the same tab, using the root domain.',
    },
  },
} as Meta;

const Template: Story<IFooterProps> = args => <Footer {...args} />;

export const Default = Template.bind({});

Default.args = {
  sameSite: false,
};
