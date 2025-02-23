import { handler } from './handler';

vi.mock('../vender/index_bg.wasm', async () => {
  const fs = await import('node:fs/promises');
  const wasm = await fs.readFile(require.resolve('@resvg/resvg-wasm/index_bg.wasm'));
  return {
    default: wasm,
  };
});

describe('handler()', () => {
  it('should work', async () => {
    const response = await handler({
      url: 'http://localhost:3000?product=CONDUCTOR',
    } as Request);
    const result = Buffer.from(await response.arrayBuffer());
    expect(result).toMatchImageSnapshot({
      failureThresholdType: 'percent',
      failureThreshold: 0.2,
    });
  });

  it('should align title and have container padding', async () => {
    const response = await handler({
      url: 'http://localhost:3000?product=ESLINT&title=Hello this is a test of really really really really really really long title',
    } as Request);
    const result = Buffer.from(await response.arrayBuffer());
    expect(result).toMatchImageSnapshot({
      failureThresholdType: 'percent',
      failureThreshold: 0.2,
    });
  });

  it('should align title without whitespaces', async () => {
    const response = await handler({
      url: 'http://localhost:3000?product=FETS&title=Home',
    } as Request);
    const result = Buffer.from(await response.arrayBuffer());
    expect(result).toMatchImageSnapshot({
      failureThresholdType: 'percent',
      failureThreshold: 0.2,
    });
  });
});
