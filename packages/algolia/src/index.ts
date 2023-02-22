/* eslint-disable no-console -- for debug */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { writeFile, stat } from 'node:fs/promises';
import algoliaSearch from 'algoliasearch';
import GitHubSlugger from 'github-slugger';
import fg from 'fast-glob';
import matter from 'gray-matter';
import sortBy from 'lodash.sortby';
import removeMarkdown from 'remove-markdown';
import { AlgoliaRecord, AlgoliaRecordSource, AlgoliaSearchItemTOC } from './types';

function extractToC(content: string): AlgoliaSearchItemTOC[] {
  const slugger = new GitHubSlugger();

  let isCodeBlock = false;
  let currentDepth = 0;
  let currentParent: AlgoliaSearchItemTOC | undefined;

  return content.split('\n').reduce<AlgoliaSearchItemTOC[]>((acc, value) => {
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
}

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

async function pluginsToAlgoliaRecords(
  // TODO: fix later
  plugins: any[],
  source: AlgoliaRecordSource,
  domain: string,
  objectsPrefix = new GitHubSlugger().slug(source),
): Promise<AlgoliaRecord[]> {
  const slugger = new GitHubSlugger();

  return plugins.map((plugin: any) => {
    const toc = extractToC(plugin.readme || '');
    return {
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
    };
  });
}

interface IndexToAlgoliaNextraOptions {
  docsBaseDir: string;
  source: AlgoliaRecordSource;
  domain: string;
  objectsPrefix?: string;
}

async function getMetaFromFile(path: string) {
  if (await stat(path)) {
    return JSON.parse(readFileSync(path, 'utf8') || '{}');
  }
  return {};
}

export async function nextraToAlgoliaRecords({
  docsBaseDir,
  source,
  domain,
  objectsPrefix = new GitHubSlugger().slug(source),
}: IndexToAlgoliaNextraOptions): Promise<AlgoliaRecord[]> {
  const objects: AlgoliaRecord[] = [];
  const slugger = new GitHubSlugger();

  // cache for all needed `_meta.json` files
  const metadataCache: Record<string, any> = {};

  const getMetadataForFile = async (
    filePath: string,
  ): Promise<[title: string, hierarchy: string[], urlPath: string]> => {
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

      metadataCache[path] ||= await getMetaFromFile(
        `${docsBaseDir}${docsBaseDir.endsWith('/') ? '' : '/'}${path}/_meta.json`,
      );
      const folderName = metadataCache[path][folder];
      const resolvedFolderName =
        typeof folderName === 'string' ? folderName : folderName?.title || folder;
      if (resolvedFolderName) {
        hierarchy.unshift(resolvedFolderName);
      }
    }
    metadataCache[fileDir] ||= await getMetaFromFile(
      `${fileDir}${fileDir.endsWith('/') ? '' : '/'}_meta.json`,
    );
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

  const files = await fg.sync(`${docsBaseDir}${docsBaseDir.endsWith('/') ? '' : '/'}**/*.mdx`);

  for (const file of files) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const filename = file
      .split('/')
      .pop()
      ?.split('.')[0]
      .replace(/^index$/, '')!;
    const fileContent = readFileSync(file);
    const { data: meta, content } = matter(fileContent.toString());
    const toc = extractToC(content);

    const [title, hierarchy, urlPath] = await getMetadataForFile(file);

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
  }
  return objects;
}

export type { AlgoliaRecord, AlgoliaRecordSource, AlgoliaSearchItemTOC };

interface IndexToAlgoliaOptions {
  // TODO: fix later
  plugins?: any[];
  nextra?: IndexToAlgoliaNextraOptions;
  source: AlgoliaRecordSource;
  domain: string;
  lockfilePath: string;
  dryMode?: boolean;
  postProcessor?: (objects: AlgoliaRecord[]) => AlgoliaRecord[];
}

export async function indexToAlgolia({
  plugins = [],
  source,
  domain,
  nextra,
  postProcessor = value => value,
  // TODO: add `force` flag
  dryMode = true,
  lockfilePath,
}: IndexToAlgoliaOptions) {
  const objects = postProcessor([
    ...(await pluginsToAlgoliaRecords(plugins, source, normalizeDomain(domain))),
    ...(nextra
      ? await nextraToAlgoliaRecords({
          docsBaseDir: nextra.docsBaseDir,
          source,
          domain: normalizeDomain(domain),
        })
      : []),
  ]);

  const recordsAsString = JSON.stringify(
    sortBy(objects, 'objectID'),
    (key, value) => (key === 'content' ? createHash('md5').update(value).digest('hex') : value),
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
    await writeFile(lockfilePath, recordsAsString);
    return;
  }
  if (!lockFileExists || recordsAsString !== lockfileContent) {
    if (
      !process.env.ALGOLIA_APP_ID ||
      !process.env.ALGOLIA_ADMIN_API_KEY ||
      !process.env.ALGOLIA_INDEX_NAME
    ) {
      console.error('Some Algolia environment variables are missing!');
      return;
    }
    if (lockFileExists) {
      console.log('changes detected, updating Algolia index!');
    } else {
      console.log('no lockfile detected, push all records');
    }

    const client = algoliaSearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
    const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
    index
      .deleteBy({ filters: `source: "${source}"` })
      .then(() => index.saveObjects(objects))
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      })
      .catch(console.error);

    await writeFile(lockfilePath, recordsAsString);
  }
}
