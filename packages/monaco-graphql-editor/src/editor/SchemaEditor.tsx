import React, {
  ForwardedRef,
  useImperativeHandle,
  useEffect,
  useState,
  forwardRef,
} from 'react';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';
import type { IDisposable } from 'monaco-editor';
import { EnrichedLanguageService } from './EnrichedLanguageService';
import { GraphQLError, GraphQLSchema } from 'graphql';
import {
  SchemaEditorApi,
  SchemaServicesOptions,
  useSchemaServices,
} from './use-schema-services';

export type SchemaEditorProps = SchemaServicesOptions & {
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService
  ) => void;
} & Omit<EditorProps, 'language'>;

function BaseSchemaEditor(
  props: SchemaEditorProps,
  ref: ForwardedRef<SchemaEditorApi>
) {
  const {
    languageService,
    setMonaco,
    setEditor,
    editorApi,
    editorRef,
    setSchema,
  } = useSchemaServices(props);
  useImperativeHandle(ref, () => editorApi, [editorRef, languageService]);

  useEffect(() => {
    if (languageService && props.onLanguageServiceReady) {
      props.onLanguageServiceReady(languageService);
    }
  }, [languageService, props.onLanguageServiceReady]);

  const [onBlurHandler, setOnBlurSubscription] = useState<IDisposable>();

  useEffect(() => {
    if (editorRef && props.onBlur) {
      onBlurHandler?.dispose();

      const subscription = editorRef.onDidBlurEditorText(() => {
        props.onBlur?.(editorRef.getValue() || '');
      });

      setOnBlurSubscription(subscription);
    }
  }, [props.onBlur, editorRef]);

  return (
    <MonacoEditor
      height="70vh"
      {...props}
      beforeMount={(monaco) => {
        setMonaco(monaco);
        props.beforeMount?.(monaco);
      }}
      onMount={(editor, monaco) => {
        setEditor(editor);
        props.onMount?.(editor, monaco);
      }}
      onChange={async (newValue, ev) => {
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
                  e as Error
                );
          props.onSchemaError([error], newValue, languageService);
        }
      }}
      options={{ glyphMargin: true, ...props.options }}
      language="graphql"
      defaultValue={props.defaultValue || props.schema}
    />
  );
}

export const SchemaEditor = forwardRef(BaseSchemaEditor);
