export {
  type DocsThemeConfig,
  default,
  Callout,
  Tabs,
  Tab,
  Bleed,
  Collapse,
  NotFoundPage,
  ServerSideErrorPage,
  useMDXComponents,
  useConfig,
  useTheme,
  Navbar,
} from 'nextra-theme-docs';
export { useMounted } from 'nextra/hooks';
export * from './components';
export { PRODUCTS } from './products';
export * from './types/components';
export * from './mermaid';
export { default as Giscus } from '@giscus/react';
export { defineConfig } from './define-config';
export { fetchPackageInfo } from './npm';
export { useSSG } from 'nextra/ssg';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
