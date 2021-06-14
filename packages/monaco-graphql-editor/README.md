## `@theguild/editor` 

A monaco editor with built-in support for GraphQL Language Service, with features like online parser, syntax highligh, schema-building validations, hover and much more. The integration between Monaco editor and the GraphQL language service is exposed through a simple props/events based interface, with the awareness of the GraphQL schema.

### Getting Started

Start by installing the package from NPM:

```
yarn add monaco-editor @monaco-editor/react @theguild/editor
```

## `SchemaEditor`

Import and use it as a component:

```tsx
import { SchemaEditor } from '@theguild/editor';

const MyEditor: React.FC = () => {
  return <SchemaEditor />
}
```

### Debugging

If you wish to get all information about specific tokens in your GraphQL editor, you can add the debug hover provider:

```tsx
import { SchemaEditor, debugHoverSource } from '@theguild/editor';

const MyEditor: React.FC = () => {
  return <SchemaEditor hoverProviders={[debugHoverSource]} />
}
```

### Editor Events

You can listen to the following events, on top of the Monaco editor:

* `onBlur?: (value: string) => void`
* `onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;`
* `onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;`

### Extending the editor

#### Custom Hover

To create a custom hover provider, you can pass the following prop:

```tsx
import { SchemaEditor, HoverSource } from '@theguild/editor';

export const myHoverProvider: HoverSource = {
  forNode: ({ token }) => ({
    value: `You hovered on ${token.state.name}`,
  }),
};

const MyEditor: React.FC = () => {
  return <SchemaEditor hoverProviders={[myHoverProvider]} />
}
```

#### Custom Definition

To create a custom `Jump to definition` source provider, you can pass the following prop:

```tsx
import { SchemaEditor, DefinitionSource } from '@theguild/editor';

export const myDefinitionSource: DefinitionSource = {
  forNode: ({ schema, model, token }) => {
    // You can access the actual GQL type / schema and everything you need.
    if (token.state && token.state.kind === 'NamedType' && token.state.name) {
      const type = schema.getType(token.state.name);

      if (type && type.astNode && type.astNode.loc) {
        return [
          {
            range: {
              startLineNumber: type.astNode.loc.startToken.line,
              startColumn: type.astNode.loc.startToken.column,
              endLineNumber: type.astNode.loc.endToken.line + 1,
              endColumn: type.astNode.loc.endToken.column,
            },
            uri: model.uri,
          },
        ];
      }
    }

    return [];
  },
};

const MyEditor: React.FC = () => {
  return <SchemaEditor definitionProviders={[myDefinitionSource]} />
}
```

#### Custom Diagnostics

To mark custom errors on GraphQL based nodes, you can implement a custom diagnostics provider.

```tsx
import { SchemaEditor, DiagnosticsSource, toMarkerData, getRange } from '@theguild/editor';

export const myDiagnosticsSoruce: DiagnosticsSource = {
 async forDocument({ model, document, languageService }) {
   // Here you can validate and check whatever you need regarding the document.
   // You can either return an empty array for valid doc, or an array with positions.
   return [
     toMarkerData({
        severity: DIAGNOSTIC_SEVERITY.Error,
        message: e.message,
        source: 'GraphQL: Syntax',
        range: getRange(e.locations![0], document),
      })
    ];
 }
};

const MyEditor: React.FC = () => {
  return <SchemaEditor diagnosticsProviders={[myDiagnosticsSoruce]} />
}
```



