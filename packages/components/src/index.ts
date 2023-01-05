export * from './components';
export { defineConfig } from './define-config';
export * from './mermaid';
export { fetchPackageInfo } from './npm';
export { PRODUCTS } from './products';
export * from './types/components';
export { default as Giscus } from '@giscus/react';
export { useMounted } from 'nextra/hooks';
export { useSSG } from 'nextra/ssg';
export {
  type DocsThemeConfig,
  Bleed,
  Callout,
  Collapse,
  default,
  Navbar,
  NotFoundPage,
  ServerSideErrorPage,
  Tab,
  Tabs,
  useConfig,
  useMDXComponents,
  useTheme,
} from 'nextra-theme-docs';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
