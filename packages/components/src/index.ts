export * from './components';
export { defineConfig } from './define-config';
export { fetchPackageInfo } from './npm';
export { PRODUCTS } from './products';
export * from './types/components';
export { default as Giscus } from '@giscus/react';
export { useMounted } from 'nextra/hooks';
export { useMDXComponents } from 'nextra/mdx';
export { RemoteContent, useSSG } from 'nextra/ssg';
export { Mermaid, Callout } from 'nextra/components';
export {
  type DocsThemeConfig,
  Bleed,
  Collapse,
  Navbar,
  NotFoundPage,
  ServerSideErrorPage,
  Tab,
  useConfig,
  useTheme,
  Card,
  Cards,
  Steps,
  FileTree,
} from 'nextra-theme-docs';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
