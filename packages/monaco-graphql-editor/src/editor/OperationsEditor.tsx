import React, { FC, useEffect } from 'react';
import { buildSchema, GraphQLSchema } from 'graphql';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import {
  getAutocompleteSuggestions,
  CompletionItemKind as lsCIK,
} from 'graphql-language-service';

import type * as monaco from 'monaco-editor';
import type { IRange, CompletionItem } from 'graphql-language-service';

import * as languages from './enums';
import { toGraphQLPosition, toMonacoRange } from './utils';

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

export const OperationsEditor: FC<{ schema: string; operations?: string }> = ({
  schema,
  ...props
}) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) {
      return;
    }
    monaco.languages.registerCompletionItemProvider('graphql', {
      triggerCharacters: [':', '$', '\n', ' ', '(', '@'],
      provideCompletionItems(
        model: monaco.editor.IReadOnlyModel,
        position: monaco.Position
      ): monaco.languages.CompletionList {
        try {
          const schemaObj = buildSchema(schema);
          const worker = new GraphQLWorker();
          const completionItems = worker.doComplete(model, position, schemaObj);
          return {
            incomplete: true,
            suggestions: completionItems.map((item) => toCompletion(item)),
          };
        } catch (err) {
          console.error('Error fetching completion items', err);
          return { suggestions: [] };
        }
      },
    });
  }, [monaco]);

  return (
    <MonacoEditor
      height="70vh"
      {...props}
      language="graphql"
      defaultValue={props.operations}
    />
  );
};
