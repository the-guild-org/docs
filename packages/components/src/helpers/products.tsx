import { ReactElement } from 'react';
import { AlgoliaRecordSource } from '@theguild/algolia';
import {
  HiveLogo,
  YogaLogo,
  EnvelopLogo,
  InspectorLogo,
  CodeGeneratorLogo,
  MeshLogo,
  ToolsLogo,
  ModulesLogo,
  ESLintLogo,
  ConfigLogo,
  ScalarsLogo,
  HelixLogo,
  ShieldLogo,
  SwiftLogo,
  CLILogo,
  SofaLogo,
  StencilLogo,
  AngularLogo,
  WhatsUpLogo,
  KitQLLogo,
} from '../components/logos';

export const PRODUCTS: {
  children: AlgoliaRecordSource;
  title: string;
  href: `https://${string}`;
  logo: (props: { className?: string }) => ReactElement;
}[] = [
  {
    children: 'Hive',
    title: 'Schema Registry for your GraphQL Workflows',
    href: 'https://graphql-hive.com',
    logo: HiveLogo,
  },
  {
    children: 'Yoga',
    title: 'A fully-featured, simple to set up, performant and extendable server',
    href: 'https://the-guild.dev/graphql/yoga-server',
    logo: YogaLogo,
  },
  {
    children: 'Envelop',
    title: 'Develop and share plugins that are usable with any GraphQL server framework or schema',
    href: 'https://the-guild.dev/graphql/envelop',
    logo: EnvelopLogo,
  },
  {
    children: 'Inspector',
    title: 'Schema management tool',
    href: 'https://the-guild.dev/graphql/inspector',
    logo: InspectorLogo,
  },
  {
    children: 'Code Generator',
    title: 'Generation of Typed Queries, Mutations, Subscriptions and Typed GraphQL resolvers',
    href: 'https://the-guild.dev/graphql/codegen',
    logo: CodeGeneratorLogo,
  },
  {
    children: 'Mesh',
    title: 'A fully-featured GraphQL Gateway framework',
    href: 'https://the-guild.dev/graphql/mesh',
    logo: MeshLogo,
  },
  {
    children: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://the-guild.dev/graphql/tools',
    logo: ToolsLogo,
  },
  {
    children: 'Modules',
    title: 'Enterprise Grade Tooling For Your GraphQL Server',
    href: 'https://the-guild.dev/graphql/modules',
    logo: ModulesLogo,
  },
  {
    children: 'ESLint',
    title: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    href: 'https://github.com/B2o5T/graphql-eslint',
    logo: ESLintLogo,
  },
  {
    children: 'Config',
    title: 'One configuration for all your GraphQL projects',
    href: 'https://the-guild.dev/graphql/config',
    logo: ConfigLogo,
  },
  {
    children: 'Scalars',
    title: 'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://the-guild.dev/graphql/scalars',
    logo: ScalarsLogo,
  },
  {
    children: 'Helix',
    title: 'A highly evolved GraphQL HTTP Server',
    href: 'https://graphql-helix.com',
    logo: HelixLogo,
  },
  {
    children: 'Shield',
    title: 'GraphQL Permissions Framework For Complex Authorisation Systems',
    href: 'https://graphql-shield.com',
    logo: ShieldLogo,
  },
  {
    children: 'Swift',
    title: 'A GraphQL client that lets you forget about GraphQL',
    href: 'https://swift-graphql.com',
    logo: SwiftLogo,
  },
  {
    children: 'CLI',
    title: 'Command line tool for common GraphQL workflows',
    href: 'https://github.com/Urigo/graphql-cli',
    logo: CLILogo,
  },
  {
    children: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL Server',
    href: 'https://the-guild.dev/graphql/sofa-api',
    logo: SofaLogo,
  },
  {
    children: 'Stencil',
    title: 'A fully-featured, production ready caching GraphQL client',
    href: 'https://github.com/ardatan/stencil-apollo',
    logo: StencilLogo,
  },
  {
    children: 'Angular',
    title: 'A fully-featured GraphQL client for Angular',
    href: 'https://the-guild.dev/graphql/apollo-angular',
    logo: AngularLogo,
  },
  {
    children: 'WhatsApp',
    title: 'Full Stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    logo: WhatsUpLogo,
  },
  {
    children: 'KitQL',
    title: 'A set of tools, helping you building efficient apps in a fast way',
    href: 'https://kitql.dev',
    logo: KitQLLogo,
  },
];
