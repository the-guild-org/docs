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
      sitemapXmlPath: path.join(__dirname, '__fixtures__', 'typedoc', 'sitemap.xml'),
    });
    expect(records).toMatchInlineSnapshot(`
      [
        {
          "content": "client",
          "domain": "https://www.the-guild.dev/graphql/ws",
          "headings": [
            "Modules",
          ],
          "hierarchy": [
            "docs",
          ],
          "objectID": "ws-docs-index",
          "source": "WS",
          "title": "graphql-ws",
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
          "objectID": "ws-docs-enums-common_messagetype",
          "source": "WS",
          "title": "Enumeration: MessageType",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/ws/docs/enums/common.MessageType",
        },
        {
          "content": "Here   There",
          "domain": "https://www.the-guild.dev/graphql/ws",
          "headings": [
            "Supertitle",
          ],
          "hierarchy": [
            "docs",
            "interfaces",
          ],
          "objectID": "ws-docs-interfaces-client_client",
          "source": "WS",
          "title": "Interface: Client",
          "toc": [
            {
              "anchor": "supertitle",
              "children": [
                {
                  "anchor": "subtitle",
                  "children": [],
                  "title": "Subtitle",
                },
              ],
              "title": "Supertitle",
            },
          ],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/ws/docs/interfaces/client.Client",
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
          "title": "Module: client",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/ws/docs/modules/client",
        },
      ]
    `);
  });
});
