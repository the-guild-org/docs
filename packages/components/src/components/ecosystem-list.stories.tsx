import { Story, Meta } from '@storybook/react/types-6-0';
import { EcosystemList } from './ecosystem-list';

export default {
  title: 'Components/EcosystemList',
  component: EcosystemList,
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
} as Meta;

const Template: Story = args => <EcosystemList {...args} />;

export const Default = Template.bind({});
Default.args = {};
