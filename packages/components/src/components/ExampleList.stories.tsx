import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { IExampleListSearchProps } from '../types/components';
import { dummyExampleList } from '../helpers/dummy';

import { ExampleList } from './ExampleList';

export default {
    title: 'Components/ExampleList',
    component: ExampleList,
    argTypes: {
        title: {
            name: 'Title',
        },
        placeholder: {
            name: 'Input placeholder',
        },
    },
} as Meta;

const Template: Story<IExampleListSearchProps> = (args) => (
    <ExampleList {...args} />
);

export const Example = Template.bind({});
Example.args = {
  ...dummyExampleList
};
