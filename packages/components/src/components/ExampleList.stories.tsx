import React from 'react';
// import { Story, Meta } from '@storybook/react/types-6-0';

import ExampleList from './ExampleList';

export default {
    title: 'Components/ExampleList',
    component: ExampleList,
}

const Template = (args) => <ExampleList />;

export const Default = Template.bind({});
Default.args = {};
