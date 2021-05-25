import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SchemaEditor, SchemaEditorProps } from './SchemaEditor';
import { debugHoverSource, showWidgetInPosition } from './utils';

export default {
  title: 'SchemaViewer',
  component: SchemaEditor,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const Template: Story<SchemaEditorProps> = (args) => <SchemaEditor {...args} />;

export const Default = Template.bind({});

Default.args = {
  schema: `type Query {
  ping: Boolean
  me: User!
}

""" Represents a simple user """
type User {
  id: ID!
  name: String!
}`,
  hoverProviders: [debugHoverSource],
  actions: [
    {
      id: 'dotan.test.click',
      label: 'Inspect with Hive',
      onRun: ({ editor, bridge }) => {
        if (
          ['NamedType', 'ObjectTypeDef'].includes(
            bridge.token.state.kind as string
          )
        ) {
          const domNode = document.createElement('div');
          domNode.innerHTML = `You Selected: <strong>${bridge.token.state.kind} / ${bridge.token.state.name}</strong><br />You can show here any html that you wish!`;
          domNode.style.background = 'orange';
          showWidgetInPosition(editor, bridge.position, domNode);
        }
      },
    },
  ],
};
