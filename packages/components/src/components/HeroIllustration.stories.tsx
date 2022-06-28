import { Story, Meta } from '@storybook/react/types-6-0';
import { IHeroIllustrationProps } from '../types/components';
import { dummyHeroIllustration } from '../helpers/dummy';
import { HeroIllustration } from './HeroIllustration';

export default {
  title: 'Components/Heroes/Illustration',
  component: HeroIllustration,
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
    flipped: {
      name: 'Flip Orientation',
    },
    link: {
      name: 'Link',
    },
  },
} as Meta;

const Template: Story<IHeroIllustrationProps> = args => <HeroIllustration {...args} />;

export const Default = Template.bind({});

Default.args = dummyHeroIllustration;
