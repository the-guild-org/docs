import { Story, Meta } from '@storybook/react';
import { Select, SelectProps } from './select';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {},
} as Meta;

const Template: Story<SelectProps> = args => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  onChange: console.log,
  options: [
    { key: 'light', name: 'Light' },
    { key: 'dark', name: 'Dark' },
    { key: 'system', name: 'System' },
  ],
};
