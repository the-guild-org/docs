import { compileMdx } from 'nextra/compile';
import { remarkNpm2Yarn } from '../src';

describe('remark-npm2yarn', () => {
  it('should convert to tabs', async () => {
    const mdx = await compileMdx(
      `
\`\`\`sh npm2yarn filename="Terminal"
npm i -D @graphql-eslint/eslint-plugin
\`\`\`
    `,
      {
        mdxOptions: {
          remarkPlugins: [
            [
              remarkNpm2Yarn,
              {
                packageName: 'nextra/components',
                tabNamesProp: 'items',
                storageKey: 'testKey',
              },
            ],
          ],
        },
      },
    );
    expect(mdx.result).toMatchSnapshot();
  });
});
