import { handler } from './handler';

describe('handler()', () => {
  it('should works', async () => {
    const response = await handler({
      url: 'http://localhost:3000?product=CONDUCTOR',
    });
    const result = Buffer.from(await response.arrayBuffer());
    expect(result).toMatchImageSnapshot();
  });
});
