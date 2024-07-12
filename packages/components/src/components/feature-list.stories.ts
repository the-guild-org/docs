import { Meta, StoryObj } from '@storybook/react';
import { dummyFeatureList } from '../helpers/dummy';
import { FeatureList } from './feature-list';

export default {
  title: 'Components/Lists/Features',
  component: FeatureList,
  argTypes: {
    title: {
      name: 'Title',
    },
    items: {
      name: 'Features',
    },
  },
} satisfies Meta<typeof FeatureList>;

type Story = StoryObj<typeof FeatureList>;

export const Default: Story = { args: dummyFeatureList };
