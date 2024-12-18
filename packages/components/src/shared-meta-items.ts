import { PRODUCTS_MENU_LIST, ProductType } from './products';

export function sharedMetaItems(options: { githubUrl: string; product: ProductType }) {
  return {
    products: {
      title: 'Products',
      type: 'menu',
      items: PRODUCTS_MENU_LIST,
    },
    ecosystem: {
      title: 'Ecosystem',
      type: 'page',
      ...(options.product !== 'HIVE' && { href: 'https://the-guild.dev/graphql/hive/ecosystem' }),
    },
    blog: {
      title: 'Blog',
      type: 'page',
      href: 'https://the-guild.dev/blog',
    },
    github: {
      title: 'GitHub',
      type: 'page',
      href: options.githubUrl,
    },
    'the-guild': {
      title: 'The Guild',
      type: 'menu',
      items: {
        'about-us': {
          title: 'About Us',
          href: 'https://the-guild.dev/about-us',
        },
        'brand-assets': {
          title: 'Brand Assets',
          href: 'https://the-guild.dev/logos',
        },
      },
    },
    'graphql-foundation': {
      title: 'GraphQL Foundation',
      type: 'page',
      href: 'https://graphql.org/community/foundation',
    },
  };
}
