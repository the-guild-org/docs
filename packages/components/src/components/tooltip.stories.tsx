import { Story, Meta } from '@storybook/react/types-6-0';
import { Tooltip } from './tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <Tooltip.Provider skipDelayDuration={1}>
    <Tooltip content={args.content} {...args}>
      {args.children}{' '}
    </Tooltip>
  </Tooltip.Provider>
);

export const Default = Template.bind({});
Default.args = {
  children: <a>Hey</a>,
  content: <h1>Content</h1>,
};
