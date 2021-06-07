import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IHeaderModalProps } from '../types/components';

import { HeaderModal } from './HeaderModal';

export default {
  title: 'Components/Modals/Header',
  component: HeaderModal,
  argTypes: {
    title: {
      name: 'Title',
      description: "Property displayed in modal's header",
    },
    modalOpen: {
      name: 'Visible',
      description: 'Toggles the component visibility.',
    },
    visible: {
      table: {
        disable: true,
      },
      control: false,
    },
    onCancelModal: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<IHeaderModalProps> = (args) => <HeaderModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Products by The Guild',
  modalOpen: true,
};
