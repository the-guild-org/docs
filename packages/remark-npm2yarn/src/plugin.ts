import { Code, Root } from 'mdast';
import convert from 'npm-to-yarn';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const META_PLACEHOLDER = 'npm2yarn';
const TABS_PACKAGE_NAME = 'nextra-theme-docs';
const PACKAGE_MANAGERS = ['pnpm', 'yarn', 'npm'] as const;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];

function getTabAST(node: Code, packageManager: PackageManager) {
  return {
    type: 'mdxJsxFlowElement',
    name: 'Tab',
    children: [
      {
        type: node.type,
        lang: node.lang,
        meta: node.meta?.replace(META_PLACEHOLDER, ''),
        value: convert(node.value, packageManager),
      },
    ],
  };
}

export const remarkNpm2Yarn: Plugin<[], Root> = () => (ast, _file, done) => {
  visit(ast, 'code', (node: Code, index, parent) => {
    const hasNpm2YarnMeta = node.meta?.includes(META_PLACEHOLDER);

    if (!hasNpm2YarnMeta) return;
    console.log('here', hasNpm2YarnMeta, index);

    // Replace current node with Tabs/Tab
    parent!.children[index!] = {
      type: 'mdxJsxFlowElement',
      name: 'Tabs',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'items',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            data: {
              estree: {
                type: 'Program',
                sourceType: 'module',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayExpression',
                      elements: [
                        { type: 'Literal', value: 'pnpm' },
                        { type: 'Literal', value: 'yarn' },
                        { type: 'Literal', value: 'npm' },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      ],
      children: [getTabAST(node, 'pnpm'), getTabAST(node, 'yarn'), getTabAST(node, 'npm')],
    } as any;

    // Add import statement at top of file
    ast.children.unshift({
      type: 'mdxjsEsm',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ImportDeclaration',
              source: { type: 'Literal', value: TABS_PACKAGE_NAME },
              specifiers: [
                {
                  type: 'ImportSpecifier',
                  imported: { type: 'Identifier', name: 'Tabs' },
                  local: { type: 'Identifier', name: 'Tabs' },
                },
                {
                  type: 'ImportSpecifier',
                  imported: { type: 'Identifier', name: 'Tab' },
                  local: { type: 'Identifier', name: 'Tab' },
                },
              ],
            },
          ],
        },
      },
    } as any);
  });

  done();
};
