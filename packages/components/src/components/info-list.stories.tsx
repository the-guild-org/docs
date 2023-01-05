import { Meta, Story } from '@storybook/react';
import { dummyInfoList } from '../helpers/dummy';
import { IInfoListProps } from '../types/components';
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
} as Meta;

const Template: Story<IInfoListProps> = args => <InfoList {...args} />;

export const Default = Template.bind({});
Default.args = dummyInfoList;
