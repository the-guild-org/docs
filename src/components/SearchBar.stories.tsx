import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ISearchBarProps } from './types';

import { SearchBar } from './SearchBar';

export default {
  title: 'Search Bar',
  component: SearchBar,
  argTypes: {
    accentColor: {
      name: 'Accent Color',
      description: 'Used in the hover effect on the navigation.',
      control: {
        type: 'color',
      },
    },
    placeholder: {
      name: 'Placeholder',
      description: "Property displayed in component's input",
    },
    title: {
      name: 'Title',
      description: "Property displayed in component's modal header",
    },
  },
} as Meta;

const Template: Story<ISearchBarProps> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  accentColor: '#03a6a6',
  title: 'Search the docs',
  placeholder: 'Search...',
};
