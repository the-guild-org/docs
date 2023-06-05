import { compileMdx } from 'nextra/compile';

describe('remark-npm2yarn', () => {
  it('should work', async () => {
    const mdx = await compileMdx(`
+++sh
npm i -D @graphql-eslint/eslint-plugin
+++
    `);
    expect(mdx.result).toMatchInlineSnapshot(`
      "/*@jsxRuntime automatic @jsxImportSource react*/
      const {jsx: _jsx} = arguments[0];
      const {useMDXComponents: _provideComponents} = arguments[0];
      function _createMdxContent(props) {
        const _components = Object.assign({
          p: \\"p\\"
        }, _provideComponents(), props.components);
        return _jsx(_components.p, {
          children: \\"+++sh\\\\nnpm i -D @graphql-eslint/eslint-plugin\\\\n+++\\"
        });
      }
      function MDXContent(props = {}) {
        const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);
        return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
          children: _jsx(_createMdxContent, props)
        })) : _createMdxContent(props);
      }
      return {
        default: MDXContent
      };
      "
    `);
  });
});
