export { default as Giscus } from '@giscus/react';
export { Navbar, NotFoundPage, useConfig, useTheme, useThemeConfig } from 'nextra-theme-docs';
export { createCatchAllMeta } from 'nextra/catch-all';
export {
  Callout,
  Cards,
  Code,
  FileTree,
  Mermaid,
  RemoteContent,
  Steps,
  Tabs,
  Table,
  Td,
  Th,
  Tr,
  Bleed,
  Collapse,
} from 'nextra/components';
export { useMounted } from 'nextra/hooks';
export { useMDXComponents } from 'nextra/mdx';
export * from './components';
export { defineConfig } from './define-config';
export { fetchPackageInfo } from './npm';
export { PRODUCTS } from './products';
export * from './types/components';
export * from './logos';
export * from './cn';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
