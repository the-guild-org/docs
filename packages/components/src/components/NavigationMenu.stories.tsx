import { Story, Meta } from '@storybook/react/types-6-0';
import { NavigationMenu } from './NavigationMenu';

export default {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  argTypes: {},
} as Meta;

const Template: Story = args => <NavigationMenu {...args} />;

export const Default = Template.bind({});
Default.args = {};
