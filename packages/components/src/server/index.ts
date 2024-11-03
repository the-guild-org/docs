// Must be in `server` folder because can contain server-only components or imports Node.js builtin
export { useMDXComponents } from './mdx-components.js';
// Must be in `server` folder because contains import of `useMDXComponents`
export { MDXRemote } from 'nextra/mdx-remote';

export { fetchFilePathsFromGitHub } from 'nextra/fetch-filepaths-from-github';
export { compileMdx } from 'nextra/compile';
export { getPageMap } from 'nextra/page-map';
export { fetchPackageInfo } from './npm.js';

/**
 * Contain `getPageMap` import which imports `metadata` from pages, in case importing from
 * `@theguild/components` will throw:
 *
 * × Error: You are attempting to export "metadata" from a component marked with "use client",
 * which is disallowed. Either remove the export, or the "use client" directive. Read more: https://nextjs.org
 */
export { GuildLayout, getDefaultMetadata } from './theme-layout.js';
