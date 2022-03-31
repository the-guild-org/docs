## `@theguild/editor`

A monaco editor with built-in support for GraphQL Language Service, with features like online parser, syntax highligh, schema-building validations, hover and much more. The integration between Monaco editor and the GraphQL language service is exposed through a simple props/events based interface, with the awareness of the GraphQL schema.

#### Acknowledgment

This library was developed as part of the [Schema Prototyper Grant](https://forum.thegraph.com/t/schema-prototyper/1732) given by [The Graph Foundation](https://thegraph.com/).

### Getting Started

Start by installing the package from NPM:

```
yarn add monaco-editor @monaco-editor/react @theguild/editor
```

## `SchemaEditor`

Import and use it as a component:

```tsx
import { SchemaEditor } from '@theguild/editor'

const initialSchema = `type Query { foo: String }`

const MyEditor: React.FC = () => {
  return <SchemaEditor schema={initialSchema} />
}
```

### Debugging

If you wish to get all information about specific tokens in your GraphQL editor, you can add the debug hover provider:

```tsx
import { SchemaEditor, debugHoverSource } from '@theguild/editor'

const MyEditor: React.FC = () => {
  return <SchemaEditor hoverProviders={[debugHoverSource]} />
}
```

### Editor Events

You can listen to the following events, on top of the Monaco editor:

- `onBlur?: (value: string) => void` - triggered when the editor is being blurred.
- `onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;` - triggered when the language service is ready.
- `onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;` - triggered when a valid schema is present in the editor.
- `onSchemaError?: (errors: GraphQLError[], sdl: string, languageService: EnrichedLanguageService) => void;` - triggered when an invalid schema is present in the editor.

### Extending the editor

#### Custom Hover

To create a custom hover provider, you can pass the following prop:

```tsx
import { SchemaEditor, HoverSource } from '@theguild/editor'

export const myHoverProvider: HoverSource = {
  forNode: ({ token }) => ({
    value: `You hovered on ${token.state.name}`
  })
}

const MyEditor: React.FC = () => {
  return <SchemaEditor hoverProviders={[myHoverProvider]} />
}
```

#### Custom Definition

To create a custom `Jump to definition` source provider, you can pass the following prop:

```tsx
import { SchemaEditor, DefinitionSource } from '@theguild/editor'

export const myDefinitionSource: DefinitionSource = {
  forNode: ({ schema, model, token }) => {
    // You can access the actual GQL type / schema and everything you need.
    if (token.state && token.state.kind === 'NamedType' && token.state.name) {
      const type = schema.getType(token.state.name)

      if (type && type.astNode && type.astNode.loc) {
        return [
          {
            range: {
              startLineNumber: type.astNode.loc.startToken.line,
              startColumn: type.astNode.loc.startToken.column,
              endLineNumber: type.astNode.loc.endToken.line + 1,
              endColumn: type.astNode.loc.endToken.column
            },
            uri: model.uri
          }
        ]
      }
    }

    return []
  }
}

const MyEditor: React.FC = () => {
  return <SchemaEditor definitionProviders={[myDefinitionSource]} />
}
```

#### Custom Diagnostics

To mark custom errors on GraphQL based nodes, you can implement a custom diagnostics provider.

```tsx
import {
  SchemaEditor,
  DiagnosticsSource,
  toMarkerData,
  getRange
} from '@theguild/editor'

export const myDiagnosticsSoruce: DiagnosticsSource = {
  async forDocument({ model, document, languageService }) {
    // Here you can validate and check whatever you need regarding the document.
    // You can either return an empty array for valid doc, or an array with positions.
    return [
      toMarkerData({
        severity: DIAGNOSTIC_SEVERITY.Error,
        message: e.message,
        source: 'GraphQL: Syntax',
        range: getRange(e.locations![0], document)
      })
    ]
  }
}

const MyEditor: React.FC = () => {
  return <SchemaEditor diagnosticsProviders={[myDiagnosticsSoruce]} />
}
```

#### Custom Editor Actions

You can add custom editor actions (context menu and keyboard shortcuts) through `actions` API:

```tsx
import { SchemaEditor, showWidgetInPosition } from '@theguild/editor'

const MyEditor: React.FC = () => {
  return (
    <SchemaEditor
      actions={[
        {
          id: 'my.custom.action',
          label: 'My Custom Action',
          onRun: ({ editor, bridge }) => {
            // You can use the bridge here to know exactly what was clicked in terms of GQL identifiers
            if (
              ['NamedType', 'ObjectTypeDef'].includes(
                bridge.token.state.kind as string
              )
            ) {
              const domNode = document.createElement('div')
              domNode.innerHTML = `You Selected: <strong>${bridge.token.state.kind} / ${bridge.token.state.name}</strong><br />You can show here any html that you wish!`
              domNode.style.background = 'orange'
              showWidgetInPosition(editor, bridge.position, domNode)
            }
          }
        }
      ]}
    />
  )
}
```
