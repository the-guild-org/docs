#!/usr/bin/env node
import { resolve } from 'node:path';
import { Command } from 'commander';
import { AlgoliaRecordSource, indexToAlgolia } from './index.js';

const CWD = process.cwd();

const program = new Command();

program
  .option('--docsBaseDir [rootdir]', 'relative path to nextra pages rootDir', './src/pages/')
  .option('-o, --output [lockfilepath]', 'relative path to lock file', './algolia-lockfile.json')
  .option('-p, --publish')
  .requiredOption('-s, --source <source>')
  .requiredOption('-d, --domain <domain>');

program.parse(process.argv);

const options = program.opts();

indexToAlgolia({
  domain: options.domain,
  lockfilePath: resolve(CWD, options.output),
  source: options.source as unknown as AlgoliaRecordSource,
  nextra: {
    docsBaseDir: resolve(CWD, options.docsBaseDir),
  } as any,
  dryMode: !options.publish,
});
