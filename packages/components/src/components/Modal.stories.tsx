import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IModalProps } from './types';

import { Modal } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    title: {
      name: 'Title',
      description: "Property displayed in modal's header",
    },
    visible: {
      name: 'Visible',
      description: 'Toggles the component visibility.',
    },
    placement: {
      name: 'Placement',
      description: 'Sets the position of the component',
      control: {
        type: 'radio',
        options: ['top', 'center', 'bottom'],
      },
    },
    onCancel: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
} as Meta;

const Template: Story<IModalProps> = (args) => (
  <Modal {...args}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum sed
      mi sed sollicitudin. Duis vehicula et dolor at suscipit. Integer congue
      magna vel orci bibendum, eu vestibulum leo venenatis.
    </p>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Example Title',
  placement: 'center',
  visible: true,
};
