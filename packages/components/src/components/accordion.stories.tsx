import { Story, Meta } from '@storybook/react';
import { Accordion, AccordionProps } from './accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    title: {
      name: 'Title',
      description: 'Used as the title of the accordion.',
      control: {
        type: 'string',
      },
      defaultValue: 'I am accordion',
    },
    initiallyOpen: {
      name: 'Initially open',
      description: 'Is the accordion initially open?',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<AccordionProps> = args => (
  <Accordion {...args}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum sed mi sed sollicitudin. Duis vehicula et
      dolor at suscipit. Integer congue magna vel orci bibendum, eu vestibulum leo venenatis.
    </p>
  </Accordion>
);

export const Default = Template.bind({});

Default.args = {};
