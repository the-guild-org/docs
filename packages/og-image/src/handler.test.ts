import { handler } from './handler';

vi.mock('./vender/resvg.wasm', async () => {
  const fs = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const wasmUrl = `${__dirname}vender/resvg.wasm`;
  const wasm = await fs.readFile(wasmUrl);
  return {
    default: wasm,
  };
});

describe('handler()', () => {
  it('should works', async () => {
    const response = await handler({
      url: 'http://localhost:3000?product=CONDUCTOR',
    });
    const result = Buffer.from(await response.arrayBuffer());
    expect(result).toMatchImageSnapshot();
  });
  it('should align title and have container padding', async () => {
    const response = await handler({
      url: 'http://localhost:3000?product=ESLINT&title=Hello this is a test of really really really really really really long title',
    });
    const result = Buffer.from(await response.arrayBuffer());
    expect(result).toMatchImageSnapshot();
  });
});
