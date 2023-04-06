import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nextraToAlgoliaRecords } from '../src/index';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('nextraToAlgoliaRecords()', () => {
  it.each([
    'https://www.the-guild.dev/graphql/ws',
    'https://www.the-guild.dev/graphql/ws/',
    'https://www.the-guild.dev/graphql/ws///',
  ])('should handle domain %s', async domain => {
    const records = await nextraToAlgoliaRecords({
      docsBaseDir: path.join(__dirname, '__fixtures__', 'typedoc'),
      source: 'WS',
      domain,
    });
    expect(records).toMatchInlineSnapshot(`
      [
        {
          "content": "client - common - server - use/@fastify/websocket - use/fastify-websocket - use/uWebSockets - use/ws",
          "domain": "https://www.the-guild.dev/graphql/ws",
          "headings": [
            "Modules",
          ],
          "hierarchy": [
            "docs",
          ],
          "objectID": "ws-docs-",
          "source": "WS",
          "title": "Home",
          "toc": [
            {
              "anchor": "modules",
              "children": [],
              "title": "Modules",
            },
          ],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/ws/docs/",
        },
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/ws",
          "headings": [],
          "hierarchy": [
            "docs",
            "enums",
          ],
          "objectID": "ws-docs-enums-common",
          "source": "WS",
          "title": "common.MessageType",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/ws/docs/enums/common",
        },
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/ws",
          "headings": [],
          "hierarchy": [
            "docs",
            "interfaces",
          ],
          "objectID": "ws-docs-interfaces-client",
          "source": "WS",
          "title": "client.Client",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/ws/docs/interfaces/client",
        },
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/ws",
          "headings": [],
          "hierarchy": [
            "docs",
            "modules",
          ],
          "objectID": "ws-docs-modules-client",
          "source": "WS",
          "title": "client",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/ws/docs/modules/client",
        },
      ]
    `);
  });
});
