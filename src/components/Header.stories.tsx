import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Header, HeaderProps } from './Header'

export default {
  title: 'Header',
  component: Header,
  argTypes: {},
} as Meta

const Template: Story<HeaderProps> = args => <Header {...args}>Header</Header>

export const Primary = Template.bind({})
Primary.args = {
  linkUrl: 'https://the-guild.dev',
  navbarBackgroundColor: "var(--ifm-navbar-background-color)",
  navbarLinkColor: "var(--ifm-navbar-link-color)",
}
