import { MDXComponents } from 'nextra/mdx';
import { MDXLink } from './mdx-link';

/**
 * MDX components used only in Hive-rebranded websites.
 */
export const hiveMdxComponents = {
  a: MDXLink,
} satisfies MDXComponents;
