import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { EditorApi, SchemaEditor, SchemaEditorProps } from './SchemaEditor';
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

const Template: Story<SchemaEditorProps> = (args) => {
  const ref = React.useRef<EditorApi>(null);

  return (
    <div>
      <button
        style={{
          margin: 10,
          padding: 5,
          background: 'lightgray',
          borderRadius: 10,
        }}
        onClick={() => {
          if (ref.current) {
            const identifier = prompt(
              'What type are you looking for?',
              'Query'
            );
            ref.current.jumpToType(identifier);
          }
        }}
      >
        Jump To Type
      </button>
      <button
        style={{
          margin: 10,
          padding: 5,
          background: 'lightgray',
          borderRadius: 10,
        }}
        onClick={() => {
          if (ref.current) {
            const identifier = prompt(
              'What type+field are you looking for?',
              'Query.me'
            );
            const [typeName, fieldName] = identifier.split('.');
            ref.current.jumpToField(typeName, fieldName);
          }
        }}
      >
        Jump To Field
      </button>
      <SchemaEditor ref={ref} {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  height: '100vh',
  schema: `type Query {
  ping: Boolean
  me: User!
}

" represents a valid email "
scalar Email

""" Represents a simple user """
type User {
  id: ID!
  email: Email!
  profile: Profile!
}

type Profile {
  name: String
  age: Int
}
`,
  hoverProviders: [debugHoverSource],
  onChange: (value, event) => {
    console.log('onChange', { value, event });
  },
  onMount: (editor, monaco) => {
    console.log('onMount', { editor, monaco });
  },
  beforeMount: (monaco) => {
    console.log('beforeMount', { monaco });
  },
  onBlur: (value) => {
    console.log('onBlur', { value });
  },
  onLanguageServiceReady: (languageService) => {
    console.log('onLanguageServiceReady', { languageService });
  },
  onSchemaChange: (schema, sdl) => {
    console.log('onSchemaChange', { schema, sdl });
  },
  onSchemaError: (errors, sdl) => {
    console.log('onSchemaError', { errors, sdl });
  },
  actions: [
    {
      id: 'dotan.test.click',
      label: 'My Custom Aaction',
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
} as SchemaEditorProps;
