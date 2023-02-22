import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nextraToAlgoliaRecords } from './index';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('nextraToAlgoliaRecords()', () => {
  it('should return', async () => {
    const records = await nextraToAlgoliaRecords({
      docsBaseDir: path.resolve(__dirname, '..', '..', '..', 'website/src/pages'),
      source: 'Some test',
      domain: 'https://www.the-guild.dev/graphql/some-test',
    });
    expect(records).toMatchInlineSnapshot();
  });
});
