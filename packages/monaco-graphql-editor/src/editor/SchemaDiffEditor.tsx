import * as React from 'react';
import { DiffEditorProps, DiffEditor } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { EnrichedLanguageService } from './EnrichedLanguageService';
import {
  DecorationsSource,
  DefinitionSource,
  DiagnosticsSource,
  EditorAction,
  emptyLocation,
  HoverSource,
  locToRange,
} from './utils';
import {
  GraphQLError,
  GraphQLSchema,
  isInterfaceType,
  isObjectType,
} from 'graphql';

export type DiffEditorApi = {
  jumpToType(typeName: string): void;
  jumpToField(typeName: string, fieldName: string): void;
  deselect(): void;
};

export type DiffSchemaEditorProps = {
  hoverProviders?: HoverSource[];
  definitionProviders?: DefinitionSource[];
  diagnosticsProviders?: DiagnosticsSource[];
  decorationsProviders?: DecorationsSource[];
  actions?: EditorAction[];
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService
  ) => void;
  sharedLanguageService?: EnrichedLanguageService;
  keyboardShortcuts?: (
    editorInstance: monaco.editor.IStandaloneDiffEditor,
    monacoInstance: typeof monaco
  ) => monaco.editor.IActionDescriptor[];
} & Omit<DiffEditorProps, 'language'>;

function BaseSchemaEditor(
  {
    hoverProviders = [],
    definitionProviders = [],
    actions = [],
    keyboardShortcuts,
    sharedLanguageService,
    onLanguageServiceReady,
    ...rest
  }: DiffSchemaEditorProps,
  ref: React.ForwardedRef<DiffEditorApi>
) {
  const [editorRef, setEditor] =
    React.useState<monaco.editor.IStandaloneDiffEditor | null>(null);
  const [monacoRef, setMonaco] = React.useState<typeof monaco | null>(null);

  const languageService = React.useMemo(
    () =>
      sharedLanguageService ||
      new EnrichedLanguageService({
        schemaString: rest.original,
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
      deselect: () => editorRef?.setSelection(emptyLocation),
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
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [editorRef, monacoRef]);

  return (
    <>
      <DiffEditor
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
        options={{ glyphMargin: true, ...(rest.options || {}) }}
        language="graphql"
      />
    </>
  );
}

export const SchemaDiffEditor = React.forwardRef(BaseSchemaEditor);
