import { Story, Meta } from '@storybook/react/types-6-0';
import { SolutionsMenu } from './SolutionsMenu';

export default {
  title: 'Components/SolutionsMenu',
  component: SolutionsMenu,
  argTypes: {},
} as Meta;

const Template: Story = args => <SolutionsMenu {...args} />;

export const Default = Template.bind({});
Default.args = {};
