const CDN = 'https://the-guild.dev/static/shared-logos/products/';

import { AlgoliaRecordSource } from '@guild-docs/algolia';

export const PRODUCTS: {
  children: AlgoliaRecordSource;
  title: string;
  href: `https://${string}`;
  logo: `${string}.svg`;
}[] = [
  {
    children: 'Hive',
    title: 'Schema Registry for your GraphQL Workflows',
    href: 'https://graphql-hive.com',
    logo: `${CDN}hive.svg`,
  },
  {
    children: 'Yoga',
    title:
      'A fully-featured, simple to set up, performant and extendable server',
    href: 'https://graphql-yoga.com',
    logo: `${CDN}yoga.svg`,
  },
  {
    children: 'Envelop',
    title:
      'Develop and share plugins that are usable with any GraphQL server framework or schema',
    href: 'https://envelop.dev',
    logo: `${CDN}envelop.svg`,
  },
  {
    children: 'Inspector',
    title: 'Schema management tool',
    href: 'https://graphql-inspector.com',
    logo: `${CDN}inspector.svg`,
  },
  {
    children: 'Code Generator',
    title:
      'Generation of Typed Queries, Mutations, Subscriptions and Typed GraphQL resolvers',
    href: 'https://graphql-code-generator.com',
    logo: `${CDN}code-generator.svg`,
  },
  {
    children: 'Mesh',
    title: 'A fully-featured GraphQL Gateway framework',
    href: 'https://graphql-mesh.com',
    logo: `${CDN}mesh.svg`,
  },
  {
    children: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://graphql-tools.com',
    logo: `${CDN}tools.svg`,
  },
  {
    children: 'Modules',
    title: 'Enterprise Grade Tooling For Your GraphQL Server',
    href: 'https://graphql-modules.com',
    logo: `${CDN}modules.svg`,
  },
  {
    children: 'ESLint',
    title: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    href: 'https://github.com/B2o5T/graphql-eslint',
    logo: `${CDN}eslint.svg`,
  },
  {
    children: 'Config',
    title: 'One configuration for all your GraphQL projects',
    href: 'https://graphql-config.com',
    logo: `${CDN}config.svg`,
  },
  {
    children: 'Scalars',
    title:
      'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://graphql-scalars.dev',
    logo: `${CDN}scalars.svg`,
  },
  {
    children: 'Helix',
    title: 'A highly evolved GraphQL HTTP Server',
    href: 'https://graphql-helix.com',
    logo: `${CDN}helix.svg`,
  },
  {
    children: 'Shield',
    title: 'GraphQL Permissions Framework For Complex Authorisation Systems',
    href: 'https://graphql-shield.com',
    logo: `${CDN}shield.svg`,
  },
  {
    children: 'Swift',
    title: 'A GraphQL client that lets you forget about GraphQL',
    href: 'https://swift-graphql.com',
    logo: `${CDN}swift.svg`,
  },
  {
    children: 'CLI',
    title: 'Command line tool for common GraphQL workflows',
    href: 'https://github.com/Urigo/graphql-cli',
    logo: `${CDN}cli.svg`,
  },
  {
    children: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL Server',
    href: 'https://sofa-api.com',
    logo: `${CDN}sofa.svg`,
  },
  {
    children: 'Stencil',
    title: 'A fully-featured, production ready caching GraphQL client',
    href: 'https://github.com/ardatan/stencil-apollo',
    logo: `${CDN}stencil.svg`,
  },
  {
    children: 'Angular',
    title: 'A fully-featured GraphQL client for Angular',
    href: 'https://apollo-angular.com',
    logo: `${CDN}angular.svg`,
  },
  {
    children: 'WhatsApp',
    title: 'Full Stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    logo: `${CDN}whatsapp.svg`,
  },
  {
    children: 'KitQL',
    title: 'A set of tools, helping you building efficient apps in a fast way',
    href: 'https://kitql.dev',
    logo: `${CDN}kitql.svg`,
  },
];
