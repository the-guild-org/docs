import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Header } from './Header';
import { HeaderProps } from './types';
import { HeaderSearch } from './Header.styles';
import { headerThemedIcons } from './Header.assets';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    accentColor: {
      name: 'Accent Color',
      description: 'Used in the hover effect on the navigation.',
      control: {
        type: 'color'
      }
    },
    themeSwitch: {
      name: 'Theme Switch',
      description: 'Use this to add a theme switch button (only use on sites with existing theme support).'
    },
    searchComponent: {
      name: 'Search Component',
      description: 'Pass a React component to be displayed within the header. In SB it is strictly used for display',
      table: {
        disable: true
      },
      control: false
    },
    sameSite: {
      name: 'Same Site',
      description: 'Use this to force links to open in the same tab, using the root domain.',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  }
} as Meta

const Template: Story<HeaderProps> = args => <Header {...args}>Header</Header>

export const Default = Template.bind({})
Default.args = {
  accentColor: '#03a6a6',
  sameSite: true,
  themeSwitch: false,
}

export const Enhanced = Template.bind({})
Enhanced.args = {
  accentColor: '#e15799',
  sameSite: false,
  searchComponent:
    <HeaderSearch onClick={() => console.log('Open dialog')} ref={React.createRef()}>
      <img src={headerThemedIcons(false).search} height="18" width="18" alt="Search icon" />
      <span>Search...</span>
    </HeaderSearch>,
  themeSwitch: true,
}


