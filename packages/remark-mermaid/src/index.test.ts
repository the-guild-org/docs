import { compileMdx } from 'nextra/compile';

describe('remarkMermaid', () => {
  it('should parse', async () => {
    const doc = `\`\`\`mermaid
graph TD
A
\`\`\``;

    const { result } = await compileMdx(doc);
    expect(
      result.slice(result.indexOf('function _createMdxContent'), result.indexOf('return {') - 1),
    ).toMatchInlineSnapshot(`
      "function _createMdxContent(props) {
        const {Mermaid} = props.components || ({});
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

    const { result } = await compileMdx(doc);
    expect(
      result.slice(result.indexOf('function _createMdxContent'), result.indexOf('return {') - 1),
    ).toMatchInlineSnapshot(`
      "function _createMdxContent(props) {
        const {Mermaid} = props.components || ({});
        if (!Mermaid) _missingMdxReference("Mermaid", true);
        return _jsx(Mermaid, {
          chart: "graph TD\\\\nZ[\\"API\\"]\\\\n\\\\\\\\n\`"
        });
      }"
    `);
  });
});
