import { FormEvent } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { INewsletterProps } from '../types/components';
import { Newsletter } from './Newsletter';

export default {
  title: 'Components/Newsletter',
  component: Newsletter,
  argTypes: {
    onNewsletterSubmit: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
} as Meta;

const Template: Story<INewsletterProps> = (args) => <Newsletter {...args} />;

export const Default = Template.bind({});
Default.args = {
  onNewsletterSubmit(e: FormEvent, value: string) {
    console.log(e, value);
  },
};
