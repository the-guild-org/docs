import { compileMdx } from 'nextra/compile';
import { remarkNpm2Yarn } from '../src';
import { CHARS_REGEX, cleanMeta, KEY_VALUE_REGEX, LINES_REGEX } from '../src/constants';

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

describe('clean up meta', () => {
  const META = [
    'npm2yarn',
    'baz1="foo npm2yarn"',
    '/npm2yarn/',
    '{npm2yarn}',
    'bar2="foo npm2yarn"',
    '/npm2yarn/3-5,6',
    'foo',
    '{npm2yarn}',
    '/npm2yarn/#v',
  ].join(' ');

  const finalResult = 'npm2yarn      foo  ';

  it('should clean by regex', () => {
    const withoutKeyValues = META.replaceAll(KEY_VALUE_REGEX, '');
    expect(withoutKeyValues).toBe(
      'npm2yarn  /npm2yarn/ {npm2yarn}  /npm2yarn/3-5,6 foo {npm2yarn} /npm2yarn/#v',
    );

    const withoutChars = withoutKeyValues.replaceAll(CHARS_REGEX, '');
    expect(withoutChars).toBe('npm2yarn   {npm2yarn}   foo {npm2yarn} ');

    const withoutLines = withoutChars.replaceAll(LINES_REGEX, '');
    expect(withoutLines).toBe(finalResult);
  });

  it('should clean by cleanMeta()', () => {
    expect(cleanMeta(META)).toBe(finalResult);
  });
});
