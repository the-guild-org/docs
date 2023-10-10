export * from './components';
export { defineConfig } from './define-config';
export { fetchPackageInfo } from './npm';
export { PRODUCTS } from './products';
export * from './types/components';
export { default as Giscus } from '@giscus/react';
export { useMounted } from 'nextra/hooks';
export { useMDXComponents } from 'nextra/mdx';
export { RemoteContent, useData } from 'nextra/data';
export { Mermaid, Callout, Tabs, Cards, Steps, FileTree } from 'nextra/components';
export {
  type DocsThemeConfig,
  Bleed,
  Collapse,
  Navbar,
  NotFoundPage,
  useConfig,
  useTheme,
  useThemeConfig,
} from 'nextra-theme-docs';
export { createCatchAllMeta } from 'nextra/catch-all';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
