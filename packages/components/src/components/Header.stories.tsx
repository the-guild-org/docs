import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IHeaderProps } from './types';

import { Header } from './Header';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    accentColor: {
      name: 'Accent Color',
      description: 'Used in the hover effect on the navigation.',
      control: {
        type: 'color',
      },
    },
    activeLink: {
      name: 'Active Link',
      description: 'Used ',
      control: {
        type: 'radio',
        options: ['/services', '/open-source', '/blog', '/about-us'],
      },
    },
    sameSite: {
      name: 'Same Site',
      description:
        'Use this to force links to open in the same tab, using the root domain.',
    },
    themeSwitch: {
      name: 'Theme Switch',
      description:
        'Use this to add a theme switch button (only use on sites with existing theme support).',
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<IHeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  accentColor: '#03a6a6',
  activeLink: '/open-source',
  sameSite: false,
  themeSwitch: true,
};
