import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import MonacoEditor, { BeforeMount, EditorProps, OnChange, OnMount } from '@monaco-editor/react';
import { GraphQLError, GraphQLSchema } from 'graphql';
import { IDisposable } from 'monaco-editor';
import { useTheme } from 'next-themes';
import { EnrichedLanguageService } from './enriched-language-service';
import { SchemaEditorApi, SchemaServicesOptions, useSchemaServices } from './use-schema-services';

export type SchemaEditorProps = SchemaServicesOptions & {
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService,
  ) => void;
} & Omit<EditorProps, 'language'>;

function BaseSchemaEditor(props: SchemaEditorProps, ref: ForwardedRef<SchemaEditorApi>) {
  const { resolvedTheme } = useTheme();
  const { languageService, setMonaco, setEditor, editorApi, editorRef, setSchema } =
    useSchemaServices(props);
  useImperativeHandle(ref, () => editorApi, [editorRef, languageService]);

  useEffect(() => {
    if (languageService) {
      props.onLanguageServiceReady?.(languageService);
    }
  }, [languageService, props.onLanguageServiceReady]);

  const [onBlurHandler, setOnBlurHandler] = useState<IDisposable>();

  useEffect(() => {
    if (editorRef && props.onBlur) {
      onBlurHandler?.dispose();

      const subscription = editorRef.onDidBlurEditorText(() => {
        props.onBlur?.(editorRef.getValue() || '');
      });

      setOnBlurHandler(subscription);
    }
  }, [props.onBlur, editorRef]);

  const handleBeforeMount = useCallback<BeforeMount>(
    monaco => {
      setMonaco(monaco);
      props.beforeMount?.(monaco);
    },
    [props.beforeMount],
  );

  const handleMount = useCallback<OnMount>(
    (editor, monaco) => {
      setEditor(editor);
      props.onMount?.(editor, monaco);
    },
    [props.onMount],
  );

  const handleChange = useCallback<OnChange>(
    async (newValue, ev) => {
      props.onChange?.(newValue, ev);
      if (!newValue) {
        return;
      }

      try {
        const schema = await setSchema(newValue);
        if (schema) {
          props.onSchemaChange?.(schema, newValue);
        }
      } catch (e) {
        if (!props.onSchemaError) {
          return;
        }
        const error =
          e instanceof GraphQLError
            ? e
            : new GraphQLError(
                (e as Error).message,
                undefined,
                undefined,
                undefined,
                undefined,
                e as Error,
              );
        props.onSchemaError([error], newValue, languageService);
      }
    },
    [props.onChange, props.onSchemaChange, props.onSchemaError],
  );

  return (
    <MonacoEditor
      height="70vh"
      theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
      {...props}
      beforeMount={handleBeforeMount}
      onMount={handleMount}
      onChange={handleChange}
      options={{ glyphMargin: true, ...props.options }}
      language="graphql"
      defaultValue={props.defaultValue || props.schema}
    />
  );
}

export const SchemaEditor = forwardRef(BaseSchemaEditor);
