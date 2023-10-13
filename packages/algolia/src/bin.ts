#!/usr/bin/env node
import { resolve } from 'node:path';
import { Command } from 'commander';
import { AlgoliaRecordSource, indexToAlgolia } from './index.js';

const CWD = process.cwd();

const program = new Command();

program
  .option('--docsBaseDir [rootDir]', 'relative path to nextra pages rootDir', './src/pages/')
  .option(
    '-o, --output [lockfileOutputPath]',
    'relative path to the generated lockfile',
    './algolia-lockfile.json',
  )
  .option('-p, --publish')
  .requiredOption('-s, --source <source>')
  .requiredOption('-d, --domain <domain>')
  .option('--sitemap-xml [sitemapXmlPath]', 'relative path to the sitemap', './public/sitemap.xml');

program.parse(process.argv);

const options = program.opts();

indexToAlgolia({
  domain: options.domain,
  sitemapXmlPath: options.sitemapXmlPath,
  lockfilePath: resolve(CWD, options.output),
  source: options.source as unknown as AlgoliaRecordSource,
  nextra: {
    docsBaseDir: resolve(CWD, options.docsBaseDir),
  } as any,
  dryMode: !options.publish,
});
