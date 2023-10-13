/* eslint-disable no-console -- for debug */

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import algoliaSearch from 'algoliasearch';
import { XMLParser } from 'fast-xml-parser';
import GitHubSlugger from 'github-slugger';
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

const withoutTrailingSlashes = (str: string) => str.replace(/\/+$/, '');
const withTrailingSlash = (str: string) => `${withoutTrailingSlashes(str)}/`;

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
  ).trim();
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
      url: `${withTrailingSlash(domain)}plugins/${plugin.identifier}`,
      domain: withoutTrailingSlashes(domain),
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
  sitemapXmlPath: string;
  objectsPrefix?: string;
}

async function getSitemapUrlsXml(sitemapXmlPath: string): Promise<string[]> {
  if (!sitemapXmlPath) {
    throw new Error('Sitemap path not provided');
  }
  if (!existsSync(sitemapXmlPath)) {
    throw new Error(`Sitemap at path "${sitemapXmlPath}" does not exist`);
  }
  const sitemap = new XMLParser().parse(await readFile(sitemapXmlPath, 'utf-8'));
  const sitemapUrls: { loc: string }[] = sitemap?.urlset?.url;
  if (!sitemapUrls?.length) {
    console.debug(sitemapXmlPath, JSON.stringify(sitemap, null, '  '));
    throw new Error('Sitemap urls not found at path urlset>url');
  }
  const urls = sitemapUrls.map(({ loc }) => loc).filter(Boolean);
  if (!urls?.length) {
    console.debug(sitemapXmlPath, JSON.stringify(sitemap, null, '  '));
    throw new Error('No sitemap urls found path urlset>url>loc');
  }
  return urls;
}

export async function nextraToAlgoliaRecords({
  docsBaseDir,
  source,
  domain,
  sitemapXmlPath,
  objectsPrefix = new GitHubSlugger().slug(source),
}: IndexToAlgoliaNextraOptions): Promise<AlgoliaRecord[]> {
  const sitemapUrls = await getSitemapUrlsXml(sitemapXmlPath);

  const objects: AlgoliaRecord[] = [];
  const slugger = new GitHubSlugger();

  for (const sitemapUrl of sitemapUrls) {
    const pageSlug = withoutTrailingSlashes(sitemapUrl.replace(withTrailingSlash(domain), ''));

    let pagePath = path.join(docsBaseDir, pageSlug);
    let pageContent: string;

    // since we strip extensions from urls, if the path exists - it's a directory, otherwise a markdown file
    const isDir = existsSync(pagePath);
    pagePath = `${pagePath}${isDir ? '/index' : ''}.md`;
    if (existsSync(pagePath)) {
      // .md
      pageContent = await readFile(pagePath, 'utf-8');
    } else if (((pagePath = `${pagePath}x`), existsSync(pagePath))) {
      // .mdx
      pageContent = await readFile(pagePath, 'utf-8');
    } else {
      throw new Error(`Page ${pagePath.replace('.mdx', '.{md,mdx}')} does not exist`);
    }

    // front-matter title or first appearing H1 heading content
    const {
      data: { title: matterTitle, type: matterType },
      content,
    } = matter(pageContent);
    let title = matterTitle;
    if (!title) {
      // title mustnt be on the first line
      for (const line of content.split('\n')) {
        if (line.startsWith('# ')) {
          title = line.replace('# ', '').trim();
          break;
        }
      }
    }
    if (!title) {
      throw new Error(`Title for page ${pagePath} not found`);
    }

    const hierarchy = pageSlug.split('/');
    if (!isDir) {
      // if the page is an actual file, then the directory (for the hierarchy) is one up
      hierarchy.pop();
    }

    const filenameWithoutExt = path.basename(pagePath, path.extname(pagePath));

    const toc = extractToC(content);

    objects.push({
      objectID: slugger.slug(
        `${objectsPrefix}-${[
          ...hierarchy,
          // TODO: should we remove the `index` file from the object ID?
          filenameWithoutExt.replaceAll('.', '_'),
        ].join('-')}`,
      ),
      headings: toc.map(t => t.title),
      toc,
      content: contentForRecord(content),
      url: sitemapUrl,
      domain: withoutTrailingSlashes(domain),
      hierarchy,
      source,
      title,
      type: matterType || 'Documentation',
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
  sitemapXmlPath: string;
  lockfilePath: string;
  dryMode?: boolean;
  postProcessor?: (objects: AlgoliaRecord[]) => AlgoliaRecord[];
}

export async function indexToAlgolia({
  plugins = [],
  source,
  domain,
  sitemapXmlPath,
  nextra,
  postProcessor = value => value,
  // TODO: add `force` flag
  dryMode = true,
  lockfilePath,
}: IndexToAlgoliaOptions) {
  const objects = postProcessor([
    ...(await pluginsToAlgoliaRecords(plugins, source, domain)),
    ...(nextra
      ? await nextraToAlgoliaRecords({
          docsBaseDir: nextra.docsBaseDir,
          source,
          domain,
          sitemapXmlPath,
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
    sortBy(lockFileExists ? JSON.parse(await readFile(lockfilePath, 'utf8')) : [], 'objectID'),
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
      .then(console.log)
      .catch(console.error);

    await writeFile(lockfilePath, recordsAsString);
  }
}
