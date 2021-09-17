import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ISchemaPageProps } from '../types/components';

import { SchemaType } from './SchemaType';

export default {
    title: 'Components/Schema Type',
    component: SchemaType,
    argTypes: {
        schemaName: {
            name: 'Title',
        }
    }
} as Meta;

const Template: Story<ISchemaPageProps> = (args) => <SchemaType {...args} />;

export const Default = Template.bind({});
Default.args = {
    schemaName: 'Schema Type 1 Schema Type Schema Type Schema Type Schema Type Schema Type Schema Type Schema Type Schema Type',
    tags: ['typeScript', 'frontend', 'backend'],
};
