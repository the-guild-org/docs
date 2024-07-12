import { Meta, StoryObj } from '@storybook/react';
import { dummyInfoList } from '../helpers/dummy';
import { InfoList } from './info-list';

export default {
  title: 'Components/Lists/InfoList',
  component: InfoList,
  argTypes: {
    title: {
      name: 'Title',
    },
    items: {
      name: 'Items',
    },
  },
} satisfies Meta<typeof InfoList>;

type Story = StoryObj<typeof InfoList>;

export const Default: Story = { args: dummyInfoList };
