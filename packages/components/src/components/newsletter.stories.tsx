import { FormEvent } from 'react';
import { Story, Meta } from '@storybook/react';
import { Newsletter, NewsletterProps } from './newsletter';

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

const Template: Story<NewsletterProps> = args => <Newsletter {...args} />;

export const Default = Template.bind({});
Default.args = {
  onNewsletterSubmit(e: FormEvent, value: string) {
    console.log(e, value);
  },
};
