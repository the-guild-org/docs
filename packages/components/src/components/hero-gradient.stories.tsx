import { Story, Meta } from '@storybook/react';
import { IHeroGradientProps } from '../types/components';
import { dummyHeroGradient } from '../helpers/dummy';
import { HeroGradient } from './hero-gradient';

export default {
  title: 'Components/Heroes/Gradient',
  component: HeroGradient,
  argTypes: {
    title: {
      name: 'Title',
    },
    description: {
      name: 'Description',
    },
    image: {
      name: 'Illustration',
    },
    link: {
      name: 'Call to Action',
    },
    version: {
      name: 'Library Version',
    },
    colors: {
      name: 'Background Glow Colors',
    },
  },
} as Meta;

const Template: Story<IHeroGradientProps> = args => <HeroGradient {...args} />;

export const Default = Template.bind({});
Default.args = dummyHeroGradient;

export const MultiLinks = Template.bind({});
MultiLinks.args = {
  ...dummyHeroGradient,
  link: [
    {
      children: 'Start Learning',
      title: 'Start Learning',
      href: '#',
    },
    {
      children: 'Docs',
      title: 'Docs',
      href: '#2',
    },
  ],
};
