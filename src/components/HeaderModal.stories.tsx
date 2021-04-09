import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { HeaderModal } from './HeaderModal';
import { HeaderModalProps } from './types';

export default {
  title: 'HeaderModal',
  component: HeaderModal,
} as Meta

const Template: Story<HeaderModalProps> = args => (
  <HeaderModal {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  darkTheme: false,
  modalOpen: true
}
