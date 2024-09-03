import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Heading as _Heading, HeadingProps } from './heading';

export default {
  title: 'Components/Heading',
  component: _Heading,
  args: {
    children: 'Open-source GraphQL management platform',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'div'],
    },
    size: {
      control: { type: 'select' },
      options: ['xl', 'lg', 'md', 'sm'],
    },
    children: {
      control: 'text',
    },
  },
  parameters: {
    padding: true,
  },
} satisfies Meta<HeadingProps>;

export const Heading: StoryObj<HeadingProps> = {
  args: {
    as: 'h1',
    size: 'xl',
  },
};
