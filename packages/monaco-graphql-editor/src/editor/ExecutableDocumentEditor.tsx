import React, { FC, useEffect, useRef, useState } from 'react';
import MonacoEditor, { useMonaco, EditorProps } from '@monaco-editor/react';
import {
  getAutocompleteSuggestions,
  // CompletionItemKind as lsCIK,
} from 'graphql-language-service';
import type { GraphQLSchema } from 'graphql';
import type * as monaco from 'monaco-editor';
import type { IRange, CompletionItem } from 'graphql-language-service';
import * as languages from './enums';
import { toGraphQLPosition, toMonacoRange } from './utils';

// This enum `CompletionItemKind` exist on graphql-language-service v4
enum lsCIK {
  Text = 1,
  Method = 2,
  Function = 3,
  Constructor = 4,
  Field = 5,
  Variable = 6,
  Class = 7,
  Interface = 8,
  Module = 9,
  Property = 10,
  Unit = 11,
  Value = 12,
  Enum = 13,
  Keyword = 14,
  Snippet = 15,
  Color = 16,
  File = 17,
  Reference = 18,
  Folder = 19,
  EnumMember = 20,
  Constant = 21,
  Struct = 22,
  Event = 23,
  Operator = 24,
  TypeParameter = 25,
}

type GraphQLWorkerCompletionItem = CompletionItem & {
  range?: monaco.IRange;
  command?: monaco.languages.CompletionItem['command'];
};

const toCompletionItemKind = (kind: lsCIK): languages.CompletionItemKind => {
  const CIK = languages.CompletionItemKind;
  const map = {
    [lsCIK.Text]: CIK.Text,
    [lsCIK.Method]: CIK.Method,
    [lsCIK.Function]: CIK.Function,
    [lsCIK.Constructor]: CIK.Constructor,
    [lsCIK.Field]: CIK.Field,
    [lsCIK.Variable]: CIK.Variable,
    [lsCIK.Class]: CIK.Class,
    [lsCIK.Interface]: CIK.Interface,
    [lsCIK.Module]: CIK.Module,
    [lsCIK.Property]: CIK.Property,
    [lsCIK.Unit]: CIK.Unit,
    [lsCIK.Value]: CIK.Value,
    [lsCIK.Enum]: CIK.Enum,
    [lsCIK.Keyword]: CIK.Keyword,
    [lsCIK.Snippet]: CIK.Snippet,
    [lsCIK.Color]: CIK.Color,
    [lsCIK.File]: CIK.File,
    [lsCIK.Reference]: CIK.Reference,
    [lsCIK.Folder]: CIK.Folder,
    [lsCIK.EnumMember]: CIK.EnumMember,
    [lsCIK.Constant]: CIK.Constant,
    [lsCIK.Struct]: CIK.Struct,
    [lsCIK.Event]: CIK.Event,
    [lsCIK.Operator]: CIK.Operator,
    [lsCIK.TypeParameter]: CIK.TypeParameter,
  };
  return map[kind] || CIK.Text;
};

const toCompletion = (
  entry: GraphQLWorkerCompletionItem
): monaco.languages.CompletionItem => {
  return {
    range: entry.range as monaco.IRange,
    kind: toCompletionItemKind(entry.kind as lsCIK),
    label: entry.label,
    insertText: entry.insertText ?? (entry.label as string),
    insertTextRules: entry.insertText
      ? languages.CompletionItemInsertTextRule.InsertAsSnippet
      : undefined,
    sortText: entry.sortText,
    filterText: entry.filterText,
    documentation: entry.documentation,
    detail: entry.detail,
    command: entry.command,
  };
};

class GraphQLWorker {
  doComplete(
    documentModel: monaco.editor.IReadOnlyModel,
    position: monaco.Position,
    schema: GraphQLSchema
  ): GraphQLWorkerCompletionItem[] {
    const document = documentModel.getValue();
    if (!document) {
      console.log('no document');
      return [];
    }
    if (!schema) {
      console.log('no schema');
    }
    const graphQLPosition = toGraphQLPosition(position);
    const suggestions = getAutocompleteSuggestions(
      schema,
      document,
      graphQLPosition
    );
    return suggestions.map((suggestion) => this.toCompletion(suggestion));
  }

  toCompletion(
    entry: CompletionItem,
    range?: IRange
  ): GraphQLWorkerCompletionItem {
    return {
      label: entry.label,
      insertText: entry.insertText,
      insertTextFormat: entry.insertTextFormat,
      sortText: entry.sortText,
      filterText: entry.filterText,
      documentation: entry.documentation,
      detail: entry.detail,
      range: range ? toMonacoRange(range) : undefined,
      kind: entry.kind,
      command: entry.command
        ? { ...entry.command, id: entry.command.command }
        : undefined,
    };
  }
}

export const ExecutableDocumentEditor: FC<
  { schema: GraphQLSchema } & Omit<EditorProps, 'language'>
> = ({ schema, ...editorProps }) => {
  const monaco = useMonaco();
  const [completionProvider, setCompletionProvider] =
    useState<monaco.IDisposable | null>(null);
  const editorUriRef = useRef<monaco.Uri>();

  useEffect(() => {
    if (!monaco || !schema) {
      return;
    }
    if (completionProvider) {
      // dispose instance to prevent having duplicated field
      completionProvider.dispose();
    }

    const newProvider = monaco.languages.registerCompletionItemProvider(
      'graphql',
      {
        triggerCharacters: [':', '$', '\n', ' ', '(', '@'],
        provideCompletionItems(
          model: monaco.editor.IReadOnlyModel,
          position: monaco.Position
        ): monaco.languages.CompletionList {
          const isUriEquals = model.uri.path === editorUriRef.current!.path;
          if (!isUriEquals) {
            return { suggestions: [] };
          }
          const worker = new GraphQLWorker();
          const completionItems = worker.doComplete(model, position, schema);
          return {
            incomplete: true,
            suggestions: completionItems.map((item) => toCompletion(item)),
          };
        },
      }
    );
    setCompletionProvider(newProvider);
  }, [monaco, schema]);

  return (
    <MonacoEditor
      height="70vh"
      {...editorProps}
      language="graphql"
      onMount={(editor) => {
        editorUriRef.current = editor.getModel()!.uri;
      }}
    />
  );
};
