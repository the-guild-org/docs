import { createRequire } from 'node:module';
import { Code, Root } from 'mdast';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const require = createRequire(import.meta.url);

const COMPONENT_PATH = require.resolve('@theguild/remark-mermaid/mermaid');
const COMPONENT_NAME = 'Mermaid';

const MERMAID_IMPORT_AST = {
  type: 'mdxjsEsm',
  data: {
    estree: {
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              imported: { type: 'Identifier', name: COMPONENT_NAME },
              local: { type: 'Identifier', name: COMPONENT_NAME },
            },
          ],
          source: {
            type: 'Literal',
            value: COMPONENT_PATH,
          },
        },
      ],
    },
  },
} as any;

const getMermaidElementAST = (value: string) => ({
  type: 'mdxJsxFlowElement',
  name: COMPONENT_NAME,
  attributes: [
    {
      type: 'mdxJsxAttribute',
      name: 'chart',
      value: {
        type: 'mdxJsxAttributeValueExpression',
        data: {
          estree: {
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        raw: value,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  ],
});

export const remarkMermaid: Plugin<[], Root> = () => (ast, _file, done) => {
  const codeblocks: any[][] = [];
  visit(ast, { type: 'code', lang: 'mermaid' }, (node: Code, index, parent) => {
    codeblocks.push([node, index, parent]);
  });

  if (codeblocks.length !== 0) {
    for (const [node, index, parent] of codeblocks) {
      parent.children.splice(index, 1, getMermaidElementAST(node.value));
    }
    ast.children.unshift(MERMAID_IMPORT_AST);
  }

  done();
};
