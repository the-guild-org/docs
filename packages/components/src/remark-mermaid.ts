import { visit } from 'unist-util-visit';
import { Plugin } from 'unified';
import { Root } from 'mdast';

const FILE_PATH = '@theguild/components';

const MERMAID_IMPORT_AST = {
  type: 'mdxjsEsm',
  value: `import { Mermaid } from "${FILE_PATH}"`,
  data: {
    estree: {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              imported: { type: 'Identifier', name: 'Mermaid' },
              local: { type: 'Identifier', name: 'Mermaid' },
            },
          ],
          source: {
            type: 'Literal',
            value: FILE_PATH,
            raw: `"${FILE_PATH}"`,
          },
        },
      ],
    },
  },
};

const getMermaidElementAST = (value: string) => ({
  type: 'mdxJsxFlowElement',
  name: 'Mermaid',
  children: [],
  attributes: [
    {
      type: 'mdxJsxAttribute',
      name: 'chart',
      value: {
        type: 'mdxJsxAttributeValueExpression',
        value: `\`${value}\``,
        data: {
          estree: {
            type: 'Program',
            sourceType: 'module',
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
                        cooked: value,
                      },
                      tail: true,
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
  visit(ast, { type: 'code', lang: 'mermaid' }, (node, index, parent) => {
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
