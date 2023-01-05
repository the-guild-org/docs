import { Meta, Story } from '@storybook/react';
import { dummySchemaPage } from '../helpers/dummy';
import { ISchemaPageProps } from '../types/components';
import { SchemaPage } from './schema-type';

export default {
  title: 'Components/Schema Type',
  component: SchemaPage,
  argTypes: {
    schemaName: {
      name: 'Title',
    },
  },
} as Meta;

const Template: Story<ISchemaPageProps> = args => <SchemaPage {...args} />;

export const Default = Template.bind({});
Default.args = dummySchemaPage;
