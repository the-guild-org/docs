import { Code, Root } from 'mdast';
import convert from 'npm-to-yarn';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkNpm2Yarn: Plugin<[], Root> = () => (ast, _file, done) => {
  visit<Root, 'code'>(ast, 'code', (node, index, parent) => {
    const hasNpm2YarnMeta = node.meta?.includes('npm2yarn');

    if (hasNpm2YarnMeta) {
      console.log({
        npm: convert(node.value, 'npm'),
        yarn: convert(node.value, 'yarn'),
        pnpm: convert(node.value, 'pnpm'),
      });
      console.log(node);
      const packageName = 'nextra-theme-docs';

      ast.children.push({
        type: 'mdxjsEsm',
        data: {
          estree: {
            type: 'Program',
            body: [
              {
                type: 'ImportDeclaration',
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
                source: {
                  type: 'Literal',
                  value: packageName,
                  raw: `'${packageName}'`,
                },
              },
            ],
            sourceType: 'module',
          },
        },
      } as any);

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
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ArrayExpression',
                        elements: [
                          { type: 'Literal', value: 'pnpm', raw: "'pnpm'" },
                          { type: 'Literal', value: 'npm', raw: "'npm'" },
                          { type: 'Literal', value: 'yarn', raw: "'yarn'" },
                        ],
                      },
                    },
                  ],
                  sourceType: 'module',
                },
              },
            },
          },
        ],
        children: [createTab('npm'), createTab('yarn'), createTab('pnpm')],
      } as any;
    }

    function createTab(packageManager: 'npm' | 'yarn' | 'pnpm') {
      return {
        type: 'mdxJsxFlowElement',
        name: 'Tab',
        children: [
          {
            type: node.type,
            lang: node.lang,
            meta: node.meta?.replace('npm2yarn', ''),
            value: convert(node.value, packageManager),
          },
        ],
      };
    }
  });

  done();
};
