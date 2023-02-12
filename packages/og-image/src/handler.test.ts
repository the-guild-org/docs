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
});
