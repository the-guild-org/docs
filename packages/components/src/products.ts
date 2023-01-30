import { ReactElement } from 'react';
import { AlgoliaRecordSource } from '@theguild/algolia';
import {
  AngularLogo,
  CodeGeneratorLogo,
  ConductorLogo,
  ConfigLogo,
  EnvelopLogo,
  ESLintLogo,
  HelixLogo,
  HiveLogo,
  InspectorLogo,
  KitQLLogo,
  MeshLogo,
  ModulesLogo,
  ScalarsLogo,
  ShieldLogo,
  SofaLogo,
  StitchingLogo,
  SwiftLogo,
  ToolsLogo,
  WhatsAppLogo,
  YogaLogo,
} from './logos';

export type ProductType =
  | 'HIVE'
  | 'CONDUCTOR'
  | 'YOGA'
  | 'ENVELOP'
  | 'INSPECTOR'
  | 'CODEGEN'
  | 'MESH'
  | 'TOOLS'
  | 'MODULES'
  | 'ESLINT'
  | 'CONFIG'
  | 'SCALARS'
  | 'HELIX'
  | 'SHIELD'
  | 'SWIFT'
  | 'SOFA'
  | 'STITCHING'
  | 'ANGULAR'
  | 'WHATSAPP'
  | 'KITQL';

export const PRODUCTS: Record<
  ProductType,
  {
    name: AlgoliaRecordSource;
    title: string;
    href: `https://${string}`;
    logo: (props: { className?: string }) => ReactElement;
    primaryColor: `#${string}`;
  }
> = {
  HIVE: {
    name: 'Hive',
    title: 'Schema registry for your GraphQL workflows',
    href: 'https://the-guild.dev/graphql/hive',
    logo: HiveLogo,
    primaryColor: '#ffb21d',
  },
  CONDUCTOR: {
    name: 'Conductor',
    title: 'All-in-one GraphQL Gateway',
    href: 'https://the-guild.dev/graphql/gateway',
    logo: ConductorLogo,
    primaryColor: '#0f766e',
  },
  YOGA: {
    name: 'Yoga',
    title: 'A fully-featured, simple to set up, performant and extendable server',
    href: 'https://the-guild.dev/graphql/yoga-server',
    logo: YogaLogo,
    primaryColor: '#c026d3',
  },
  ENVELOP: {
    name: 'Envelop',
    title: 'Develop and share plugins that are usable with any GraphQL server framework or schema',
    href: 'https://the-guild.dev/graphql/envelop',
    logo: EnvelopLogo,
    primaryColor: '#ff00e5',
  },
  STITCHING: {
    name: 'Stitching',
    title:
      'Automatically stitch multiple schemas together into one larger API in a simple, fast and powerful way.',
    href: 'https://the-guild.dev/graphql/stitching',
    logo: StitchingLogo,
    primaryColor: '#f95428',
  },
  INSPECTOR: {
    name: 'Inspector',
    title: 'Schema management tool',
    href: 'https://the-guild.dev/graphql/inspector',
    logo: InspectorLogo,
    primaryColor: '#59f79d',
  },
  CODEGEN: {
    name: 'Code Generator',
    title: 'Generation of typed queries, mutations, subscriptions and typed GraphQL resolvers',
    href: 'https://the-guild.dev/graphql/codegen',
    logo: CodeGeneratorLogo,
    primaryColor: '#0284c7',
  },
  MESH: {
    name: 'Mesh',
    title: 'A fully-featured GraphQL gateway framework',
    href: 'https://the-guild.dev/graphql/mesh',
    logo: MeshLogo,
    primaryColor: '#1bcbe2',
  },
  TOOLS: {
    name: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://the-guild.dev/graphql/tools',
    logo: ToolsLogo,
    primaryColor: '#184ae8',
  },
  MODULES: {
    name: 'Modules',
    title: 'Enterprise grade tooling for your GraphQL server',
    href: 'https://the-guild.dev/graphql/modules',
    logo: ModulesLogo,
    primaryColor: '#e535ab',
  },
  ESLINT: {
    name: 'ESLint',
    title: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    href: 'https://the-guild.dev/graphql/eslint',
    logo: ESLintLogo,
    primaryColor: '#5639ca',
  },
  CONFIG: {
    name: 'Config',
    title: 'One configuration for all your GraphQL projects',
    href: 'https://the-guild.dev/graphql/config',
    logo: ConfigLogo,
    primaryColor: '#6d7a99',
  },
  SCALARS: {
    name: 'Scalars',
    title: 'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://the-guild.dev/graphql/scalars',
    logo: ScalarsLogo,
    primaryColor: '#f38',
  },
  HELIX: {
    name: 'Helix',
    title: 'A highly evolved GraphQL HTTP server',
    href: 'https://graphql-helix.com',
    logo: HelixLogo,
    primaryColor: '#03a9f4',
  },
  SHIELD: {
    name: 'Shield',
    title: 'GraphQL permissions framework for complex authorisation systems',
    href: 'https://the-guild.dev/graphql/shield',
    logo: ShieldLogo,
    primaryColor: '#699efc',
  },
  SWIFT: {
    name: 'Swift',
    title: 'A GraphQL client that lets you forget about GraphQL',
    href: 'https://swift-graphql.com',
    logo: SwiftLogo,
    primaryColor: '#f25c40',
  },
  SOFA: {
    name: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL server',
    href: 'https://the-guild.dev/graphql/sofa-api',
    logo: SofaLogo,
    primaryColor: '#e873ff',
  },
  ANGULAR: {
    name: 'Angular',
    title: 'A fully-featured GraphQL client for Angular',
    href: 'https://the-guild.dev/graphql/apollo-angular',
    logo: AngularLogo,
    primaryColor: '#ff1035',
  },
  WHATSAPP: {
    name: 'WhatsApp',
    title: 'Full stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    logo: WhatsAppLogo,
    primaryColor: '#31eb14',
  },
  KITQL: {
    name: 'KitQL',
    title: 'A set of tools, helping you building efficient apps in a fast way',
    href: 'https://kitql.dev',
    logo: KitQLLogo,
    primaryColor: '#ff3e00',
  },
};
