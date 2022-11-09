import { Story, Meta } from '@storybook/react';
import { IHeaderProps } from '../types/components';
import { Header } from './header';

export default {
  title: 'Components/Headers',
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
      description: 'Used to highlight the active navigation item',
      options: ['/services', '/open-source', '/blog', '/about-us'],
      control: {
        type: 'radio',
      },
    },
    themeSwitch: {
      name: 'Theme Switch',
      description: 'Use this to add a theme switch button (only use on sites with existing theme support).',
    },
  },
} as Meta;

const Template: Story<IHeaderProps> = args => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  accentColor: '#03a6a6',
  activeLink: '/open-source',
  searchBarProps: {
    version: 'v2',
  },
};
