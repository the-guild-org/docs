import * as React from 'react';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { EnrichedLanguageService } from './EnrichedLanguageService';
import {
  DecorationsSource,
  DefinitionSource,
  DiagnosticsSource,
  EditorAction,
  HoverSource,
} from './utils';

export type SchemaEditorProps = {
  schema?: string;
  hoverProviders?: HoverSource[];
  definitionProviders?: DefinitionSource[];
  diagnosticsProviders?: DiagnosticsSource[];
  decorationsProviders?: DecorationsSource[];
  actions?: EditorAction[];
  keyboardShortcuts?: (
    editorInstance: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => monaco.editor.IActionDescriptor[];
} & Omit<
  EditorProps,
  'onMount' | 'beforeMount' | 'onChange' | 'defaultValue' | 'language'
>;

export const SchemaEditor: React.FC<SchemaEditorProps> = ({
  schema,
  hoverProviders = [],
  definitionProviders = [],
  diagnosticsProviders = [],
  decorationsProviders = [],
  actions = [],
  keyboardShortcuts,
  ...rest
}) => {
  const [editorRef, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoRef, setMonaco] = React.useState<typeof monaco | null>(null);

  const languageService = React.useMemo(
    () =>
      new EnrichedLanguageService({
        schemaString: schema,
        schemaConfig: {
          buildSchemaOptions: {
            assumeValid: true,
            assumeValidSDL: true,
          },
        },
      }),
    []
  );

  React.useEffect(() => {
    if (monacoRef && editorRef) {
      if (keyboardShortcuts) {
        for (const action of keyboardShortcuts(editorRef, monacoRef)) {
          editorRef.addAction(action);
        }
      }

      for (const action of actions) {
        editorRef.addAction({
          id: action.id,
          label: action.label,
          keybindings: action.keybindings,
          contextMenuGroupId: action.contextMenuGroupId || 'navigation',
          contextMenuOrder: action.contextMenuOrder,
          run: async (editor) => {
            const model = editor.getModel();
            const position = editor.getPosition();

            if (model && position) {
              const bridge = await languageService.buildBridgeForProviders(
                model,
                position
              );

              if (bridge) {
                action.onRun({ editor: editorRef, monaco: monacoRef, bridge });
              }
            }
          },
        });
      }

      const handler = languageService.getModelChangeHandler();
      handler(editorRef, monacoRef, diagnosticsProviders, decorationsProviders);

      const onChangeDisposable = editorRef.onDidChangeModelContent(() =>
        handler(
          editorRef,
          monacoRef,
          diagnosticsProviders,
          decorationsProviders
        )
      );

      const definitionProviderDisposable =
        monacoRef.languages.registerDefinitionProvider(
          'graphql',
          languageService.getDefinitionProvider(definitionProviders)
        );

      const hoverDisposable = monacoRef.languages.registerHoverProvider(
        'graphql',
        languageService.getHoverProvider(hoverProviders)
      );

      return () => {
        hoverDisposable && hoverDisposable.dispose();
        definitionProviderDisposable && definitionProviderDisposable.dispose();
        onChangeDisposable && onChangeDisposable.dispose();
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [editorRef, monacoRef]);

  return (
    <>
      <MonacoEditor
        height={'70vh'}
        {...rest}
        beforeMount={(monaco) => setMonaco(monaco)}
        onMount={(editor) => setEditor(editor)}
        onChange={(newValue) => newValue && languageService.trySchema(newValue)}
        options={{ glyphMargin: true, ...(rest.options || {}) }}
        language="graphql"
        defaultValue={schema}
      />
    </>
  );
};
