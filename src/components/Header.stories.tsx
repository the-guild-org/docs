import React from 'react'
import { Header } from './Header';
import { HeaderSearch } from './Header.styles';
import { headerThemedIcons } from './Header.assets';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { IHeaderProps } from './types';

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
    sbTheme: {
      name: 'StoryBook Dark Theme',
      description: 'Only use in SB'
    }
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  }
} as Meta

const Template: Story<IHeaderProps> = args => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
  accentColor: '#03a6a6',
  sameSite: true,
  themeSwitch: false,
  // StoryBook only 
  sbTheme: false,
}

export const Enhanced = Template.bind({})
Enhanced.args = {
  accentColor: '#e15799',
  sameSite: false,
  themeSwitch: true,
  searchComponent:
    <HeaderSearch>
      <img src={headerThemedIcons(false).search} height="18" width="18" alt="Search icon" />
      <span>Search...</span>
    </HeaderSearch>,
  // StoryBook only 
  sbTheme: false,
}


