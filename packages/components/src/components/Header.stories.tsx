import { Story, Meta } from '@storybook/react/types-6-0';
import { IHeaderProps } from '../types/components';
import { Header } from './Header';

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
  themeSwitch: true,
  disableSearch: false,
  searchBarProps: {
    version: 'v2',
  },
};
