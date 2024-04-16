import { Meta, Story } from '@storybook/react';
import { dummyChangelogList } from '../helpers/dummy';
import { ProductUpdates, ChangelogType } from './changelog-list';
import React from 'react';

export default {
    title: 'Components/Changelog/List',
    component: ProductUpdates,
    argTypes: {}
} as Meta;

const Template: Story<ChangelogType> = args => <ProductUpdates {...args} />;

export const Default = Template.bind({});
Default.args = {
    changelogs: dummyChangelogList
};

