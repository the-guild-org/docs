import { Meta, StoryObj } from '@storybook/react';
import { SchemaPage } from './schema-type';
import marketplaceListImage from '../static/dummy/marketplace/logo-modules.svg';
import dedent from 'dedent'

export default {
  title: 'Components/Schema Type',
  component: SchemaPage,
  argTypes: {
    schemaName: {
      name: 'Title',
    },
  },
} as Meta<typeof SchemaPage>;

type Story = StoryObj<typeof SchemaPage>;

const dummySchema = dedent(/* GraphQL */ `
  type Query {
    ping: Boolean
    me: User!
  }

  " represents a valid email "
  scalar Email

  """
  Represents a simple user
  """
  type User {
    id: ID!
    email: Email!
    profile: Profile!
  }

  type Profile {
    name: String
    age: Int
  }
`);

const dummyOperations = dedent(/* GraphQL */ `
  query Me {
    me {
      id
      profile {
        name
      }
    }
    ping
  }

  fragment UserFields on User {
    profile {
      name
    }
  }
`);

export const Default: Story = {
  args: {
    schemaName: 'Schema Type 1',
    tags: ['TypeScript', 'Frontend', 'Backend'],
    editorData: [
      {
        title: 'schema.graphql',
        frameworks: ['TS', 'React', 'Frontend'],
        schema: dummySchema,
        image: marketplaceListImage,
      },
      {
        title: 'operation.graphql',
        frameworks: [],
        operations: dummyOperations,
        image: marketplaceListImage,
      },
      {
        title: 'codegen.yml',
        frameworks: [],
        schema: dummySchema,
        image: marketplaceListImage,
      },
      {
        title: '',
        schema: dummySchema,
      },
    ],
  },
};
