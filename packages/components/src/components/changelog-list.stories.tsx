import React from 'react';
import { Meta, Story } from '@storybook/react';
import { dummyChangelogList } from '../helpers/dummy';
import { IChangelogListProps } from '../types/components';
import { ProductUpdates } from './changelog-list';

export default {
  title: 'Components/Changelog/List',
  component: ProductUpdates,
  argTypes: {},
} as Meta;

const Template: Story<IChangelogListProps> = args => (
  <div>
    <ProductUpdates {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  changelogs: dummyChangelogList,
};
