/* eslint-disable no-console -- for debug */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import crypto from 'node:crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import algoliaSearch from 'algoliasearch';
import GitHubSlugger from 'github-slugger';
import glob from 'glob';
import matter from 'gray-matter';
import map from 'lodash.map';
import sortBy from 'lodash.sortby';
import removeMarkdown from 'remove-markdown';
import { AlgoliaRecord, AlgoliaRecordSource, AlgoliaSearchItemTOC, IRoutes } from './types';

const extractToC = (content: string): AlgoliaSearchItemTOC[] => {
  const slugger = new GitHubSlugger();

  const lines = content.split('\n');

  let isCodeBlock = false;
  let currentDepth = 0;
  let currentParent: AlgoliaSearchItemTOC | undefined;

  return lines.reduce<AlgoliaSearchItemTOC[]>((acc, value) => {
    if (value.match(/^```(.*)/)) {
      if (isCodeBlock) {
        isCodeBlock = false;
      } else {
        isCodeBlock = true;
        return acc;
      }
    } else if (isCodeBlock) {
      return acc;
    }

    const result = value.match(/(##+ )(.+)/);

    if (!result) return acc;

    const depth = result[1]?.length - 3;

    if (depth > 1) {
      return acc;
    }

    const heading = result[2]?.trim();

    const record: AlgoliaSearchItemTOC = {
      children: [],
      title: heading,
      anchor: slugger.slug(heading),
    };

    if (depth > 0) {
      currentParent?.children.push(record);
      if (depth > currentDepth) {
        currentParent = record;
      }
    } else {
      currentParent = record;
      acc.push(record);
    }

    currentDepth = depth;

    return acc;
  }, []);
};

const normalizeDomain = (domain: string) => (domain.endsWith('/') ? domain : String(domain));

const contentForRecord = (content: string) => {
  let isCodeBlock = false;
  let isMeta = false;
  return removeMarkdown(
    content
      .split('\n')
      .map(line => {
        // remove code snippets
        if (line.match(/^```(.*)/)) {
          isCodeBlock = !isCodeBlock;
          return null;
        }
        if (isCodeBlock) {
          return null;
        }
        // remove metadata headers
        if (line.startsWith('---')) {
          isMeta = !isMeta;
          return null;
        }
        if (isMeta) {
          return null;
        }
        // remove titles
        if (line.startsWith('#')) {
          return null;
        }
        // remove `import` and `export`
        if (!isCodeBlock && (line.match(/^export(.*)/) || line.match(/^import(.*)/))) {
          return null;
        }
        return line;
      })
      .filter(line => line !== null)
      .join(' '),
  );
};

async function routesToAlgoliaRecords(
  routes: IRoutes,
  source: AlgoliaRecordSource,
  domain: string,
  mdx = true,
  objectsPrefix = new GitHubSlugger().slug(source),
  parentRoute?: { $name: string; path: string },
) {
  const objects: AlgoliaRecord[] = [];

  async function routeToAlgoliaRecords(
    topPath?: string,
    parentLevelName?: string,
    slug?: string,
    title?: string,
  ) {
    if (!slug) {
      return;
    }

    const fileContent = await readFile(
      `./${[parentRoute?.path, topPath, slug].filter(Boolean).join('/')}.md${mdx ? 'x' : ''}`,
    );

    const { data: meta, content } = matter(fileContent.toString());

    const resolvedTitle = title || meta.title || meta.sidebar_label;

    if (!resolvedTitle) {
      return;
    }

    const toc = extractToC(content);

    objects.push({
      objectID: `${objectsPrefix}-${slug}`,
      headings: toc.map(t => t.title),
      toc,
      content: contentForRecord(content),
      url: `${domain}${[parentRoute?.path, topPath, slug].filter(Boolean).join('/')}`,
      domain,
      hierarchy: [source, parentRoute?.$name, parentLevelName, resolvedTitle].filter(Boolean),
      source,
      title: resolvedTitle,
      type: meta.type || 'Documentation',
    });
  }

  await Promise.all(
    map(routes._, async (topRoute, topPath) => {
      if (!topRoute) {
        return;
      }
      if (typeof topRoute === 'string' || Array.isArray(topRoute)) {
        console.warn(`ignored ${topRoute}`);
        return;
      }
      if (topRoute.$name && !topRoute.$routes) {
        return routeToAlgoliaRecords(undefined, undefined, topPath, topRoute.$name);
      }
      return Promise.all<void>(
        map(topRoute.$routes, route => {
          if (Array.isArray(route)) {
            // `route` is `['slug', 'title']`
            return routeToAlgoliaRecords(topPath, topRoute.$name!, route[0], route[1]);
          }
          // `route` is `'slug'`
          if (route.startsWith('$')) {
            const refName = route.substring(1);
            const refs = topRoute._ as {
              [k: string]: Record<string, IRoutes>;
            };
            const subRoutes = refs[refName];

            if (subRoutes) {
              return new Promise(resolve => {
                routesToAlgoliaRecords(
                  {
                    _: {
                      [refName]: subRoutes,
                    },
                  },
                  source,
                  domain,
                  mdx,
                  new GitHubSlugger().slug(`${source}-${refName}`),
                  {
                    $name: topRoute.$name!,
                    path: topPath,
                  },
                ).then(objs => {
                  objects.push(...objs);
                  resolve();
                });
              });
            }
            console.warn(`could not find routes for reference ${route}`);
            return;
          }
          return routeToAlgoliaRecords(topPath, topRoute.$name!, route);
        }),
      );
    }),
  );

  return objects;
}

async function pluginsToAlgoliaRecords(
  // TODO: fix later
  plugins: any[],
  source: AlgoliaRecordSource,
  domain: string,
  objectsPrefix = new GitHubSlugger().slug(source),
): Promise<AlgoliaRecord[]> {
  const objects: AlgoliaRecord[] = [];
  const slugger = new GitHubSlugger();

  plugins.forEach((plugin: any) => {
    const toc = extractToC(plugin.readme || '');

    objects.push({
      objectID: slugger.slug(`${objectsPrefix}-${plugin.title}`),
      headings: toc.map(t => t.title),
      toc,
      content: contentForRecord(plugin.readme || ''),
      url: `${domain}plugins/${plugin.identifier}`,
      domain,
      hierarchy: [source, 'Plugins'],
      source,
      title: plugin.title,
      type: 'Plugin',
    });
  });

  return objects;
}

interface IndexToAlgoliaNextraOptions {
  docsBaseDir: string;
}

async function nextraToAlgoliaRecords(
  { docsBaseDir }: IndexToAlgoliaNextraOptions,
  source: AlgoliaRecordSource,
  domain: string,
  objectsPrefix = new GitHubSlugger().slug(source),
): Promise<AlgoliaRecord[]> {
  return new Promise((resolve, reject) => {
    const objects: AlgoliaRecord[] = [];
    const slugger = new GitHubSlugger();

    // cache for all needed `_meta.json` files
    const metadataCache: Record<string, any> = {};

    const getMetaFromFile = (path: string) => {
      if (statSync(path)) {
        return JSON.parse(readFileSync(path, 'utf8') || '{}');
      }
      return {};
    };

    const getMetadataForFile = (
      filePath: string,
    ): [title: string, hierarchy: string[], urlPath: string] => {
      const hierarchy = [];

      const fileDir = filePath.split('/').slice(0, -1).join('/');
      const fileName = filePath.split('/').pop()!;
      const folders = filePath
        .replace(docsBaseDir, '')
        .replace(fileName, '')
        .split('/')
        .filter(Boolean);
      // docs/guides/advanced -> ['Guides', 'Advanced']
      // by reading meta from:
      //  - docs/guides/_meta.json (for 'advanced' folder)
      //  - docs/_meta.json (for 'guides' folder)
      while (folders.length) {
        const folder = folders.pop()!;
        const path = folders.join('/');

        if (!metadataCache[path]) {
          metadataCache[path] = getMetaFromFile(
            `${docsBaseDir}${docsBaseDir.endsWith('/') ? '' : '/'}${path}/_meta.json`,
          );
        }
        const folderName = metadataCache[path][folder];
        const resolvedFolderName =
          typeof folderName === 'string' ? folderName : folderName?.title || folder;
        if (resolvedFolderName) {
          hierarchy.unshift(resolvedFolderName);
        }
      }
      if (!metadataCache[fileDir]) {
        metadataCache[fileDir] = getMetaFromFile(
          `${fileDir}${fileDir.endsWith('/') ? '' : '/'}_meta.json`,
        );
      }
      const title = metadataCache[fileDir][fileName.replace('.mdx', '')];
      const resolvedTitle = typeof title === 'string' ? title : title?.title;

      const urlPath = filePath
        .replace(docsBaseDir, '')
        .replace(fileName, '')
        .split('/')
        .filter(Boolean)
        .join('/');
      return [resolvedTitle || fileName.replace('.mdx', ''), hierarchy, urlPath];
    };

    glob(`${docsBaseDir}${docsBaseDir.endsWith('/') ? '' : '/'}**/*.mdx`, (err, files) => {
      if (err) {
        reject(err);
      } else {
        files.forEach(file => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          const filename = file.split('/').pop()?.split('.')[0]!;
          const fileContent = readFileSync(file);
          const { data: meta, content } = matter(fileContent.toString());
          const toc = extractToC(content);

          const [title, hierarchy, urlPath] = getMetadataForFile(file);

          objects.push({
            objectID: slugger.slug(`${objectsPrefix}-${[...hierarchy, filename].join('-')}`),
            headings: toc.map(t => t.title),
            toc,
            content: contentForRecord(content),
            url: `${domain}${urlPath}/${filename}`,
            domain,
            hierarchy,
            source,
            title,
            type: meta.type || 'Documentation',
          });
        });
        resolve(objects);
      }
    });
  });
}

export type { AlgoliaRecord, AlgoliaRecordSource, AlgoliaSearchItemTOC };

interface IndexToAlgoliaOptions {
  routes?: IRoutes[];
  docusaurus?: { sidebars: { docs: Record<string, string[]> } };
  // TODO: fix later
  plugins?: any[];
  nextra?: IndexToAlgoliaNextraOptions;
  source: AlgoliaRecordSource;
  domain: string;
  lockfilePath: string;
  dryMode?: boolean;
  postProcessor?: (objects: AlgoliaRecord[]) => AlgoliaRecord[];
}

export const indexToAlgolia = async ({
  routes: routesArr,
  docusaurus,
  plugins = [],
  source,
  domain,
  nextra,
  postProcessor = value => value,
  // TODO: add `force` flag
  dryMode = true,
  lockfilePath,
}: IndexToAlgoliaOptions) => {
  const normalizedRoutes = docusaurus ? [docusaurusToRoutes(docusaurus)] : routesArr || [];

  const objects = postProcessor([
    ...(await Promise.all(
      normalizedRoutes.map(routes =>
        routesToAlgoliaRecords(routes, source, normalizeDomain(domain), !docusaurus),
      ),
    ).then(result => result.flat())),
    ...(await pluginsToAlgoliaRecords(plugins, source, normalizeDomain(domain))),
    ...(nextra ? await nextraToAlgoliaRecords(nextra, source, normalizeDomain(domain)) : []),
  ]);

  const recordsAsString = JSON.stringify(
    sortBy(objects, 'objectID'),
    (key, value) =>
      key === 'content' ? crypto.createHash('md5').update(value).digest('hex') : value,
    2,
  );

  const lockFileExists = existsSync(lockfilePath);
  const lockfileContent = JSON.stringify(
    // save space but still keep track of content changes
    sortBy(JSON.parse(lockFileExists ? readFileSync(lockfilePath, 'utf-8') : '[]'), 'objectID'),
    null,
    2,
  );

  if (dryMode) {
    console.log(`${lockfilePath} updated!`);
    writeFileSync(lockfilePath, recordsAsString);
  } else if (!lockFileExists || recordsAsString !== lockfileContent) {
    if (
      ['ALGOLIA_APP_ID', 'ALGOLIA_ADMIN_API_KEY', 'ALGOLIA_INDEX_NAME'].some(
        envVar => !process.env[envVar],
      )
    ) {
      console.error('Some Algolia environment variables are missing!');
      return;
    }
    if (lockFileExists) {
      console.log('changes detected, updating Algolia index!');
    } else {
      console.log('no lockfile detected, push all records');
    }

    const client = algoliaSearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_ADMIN_API_KEY!);
    const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME!);
    index
      .deleteBy({ filters: `source: "${source}"` })
      .then(() => index.saveObjects(objects))
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      })
      .catch(console.error);

    writeFileSync(lockfilePath, recordsAsString);
  }
};

export const docusaurusToRoutes = ({
  sidebars,
}: {
  sidebars: { docs: Record<string, string[]> };
}): IRoutes => {
  const routes: IRoutes = { _: {} };

  map(sidebars.docs, (children, title) => {
    if (children.every(c => c.includes('/'))) {
      const path = `docs/${children[0].split('/')[0]}`;
      routes._![path] = {
        $name: title,
        $routes: [...children],
      };
    } else if (routes._!.docs) {
      routes._!.docs.$routes?.push(...children);
    } else {
      routes._!.docs = { $routes: [...children] };
    }
  });
  return routes;
};
