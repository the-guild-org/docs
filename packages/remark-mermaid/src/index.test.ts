import { compileMdx } from 'nextra/compile';

describe('remarkMermaid', () => {
  it('should parse', async () => {
    const doc = `\`\`\`mermaid
graph TD
A
\`\`\``;

    const rawJs = await compileMdx(doc);
    expect(rawJs.slice(rawJs.indexOf('function _createMdxContent'), rawJs.indexOf('return {') - 1))
      .toMatchInlineSnapshot(`
        "function _createMdxContent(props) {
          const {Mermaid} = {
            ..._provideComponents(),
            ...props.components
          };
          if (!Mermaid) _missingMdxReference("Mermaid", true);
          return _jsx(Mermaid, {
            chart: "graph TD\\\\nA"
          });
        }"
      `);
  });
  it('should escape', async () => {
    const doc = `\`\`\`mermaid
graph TD
Z["API"]
\\
\`
\`\`\``;

    const rawJs = await compileMdx(doc);
    expect(rawJs.slice(rawJs.indexOf('function _createMdxContent'), rawJs.indexOf('return {') - 1))
      .toMatchInlineSnapshot(`
        "function _createMdxContent(props) {
          const {Mermaid} = {
            ..._provideComponents(),
            ...props.components
          };
          if (!Mermaid) _missingMdxReference("Mermaid", true);
          return _jsx(Mermaid, {
            chart: "graph TD\\\\nZ[\\"API\\"]\\\\n\\\\\\\\n\`"
          });
        }"
      `);
  });
});
