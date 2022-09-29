export * from './components';
export { PRODUCTS } from './helpers/products';
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
export * from './types/components';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
