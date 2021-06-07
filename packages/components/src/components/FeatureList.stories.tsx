import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IFeatureListProps } from '../types/components';
import { dummyFeatureList } from '../helpers/dummy';

import { FeatureList } from './FeatureList';

export default {
  title: 'Components/Lists/Features',
  component: FeatureList,
  argTypes: {
    title: {
      name: 'Title',
    },
    items: {
      name: 'Features',
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<IFeatureListProps> = (args) => <FeatureList {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...dummyFeatureList,
};
