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
    expect(records).toMatchInlineSnapshot(`
      [
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [],
          "hierarchy": [],
          "objectID": "some-test-404",
          "source": "Some test",
          "title": "404",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-test/404",
        },
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [],
          "hierarchy": [],
          "objectID": "some-test-500",
          "source": "Some test",
          "title": "500",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-test/500",
        },
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [],
          "hierarchy": [
            "Docs",
          ],
          "objectID": "some-test-docs-import",
          "source": "Some test",
          "title": "import",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-testdocs/import",
        },
        {
          "content": "       const mdx = await compileMdx(     [       // Render code block with current version of dependencies       'json filename=\\"package.json\\" {14,20}',       JSON.stringify(         {           ...pkgJson,           dependencies: Object.fromEntries([             ['@theguild/components', pkgJsonFromComponents.version],             ...Object.entries(pkgJson.dependencies).filter(([key]) =>               ['next', 'react', 'react-dom'].includes(key)             )           ]),           devDependencies: pkgJson.devDependencies,           nextBundleAnalysis: undefined         },         null,         2       ),       ''     ].join('\\\\n'),     { defaultShowCopyCode: true }   )   return {     props: {       ssg: mdx.result     }   } }    const compiledSource = useSSG()   const components = useMDXComponents()   return  }",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [
            "1. Add dependencies",
            "2. Add Tailwind CSS config",
            "3. Add PostCSS config",
            "4. Add theme config",
            "5. Use \`withGuildDocs\` in your Next.js config",
            "6. Import styles in \`_app.tsx\`",
          ],
          "hierarchy": [
            "Docs",
          ],
          "objectID": "some-test-docs-index",
          "source": "Some test",
          "title": "Installation",
          "toc": [
            {
              "anchor": "1-add-dependencies",
              "children": [],
              "title": "1. Add dependencies",
            },
            {
              "anchor": "2-add-tailwind-css-config",
              "children": [],
              "title": "2. Add Tailwind CSS config",
            },
            {
              "anchor": "3-add-postcss-config",
              "children": [],
              "title": "3. Add PostCSS config",
            },
            {
              "anchor": "4-add-theme-config",
              "children": [],
              "title": "4. Add theme config",
            },
            {
              "anchor": "5-use-withguilddocs-in-your-nextjs-config",
              "children": [],
              "title": "5. Use \`withGuildDocs\` in your Next.js config",
            },
            {
              "anchor": "6-import-styles-in-_apptsx",
              "children": [],
              "title": "6. Import styles in \`_app.tsx\`",
            },
          ],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-testdocs/index",
        },
        {
          "content": "   graph TD; subgraph AA [Consumers] A[Mobile app]; B[Web app]; C[Node.js client]; end subgraph BB [Services] E[REST API]; F[GraphQL API]; G[SOAP API]; end Z[GraphQL API]; A --> Z; B --> Z; C --> Z; Z --> E; Z --> F; Z --> G;",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [],
          "hierarchy": [
            "Docs",
          ],
          "objectID": "some-test-docs-mermaid",
          "source": "Some test",
          "title": "mermaid",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-testdocs/mermaid",
        },
        {
          "content": "    const { readme } = await fetchPackageInfo(PACKAGE_NAME)   const mdx = await compileMdx(readme, { defaultShowCopyCode: true })   return {     props: {       ssg: mdx.result     },     // Revalidate at most once every 1 hour     revalidate: 60 * 60   } }    // Get the data from SSG, and render it as a component.   const compiledSource = useSSG()   const components = useMDXComponents()   return (                           ) }",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [],
          "hierarchy": [
            "Docs",
          ],
          "objectID": "some-test-docs-remote",
          "source": "Some test",
          "title": "Remote MDX",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-testdocs/remote",
        },
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [],
          "hierarchy": [
            "Docs",
          ],
          "objectID": "some-test-docs-video",
          "source": "Some test",
          "title": "video",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-testdocs/video",
        },
        {
          "content": "",
          "domain": "https://www.the-guild.dev/graphql/some-test",
          "headings": [],
          "hierarchy": [],
          "objectID": "some-test-index",
          "source": "Some test",
          "title": "Home",
          "toc": [],
          "type": "Documentation",
          "url": "https://www.the-guild.dev/graphql/some-test/index",
        },
      ]
    `);
  });
});
