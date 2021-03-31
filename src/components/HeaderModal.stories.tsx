import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { HeaderModal, HeaderModalProps } from './HeaderModal'

export default {
  title: 'HeaderModal',
  component: HeaderModal,
} as Meta

const Template: Story<HeaderModalProps> = args => (
  <HeaderModal {...args}>HeaderModal</HeaderModal>
)

export const Primary = Template.bind({})
Primary.args = {
  linkUrl: 'https://the-guild.dev',
  navbarBackgroundColor: "var(--ifm-navbar-background-color)",
  navbarLinkColor: "var(--ifm-navbar-link-color)",
  navbarLinkHoverColor: "var(--ifm-link-hover-color)",
}
