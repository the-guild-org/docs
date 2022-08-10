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
  getComponents,
  useConfig,
  useTheme,
} from 'nextra-theme-docs';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
