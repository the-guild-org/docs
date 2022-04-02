import moonIconDark from '../static/icons/moon-dark.svg';
import moonIconLight from '../static/icons/moon-light.svg';
import hamburgerIconDark from '../static/icons/hamburger-dark.svg';
import hamburgerIconLight from '../static/icons/hamburger-light.svg';
import caretIconDark from '../static/icons/caret-down-dark.svg';
import caretIconLight from '../static/icons/caret-down-light.svg';
import caretSlimIconDark from '../static/icons/caret-down-slim-dark.svg';
import caretSlimIconLight from '../static/icons/caret-down-slim-light.svg';
import closeIconDark from '../static/icons/close-dark.svg';
import closeIconLight from '../static/icons/close-light.svg';
import externalLinkIconLight from '../static/icons/external-link-light.svg';
import externalLinkIconDark from '../static/icons/external-link-dark.svg';
import searchIconDark from '../static/icons/search-dark.svg';
import searchIconLight from '../static/icons/search-light.svg';
import pageIconDark from '../static/icons/page-dark.svg';
import pageIconLight from '../static/icons/page-light.svg';
import hashtagIconDark from '../static/icons/hashtag-dark.svg';
import hashtagIconLight from '../static/icons/hashtag-light.svg';
import mailIconDark from '../static/icons/mail-dark.svg';
import mailIconLight from '../static/icons/mail-light.svg';
import arrowUpRightIconDark from '../static/icons/arrow-up-right-dark.svg';
import arrowUpRightIconLight from '../static/icons/arrow-up-right-light.svg';
import shareDark from '../static/icons/share-dark.svg';
import moreVerticalDark from '../static/icons/more-vertical-dark.svg';

const CDN = 'https://the-guild.dev/static/shared-logos/';

const logoFullDark = `${CDN}guild-full-dark.svg`;
const logoFullLight = `${CDN}guild-full-light.svg`;
const logoMonoDark = `${CDN}guild-mono-dark.svg`;
const logoMonoLight = `${CDN}guild-mono-light.svg`;

export const headerThemedIcons = (isDark: boolean) => ({
  themeToggle: isDark ? moonIconLight : moonIconDark,
  menu: isDark ? hamburgerIconLight : hamburgerIconDark,
  caret: isDark ? caretIconLight : caretIconDark,
  caretSlim: isDark ? caretSlimIconLight : caretSlimIconDark,
  close: isDark ? closeIconLight : closeIconDark,
});

export const PRODUCTS: {
  children: string;
  title: string;
  href: `https://${string}`;
  logo: `${string}.svg`;
}[] = [
  {
    children: 'Hive',
    title: 'Schema Registry for your GraphQL Workflows',
    href: 'https://graphql-hive.com',
    logo: `${CDN}products/hive.svg`,
  },
  {
    children: 'Yoga',
    title:
      'A fully-featured, simple to set up, performant and extendable server',
    href: 'https://graphql-yoga.com',
    logo: `${CDN}products/yoga.svg`,
  },
  {
    children: 'Envelop',
    title: 'Modern GraphQL Framework',
    href: 'https://envelop.dev',
    logo: `${CDN}products/envelop.svg`,
  },
  {
    children: 'Inspector',
    title: 'Schema management tool',
    href: 'https://graphql-inspector.com',
    logo: `${CDN}products/inspector.svg`,
  },
  {
    children: 'Code Generator',
    title: 'Generate anything from GraphQL',
    href: 'https://graphql-code-generator.com',
    logo: `${CDN}products/code-generator.svg`,
  },
  {
    children: 'Mesh',
    title: 'Query anything, run anywhere',
    href: 'https://graphql-mesh.com',
    logo: `${CDN}products/mesh.svg`,
  },
  {
    children: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://graphql-tools.com',
    logo: `${CDN}products/tools.svg`,
  },
  {
    children: 'Modules',
    title: 'Enterprise Grade Tooling For Your GraphQL Server',
    href: 'https://graphql-modules.com',
    logo: `${CDN}products/modules.svg`,
  },
  {
    children: 'ESLint',
    title: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    href: 'https://github.com/B2o5T/graphql-eslint',
    logo: `${CDN}products/eslint.svg`,
  },
  {
    children: 'Config',
    title: 'One configuration for all your GraphQL tools',
    href: 'https://graphql-config.com',
    logo: `${CDN}products/config.svg`,
  },
  {
    children: 'Scalars',
    title:
      'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://graphql-scalars.dev',
    logo: `${CDN}products/scalars.svg`,
  },
  {
    children: 'Helix',
    title: 'A highly evolved GraphQL HTTP Server',
    href: 'https://graphql-helix.com',
    logo: `${CDN}products/helix.svg`,
  },
  {
    children: 'Shield',
    title: 'GraphQL Permissions Framework For Complex Authorisation Systems',
    href: 'https://graphql-shield.com',
    logo: `${CDN}products/shield.svg`,
  },
  {
    children: 'Swift',
    title: 'A GraphQL client that lets you forget about GraphQL',
    href: 'https://swift-graphql.com',
    logo: `${CDN}products/swift.svg`,
  },
  {
    children: 'CLI',
    title: 'Command line tool for common GraphQL workflows',
    href: 'https://github.com/Urigo/graphql-cli',
    logo: `${CDN}products/cli.svg`,
  },
  {
    children: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL Server',
    href: 'https://sofa-api.com',
    logo: `${CDN}products/sofa.svg`,
  },
  {
    children: 'Stencil',
    title:
      'A fully-featured, production ready caching GraphQL client for Stencil and every GraphQL server',
    href: 'https://github.com/ardatan/stencil-apollo',
    logo: `${CDN}products/stencil.svg`,
  },
  {
    children: 'Angular',
    title:
      'A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server',
    href: 'https://apollo-angular.com',
    logo: `${CDN}products/angular.svg`,
  },
  {
    children: 'WhatsApp',
    title: 'Full Stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    logo: `${CDN}products/whatsapp.svg`,
  },
];

export const logoThemedIcons = (isDark = false) => ({
  logoFull: isDark ? logoFullLight : logoFullDark,
  logoMono: isDark ? logoMonoLight : logoMonoDark,
});

export const searchBarThemedIcons = (isDark: boolean) => ({
  search: isDark ? searchIconLight : searchIconDark,
  close: isDark ? closeIconLight : closeIconDark,
  page: isDark ? pageIconLight : pageIconDark,
  hashtag: isDark ? hashtagIconLight : hashtagIconDark,
  content: isDark ? hamburgerIconLight : hamburgerIconDark,
});

export const modalThemedIcons = (isDark: boolean) => ({
  close: isDark ? closeIconLight : closeIconDark,
  externalLink: isDark ? externalLinkIconLight : externalLinkIconDark,
});

export const marketplaceThemedAssets = (isDark: boolean) => ({
  caret: isDark ? caretSlimIconLight : caretSlimIconDark,
  search: isDark ? searchIconLight : searchIconDark,
  share: shareDark,
  moreVertical: moreVerticalDark,
});

export const newsletterThemedIcons = (isDark: boolean) => ({
  mail: isDark ? mailIconLight : mailIconDark,
  arrow: isDark ? arrowUpRightIconLight : arrowUpRightIconDark,
});
