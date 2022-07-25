import { Story, Meta } from '@storybook/react/types-6-0';
import { Instruction } from './instruction';

export default {
  title: 'Components/Instruction',
  component: Instruction,
  argTypes: {},
  parameters: {},
} as Meta;

const Template: Story<any> = args => <Instruction {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      I like turtles
      <br />
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua.
    </>
  ),
};

export const CodeBlock = Template.bind({});
CodeBlock.args = {
  children: (
    <>
      I like turtles
      <br />
      <pre style={{ marginTop: 10 }}>
        <code>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br />
          sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
          <br />
          aliquyam erat, sed diam voluptua.
          <br />
        </code>
      </pre>
    </>
  ),
};
