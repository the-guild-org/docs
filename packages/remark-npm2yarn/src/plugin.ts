import { Code, Root } from 'mdast';
import convert from 'npm-to-yarn';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const META_PLACEHOLDER = 'npm2yarn';
const TABS_PACKAGE_NAME = 'nextra-theme-docs';
const PACKAGE_MANAGERS = ['pnpm', 'yarn', 'npm'] as const;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];

// To avoid conflicts with other Tabs/Tab declarations
const TABS_NAME = '$Tabs';
const TAB_NAME = '$Tab';

const IMPORT_AST = {
  type: 'mdxjsEsm',
  data: {
    estree: {
      body: [
        {
          type: 'ImportDeclaration',
          source: { type: 'Literal', value: TABS_PACKAGE_NAME },
          specifiers: [
            {
              type: 'ImportSpecifier',
              imported: { type: 'Identifier', name: 'Tabs' },
              local: { type: 'Identifier', name: TABS_NAME },
            },
            {
              type: 'ImportSpecifier',
              imported: { type: 'Identifier', name: 'Tab' },
              local: { type: 'Identifier', name: TAB_NAME },
            },
          ],
        },
      ],
    },
  },
};

const TABS_AST = {
  type: 'mdxJsxFlowElement',
  name: TABS_NAME,
  attributes: [
    {
      type: 'mdxJsxAttribute',
      name: 'items',
      value: {
        type: 'mdxJsxAttributeValueExpression',
        data: {
          estree: {
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'ArrayExpression',
                  elements: PACKAGE_MANAGERS.map(value => ({ type: 'Literal', value })),
                },
              },
            ],
          },
        },
      },
    },
  ],
};

function getTabAST(node: Code, packageManager: PackageManager) {
  return {
    type: 'mdxJsxFlowElement',
    name: TAB_NAME,
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
  let isImported = false;

  visit(ast, 'code', (node: Code, index, parent) => {
    const hasNpm2YarnMeta = node.meta?.includes(META_PLACEHOLDER);

    if (!hasNpm2YarnMeta) return;

    if (!node.value.startsWith('npm')) {
      throw new Error('`npm-to-yarn` package convert only npm commands to all package managers');
    }

    // Replace current node with Tabs/Tab components
    parent!.children[index!] = {
      ...TABS_AST,
      children: PACKAGE_MANAGERS.map(value => getTabAST(node, value)),
    } as any;

    if (isImported) return;

    // Add import statement at top of file
    ast.children.unshift(IMPORT_AST as any);

    isImported = true;
  });

  done();
};
