import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IBannerProps } from '../types/components';

import { Banner } from './Banner';

export default {
  title: 'Components/Headers/Banner',
  component: Banner,
  argTypes: {
    backgroundColor: {
      name: 'Background Color',
      description: 'Used as the background for the banner.',
      control: {
        type: 'color',
      },
    },
    color: {
      name: 'Text Color',
      description: 'Used as color for the text.',
      control: {
        type: 'color',
      },
    },
  },
} as Meta;

const Template: Story<IBannerProps> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>This is an important announcement.</div>,
};
