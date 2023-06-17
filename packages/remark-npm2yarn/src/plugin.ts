import { createRequire } from 'node:module';
import { Code, Root } from 'mdast';
import convert from 'npm-to-yarn';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { PACKAGE_MANAGERS, PackageManager } from './constants.js';

const require = createRequire(import.meta.url);

// To avoid conflicts with other Tabs declarations
const TABS_NAME = '$Tabs';
const META_PLACEHOLDER = 'npm2yarn';

export const remarkNpm2Yarn: Plugin<[{ packageManagers: PackageManager[] }], Root> = opts => {
  const packageManagers = opts.packageManagers || PACKAGE_MANAGERS;
  const IMPORT_AST = {
    type: 'mdxjsEsm',
    data: {
      estree: {
        body: [
          {
            type: 'ImportDeclaration',
            source: {
              type: 'Literal',
              value: require.resolve('@theguild/remark-npm2yarn/tabs'),
            },
            specifiers: [
              {
                type: 'ImportSpecifier',
                imported: { type: 'Identifier', name: 'Tabs' },
                local: { type: 'Identifier', name: TABS_NAME },
              },
            ],
          },
        ],
      },
    },
  };

  return (ast, _file, done) => {
    let isImported = false;

    visit(ast, 'code', (node: Code, index, parent) => {
      const hasNpm2YarnMeta = node.meta?.includes(META_PLACEHOLDER);

      if (!hasNpm2YarnMeta) return;

      if (!node.value.startsWith('npm')) {
        throw new Error('`npm-to-yarn` package convert only npm commands to all package managers');
      }

      // Replace current node with Tabs/Tab components
      parent!.children[index!] = {
        type: 'mdxJsxFlowElement',
        name: '$Tabs',
        children: PACKAGE_MANAGERS.map(packageManager => ({
          type: node.type,
          lang: node.lang,
          meta: node.meta?.replace(META_PLACEHOLDER, ''),
          value: convert(node.value, packageManager),
        })),
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'packageManagers',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              data: {
                estree: {
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ArrayExpression',
                        elements: packageManagers.map(value => ({ type: 'Literal', value })),
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      } as any;

      if (isImported) return;

      // Add import statement at top of file
      ast.children.unshift(IMPORT_AST as any);

      isImported = true;
    });

    done();
  };
};
