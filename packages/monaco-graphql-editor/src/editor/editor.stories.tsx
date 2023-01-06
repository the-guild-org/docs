import { useRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SchemaDiffEditor, SchemaDiffEditorProps } from './schema-diff-editor';
import { SchemaEditor, SchemaEditorProps } from './schema-editor';
import { SchemaEditorApi } from './use-schema-services';
import { debugHoverSource, showWidgetInPosition } from './utils';

const TEST_SCHEMA = `type Query {
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
`;

export default {
  title: 'MonacoEditor',
  component: SchemaEditor,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

const SchemaTemplate: Story<SchemaEditorProps> = args => {
  const ref = useRef<SchemaEditorApi>(null);

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
            const identifier = prompt('What type are you looking for?', 'Query');
            if (identifier) {
              ref.current.jumpToType(identifier);
            }
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
            const identifier = prompt('What type+field are you looking for?', 'Query.me');
            const [typeName, fieldName] = identifier?.split('.') || [];
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

const SchemaDiffTemplate: Story<SchemaDiffEditorProps> = args => {
  return <SchemaDiffEditor {...args} />;
};

export const BasicSchemaEditor = SchemaTemplate.bind({});
export const BasicSchemaDiffEditor = SchemaDiffTemplate.bind({});

BasicSchemaDiffEditor.args = {
  original: TEST_SCHEMA,
  modified: `${TEST_SCHEMA}\ntype Test { id: ID! }`,
};

BasicSchemaEditor.args = {
  height: '100vh',
  schema: TEST_SCHEMA,
  hoverProviders: [debugHoverSource],
  onChange(value, event) {
    console.log('onChange', { value, event });
  },
  onMount(editor, monaco) {
    console.log('onMount', { editor, monaco });
  },
  beforeMount(monaco) {
    console.log('beforeMount', { monaco });
  },
  onBlur(value) {
    console.log('onBlur', { value });
  },
  onLanguageServiceReady(languageService) {
    console.log('onLanguageServiceReady', { languageService });
  },
  onSchemaChange(schema, sdl) {
    console.log('onSchemaChange', { schema, sdl });
  },
  onSchemaError(errors, sdl) {
    console.log('onSchemaError', { errors, sdl });
  },
  actions: [
    {
      id: 'dotan.test.click',
      label: 'My Custom Aaction',
      onRun({ editor, bridge }) {
        if (['NamedType', 'ObjectTypeDef'].includes(bridge.token.state.kind as string)) {
          const domNode = document.createElement('div');
          domNode.innerHTML = `You Selected: <strong>${bridge.token.state.kind} / ${bridge.token.state.name}</strong><br />You can show here any html that you wish!`;
          domNode.style.background = 'orange';
          showWidgetInPosition(editor as any, bridge.position, domNode);
        }
      },
    },
  ],
} as SchemaEditorProps;
