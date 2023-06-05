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
          remarkPlugins: [remarkNpm2Yarn],
        },
      },
    );
    expect(mdx.result).toMatchSnapshot();
  });

  it('should not add import if it was already added', async () => {
    const mdx = await compileMdx(
      `
\`\`\`sh npm2yarn
npm i -D @graphql-eslint/eslint-plugin
\`\`\`

\`\`\`sh npm2yarn
yarn add bar
\`\`\`
    `,
      {
        mdxOptions: {
          remarkPlugins: [remarkNpm2Yarn],
        },
      },
    );
    expect(mdx.result).toMatchSnapshot();
  });
});
