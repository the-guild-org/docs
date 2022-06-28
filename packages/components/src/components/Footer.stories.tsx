import { Story, Meta } from '@storybook/react/types-6-0';
import { IFooterProps } from '../types/components';
import { Footer } from './Footer';

export default {
  title: 'Components/Footers',
  component: Footer,
  argTypes: {
    sameSite: {
      name: 'Same Site',
      description:
        'Use this to force links to open in the same tab, using the root domain.',
    },
  },
} as Meta;

const Template: Story<IFooterProps> = (args) => <Footer {...args} />;

export const Default = Template.bind({});

Default.args = {
  sameSite: false,
};
