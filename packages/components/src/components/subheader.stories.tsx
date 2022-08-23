import { Story, Meta } from '@storybook/react';
import { ISubheaderProps } from '../types/components';
import { dummySubheader } from '../helpers/dummy';
import { Subheader } from './subheader';

export default {
  title: 'Components/Headers/Sub Header',
  component: Subheader,
  argTypes: {
    product: {
      name: 'Product Information',
    },
    links: {
      name: 'Navigation Links',
    },
    cta: {
      name: 'Call to Action',
    },
    activeLink: {
      name: 'Active Link',
      options: ['/', '/marketplace', '/features', '/docs/introduction'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<ISubheaderProps> = args => <Subheader {...args} />;

export const Default = Template.bind({});
Default.args = dummySubheader;
