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

export const NoScrollingOnClick: StoryObj<HeadingProps> = {
  args: { as: 'h2', size: 'lg' },
  decorators: [
    Story => (
      <div className="relative h-[150vh]">
        <div className="absolute top-1/2">
          <Story />
        </div>
      </div>
    ),
  ],
  play(ctx) {
    const anchor = ctx.canvasElement.querySelector('a')!;
    anchor.click();
    if (window.location.hash !== '#open-source-graphql-management-platform') {
      throw new Error('Expected hash to be set');
    }
    if (window.scrollY !== 0) {
      throw new Error('Expected scroll to be at top');
    }
  },
};
