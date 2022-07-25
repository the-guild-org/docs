import { Story, Meta } from '@storybook/react/types-6-0';
import { IModalProps } from '../types/components';
import { dummyMarketplaceList } from '../helpers/dummy';
import { Modal } from './modal';

export default {
  title: 'Components/Modals',
  component: Modal,
  argTypes: {
    title: {
      name: 'Title',
      description: "Property displayed in modal's header",
    },
    description: {
      name: 'Description',
      description: "Property displayed in modal's header",
    },
    image: {
      name: 'Image',
      description: "Property displayed in modal's header",
    },
    visible: {
      name: 'Visible',
      description: 'Toggles the component visibility.',
    },
    placement: {
      name: 'Placement',
      description: 'Sets the position of the component',
      options: ['top', 'center', 'bottom'],
      control: {
        type: 'radio',
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

const Template: Story<IModalProps> = args => (
  <Modal {...args}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum sed mi sed sollicitudin. Duis vehicula et
      dolor at suscipit. Integer congue magna vel orci bibendum, eu vestibulum leo venenatis.
    </p>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Example Title',
  description: '',
  placement: 'center',
  visible: true,
};

export const Marketplace = Template.bind({});
Marketplace.args = {
  ...dummyMarketplaceList.items[0].modal?.header,
  title: dummyMarketplaceList.items[0].title,
  placement: 'bottom',
  visible: true,
};
