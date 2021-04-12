import React from 'react'
import { HeaderModal } from './HeaderModal';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { IHeaderModalProps } from './types';

export default {
  title: 'Header Modal',
  component: HeaderModal,
  argTypes: {
    modalOpen: {
      name: 'Active',
      description: 'Toggles the component visibility.',
    },
    toggleModal: {
      table: {
        disable: true
      },
      control: false
    },
    sbTheme: {
      name: 'StoryBook Dark Theme',
      description: 'Only use in SB'
    }
  },
} as Meta

const Template: Story<IHeaderModalProps> = args => (
  <HeaderModal {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  modalOpen: true,
}
