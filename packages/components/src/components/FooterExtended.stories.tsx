import { FormEvent } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IFooterExtendedProps } from '../types/components';
import { FooterExtended } from './FooterExtended';

export default {
  title: 'Components/Footers/Extended',
  component: FooterExtended,
  argTypes: {
    sameSite: {
      name: 'Same Site',
      description: 'Use this to force links to open in the same tab, using the root domain.',
    },
    resources: {
      name: 'Resources Links',
      description: "Use this to add current site's links to the footer.",
    },
    onNewsletterSubmit: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
} as Meta;

const Template: Story<IFooterExtendedProps> = args => <FooterExtended {...args} />;

export const Default = Template.bind({});

Default.args = {
  sameSite: false,
  resources: [
    {
      children: 'Documentation',
      title: 'Read the Docs',
      href: '/docs1',
      onClick(e) {
        e.preventDefault();
        alert('Internal link handler');
      },
    },
    {
      children: 'Quick start',
      title: 'Learn first steps',
      href: '/docs2',
      onClick(e) {
        e.preventDefault();
        alert('Internal link handler');
      },
    },
  ],
  onNewsletterSubmit(e: FormEvent, value: string) {
    console.log(e, value);
  },
};
