import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IHeroGradientProps } from '../types/components';
import { dummyHeroGradient } from '../helpers/dummy';

import { HeroGradient } from './HeroGradient';

export default {
  title: 'Components/Heroes/Gradient',
  component: HeroGradient,
  argTypes: {
    title: {
      name: 'Title',
    },
    description: {
      name: 'Description',
    },
    image: {
      name: 'Illustration',
    },
    link: {
      name: 'Call to Action',
    },
    version: {
      name: 'Library Version',
    },
    colors: {
      name: 'Background Glow Colors',
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<IHeroGradientProps> = (args) => (
  <HeroGradient {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...dummyHeroGradient,
};

export const Simple = Template.bind({});
Simple.args = {
  ...dummyHeroGradient,
  image: undefined,
};
