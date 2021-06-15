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
  locToRange,
} from './utils';
import {
  GraphQLError,
  GraphQLSchema,
  isInterfaceType,
  isObjectType,
} from 'graphql';

export type EditorApi = {
  jumpToType(typeName: string): void;
  jumpToField(typeName: string, fieldName: string): void;
};

export type SchemaEditorProps = {
  schema?: string;
  hoverProviders?: HoverSource[];
  definitionProviders?: DefinitionSource[];
  diagnosticsProviders?: DiagnosticsSource[];
  decorationsProviders?: DecorationsSource[];
  actions?: EditorAction[];
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService
  ) => void;
  sharedLanguageService?: EnrichedLanguageService;
  keyboardShortcuts?: (
    editorInstance: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => monaco.editor.IActionDescriptor[];
} & Omit<EditorProps, 'language'>;

function BaseSchemaEditor(
  {
    schema,
    hoverProviders = [],
    definitionProviders = [],
    diagnosticsProviders = [],
    decorationsProviders = [],
    actions = [],
    keyboardShortcuts,
    sharedLanguageService,
    onBlur,
    onLanguageServiceReady,
    onSchemaChange,
    onSchemaError,
    ...rest
  }: SchemaEditorProps,
  ref: React.ForwardedRef<EditorApi>
) {
  const [editorRef, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoRef, setMonaco] = React.useState<typeof monaco | null>(null);

  const languageService = React.useMemo(
    () =>
      sharedLanguageService ||
      new EnrichedLanguageService({
        schemaString: schema,
        schemaConfig: {
          buildSchemaOptions: {
            assumeValid: true,
            assumeValidSDL: true,
          },
        },
      }),
    [sharedLanguageService]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      jumpToType: (typeName) => {
        languageService.getSchema().then((schema) => {
          if (schema) {
            const type = schema.getType(typeName);

            if (type?.astNode?.loc) {
              const range = locToRange(type.astNode.loc);
              editorRef?.setSelection(range);
              editorRef?.revealPositionInCenter(
                { column: 0, lineNumber: range.startLineNumber },
                0
              );
            }
          }
        });
      },
      jumpToField: (typeName, fieldName) => {
        languageService.getSchema().then((schema) => {
          if (schema) {
            const type = schema.getType(typeName);

            if (type && (isObjectType(type) || isInterfaceType(type))) {
              const field = type.getFields()[fieldName];

              if (field?.astNode?.loc) {
                const range = locToRange(field.astNode.loc);
                editorRef?.setSelection(range);
                editorRef?.revealPositionInCenter(
                  { column: 0, lineNumber: range.startLineNumber },
                  0
                );
              }
            }
          }
        });
      },
    }),
    [editorRef, languageService]
  );

  React.useEffect(() => {
    if (languageService && onLanguageServiceReady) {
      onLanguageServiceReady(languageService);
    }
  }, [languageService, onLanguageServiceReady]);

  React.useEffect(() => {
    if (languageService && onLanguageServiceReady) {
      onLanguageServiceReady(languageService);
    }
  }, [languageService, onLanguageServiceReady]);

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

  const [onBlurHandler, setOnBlurSubscription] =
    React.useState<monaco.IDisposable>();

  React.useEffect(() => {
    if (editorRef && onBlur) {
      onBlurHandler?.dispose();

      const subscription = editorRef.onDidBlurEditorText(() => {
        onBlur(editorRef.getValue() || '');
      });

      setOnBlurSubscription(subscription);
    }
  }, [onBlur, editorRef]);

  return (
    <>
      <MonacoEditor
        height={'70vh'}
        {...rest}
        beforeMount={(monaco) => {
          rest.beforeMount && rest.beforeMount(monaco);
          setMonaco(monaco);
        }}
        onMount={(editor, monaco) => {
          rest.onMount && rest.onMount(editor, monaco);
          setEditor(editor);
        }}
        onChange={(newValue, ev) => {
          rest.onChange && rest.onChange(newValue, ev);

          if (newValue) {
            languageService
              .trySchema(newValue)
              .then((schema) => {
                if (schema) {
                  onSchemaChange && onSchemaChange(schema, newValue);
                }
              })
              .catch((e: Error | GraphQLError) => {
                if (onSchemaError) {
                  if (e instanceof GraphQLError) {
                    onSchemaError([e], newValue, languageService);
                  } else {
                    onSchemaError(
                      [
                        new GraphQLError(
                          e.message,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          e
                        ),
                      ],
                      newValue,
                      languageService
                    );
                  }
                }
              });
          }
        }}
        options={{ glyphMargin: true, ...(rest.options || {}) }}
        language="graphql"
        defaultValue={rest.defaultValue || schema}
      />
    </>
  );
}

export const SchemaEditor = React.forwardRef(BaseSchemaEditor);
