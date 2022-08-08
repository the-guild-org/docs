export * from './components';
export { PRODUCTS } from './helpers/products';
export { default as Callout } from 'nextra-theme-docs/callout';
export { Tabs, Tab } from 'nextra-theme-docs/tabs';
export type { DocsThemeConfig } from 'nextra-theme-docs';
export { default } from 'nextra-theme-docs';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
