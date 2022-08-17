import { Story, Meta } from '@storybook/react';
import { SolutionsMenu } from './solutions-menu';

export default {
  title: 'Components/SolutionsMenu',
  component: SolutionsMenu,
  argTypes: {},
} as Meta;

export const Default: Story = () => <SolutionsMenu />;
