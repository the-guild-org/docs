import { useImperativeHandle, forwardRef, ForwardedRef } from 'react';
import { DiffEditor, DiffEditorProps } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { SchemaEditorApi, SchemaServicesOptions, useSchemaServices } from './use-schema-services';

export type SchemaDiffEditorProps = SchemaServicesOptions & Omit<DiffEditorProps, 'language'>;

function BaseSchemaDiffEditor(
  props: SchemaDiffEditorProps,
  forwardedRef: ForwardedRef<{
    original: SchemaEditorApi;
    modified: SchemaEditorApi;
  }>
) {
  const { theme } = useTheme();
  const originalSchemaService = useSchemaServices(props);
  const modifiedSchemaService = useSchemaServices(props);

  useImperativeHandle(
    forwardedRef,
    () => ({
      original: originalSchemaService.editorApi,
      modified: originalSchemaService.editorApi,
    }),
    [
      originalSchemaService.editorRef,
      modifiedSchemaService.editorRef,
      originalSchemaService.languageService,
      modifiedSchemaService.languageService,
    ]
  );

  return (
    <DiffEditor
      height="70vh"
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      {...props}
      beforeMount={monaco => {
        originalSchemaService.setMonaco(monaco);
        modifiedSchemaService.setMonaco(monaco);
        props.beforeMount?.(monaco);
      }}
      onMount={(editor, monaco) => {
        originalSchemaService.setEditor(editor.getOriginalEditor());
        modifiedSchemaService.setEditor(editor.getModifiedEditor());
        props.onMount?.(editor, monaco);
      }}
      options={{ glyphMargin: true, ...props.options }}
      language="graphql"
    />
  );
}

export const SchemaDiffEditor = forwardRef(BaseSchemaDiffEditor);
