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
export * from './components';
export { fetchPackageInfo } from './npm';
export { PRODUCTS } from './products';
export * from './types/components';
export * from './logos';
export { cn } from './cn';
export { useMDXComponents } from './mdx-components';
export { GuildLayout } from './theme-layout';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
