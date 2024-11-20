import { FC, HTMLProps, ReactNode, SVGProps } from 'react';
import { cn } from './cn';
import { CodegenIcon, HiveGatewayIcon, HiveIcon, MeshIcon, YogaIcon } from './components/icons';
import {
  AngularLettermark,
  ConductorLettermark,
  ConfigLettermark,
  EnvelopLettermark,
  FetsLettermark,
  GraphQLESlintLettermark,
  HeltinLettermark,
  InspectorLettermark,
  KitQLLettermark,
  ModulesLettermark,
  NextraLogo,
  ScalarsLettermark,
  SofaLettermark,
  SSELettermark,
  StitchingLettermark,
  ToolsLettermark,
  WhatsAppLettermark,
  WSLettermark,
} from './logos';

export type ProductType =
  | 'HIVE'
  | 'HIVE_GATEWAY'
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
  | 'SOFA'
  | 'STITCHING'
  | 'ANGULAR'
  | 'WHATSAPP'
  | 'KITQL'
  | 'SSE'
  | 'WS'
  | 'FETS'
  | 'HELTIN'
  | 'NEXTRA';

export interface ProductInfo {
  name: string;
  title: string;
  href: `https://${string}`;
  logo: FC<SVGProps<SVGElement>> | FC<HTMLProps<HTMLElement>>;
  primaryColor: `#${string}`;
}

export const PRODUCTS: Record<ProductType, ProductInfo> = {
  HIVE: {
    name: 'Hive',
    title: 'Schema registry for your GraphQL workflows',
    href: 'https://the-guild.dev/graphql/hive',
    logo: HiveIcon,
    primaryColor: '#ffb21d',
  },
  HIVE_GATEWAY: {
    name: 'Hive Gateway',
    title: 'A fully-featured GraphQL gateway framework',
    href: 'https://the-guild.dev/graphql/hive/docs/gateway',
    logo: HiveGatewayIcon,
    primaryColor: '#ffb21d',
  },
  MESH: {
    name: 'Mesh',
    title: 'A fully-featured GraphQL gateway framework',
    href: 'https://the-guild.dev/graphql/mesh',
    logo: MeshIcon,
    primaryColor: '#1bcbe2',
  },
  YOGA: {
    name: 'Yoga',
    title: 'A fully-featured, simple to set up, performant and extendable server',
    href: 'https://the-guild.dev/graphql/yoga-server',
    logo: YogaIcon,
    primaryColor: '#c026d3',
  },
  CONDUCTOR: {
    name: 'Conductor',
    title: 'All-in-one GraphQL Gateway',
    href: 'https://the-guild.dev/graphql/gateway',
    logo: ConductorLettermark,
    primaryColor: '#0f766e',
  },
  ENVELOP: {
    name: 'Envelop',
    title: 'Develop and share plugins that are usable with any GraphQL server framework or schema',
    href: 'https://the-guild.dev/graphql/envelop',
    logo: EnvelopLettermark,
    primaryColor: '#ff00e5',
  },
  STITCHING: {
    name: 'Stitching',
    title:
      'Automatically stitch multiple schemas together into one larger API in a simple, fast and powerful way',
    href: 'https://the-guild.dev/graphql/stitching',
    logo: StitchingLettermark,
    primaryColor: '#f95428',
  },
  INSPECTOR: {
    name: 'Inspector',
    title: 'Schema management tool',
    href: 'https://the-guild.dev/graphql/inspector',
    logo: InspectorLettermark,
    primaryColor: '#59f79d',
  },
  CODEGEN: {
    name: 'Codegen',
    title: 'Generation of typed queries, mutations, subscriptions and typed GraphQL resolvers',
    href: 'https://the-guild.dev/graphql/codegen',
    logo: CodegenIcon,
    primaryColor: '#0284c7',
  },
  TOOLS: {
    name: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://the-guild.dev/graphql/tools',
    logo: ToolsLettermark,
    primaryColor: '#184ae8',
  },
  MODULES: {
    name: 'Modules',
    title: 'Enterprise grade tooling for your GraphQL server',
    href: 'https://the-guild.dev/graphql/modules',
    logo: ModulesLettermark,
    primaryColor: '#e535ab',
  },
  ESLINT: {
    name: 'GraphQL ESLint',
    title: 'Customizable ESLint parser, plugin, and rule set for GraphQL',
    href: 'https://the-guild.dev/graphql/eslint',
    logo: GraphQLESlintLettermark,
    primaryColor: '#5639ca',
  },
  CONFIG: {
    name: 'Config',
    title: 'One configuration for all your GraphQL projects',
    href: 'https://the-guild.dev/graphql/config',
    logo: ConfigLettermark,
    primaryColor: '#6d7a99',
  },
  FETS: {
    name: 'feTS',
    title: 'Build and consume REST APIs with the e2e type safety using TypeScript and OpenAPI',
    href: 'https://the-guild.dev/fets',
    logo: FetsLettermark,
    primaryColor: '#3178c6',
  },
  SCALARS: {
    name: 'Scalars',
    title: 'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://the-guild.dev/graphql/scalars',
    logo: ScalarsLettermark,
    primaryColor: '#f38',
  },
  SOFA: {
    name: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL server',
    href: 'https://the-guild.dev/graphql/sofa-api',
    logo: SofaLettermark,
    primaryColor: '#e873ff',
  },
  ANGULAR: {
    name: 'Angular',
    title: 'A fully-featured GraphQL client for Angular',
    href: 'https://the-guild.dev/graphql/apollo-angular',
    logo: AngularLettermark,
    primaryColor: '#ff1035',
  },
  WHATSAPP: {
    name: 'WhatsApp',
    title: 'Full stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    logo: WhatsAppLettermark,
    primaryColor: '#31eb14',
  },
  KITQL: {
    name: 'KitQL',
    title: 'A set of tools, helping you building efficient apps in a fast way',
    href: 'https://kitql.dev',
    logo: KitQLLettermark,
    primaryColor: '#ff3e00',
  },
  WS: {
    name: 'WS',
    title: 'Reference implementation of the GraphQL over WS spec',
    href: 'https://the-guild.dev/graphql/ws',
    logo: WSLettermark,
    primaryColor: '#0bf2e7',
  },
  SSE: {
    name: 'SSE',
    title: 'Reference implementation of the GraphQL over SSE spec',
    href: 'https://the-guild.dev/graphql/sse',
    logo: SSELettermark,
    primaryColor: '#08e045',
  },
  HELTIN: {
    name: 'heltin',
    title: 'Mental healthcare registry',
    href: 'https://the-guild.dev/heltin',
    logo: HeltinLettermark,
    primaryColor: '#1d90ff',
  },
  NEXTRA: {
    name: 'Nextra',
    title:
      'Simple, powerful and flexible site generation framework with everything you love from Next.js',
    href: 'https://nextra.site',
    logo: NextraLogo,
    primaryColor: '#000',
  },
};

export const FOUR_MAIN_PRODUCTS = [
  PRODUCTS.HIVE,
  PRODUCTS.HIVE_GATEWAY,
  PRODUCTS.YOGA,
  PRODUCTS.MESH,
];

export const SIX_HIGHLIGHTED_PRODUCTS = [
  PRODUCTS.CODEGEN,
  PRODUCTS.INSPECTOR,
  PRODUCTS.ENVELOP,
  PRODUCTS.SOFA,
  PRODUCTS.SCALARS,
  PRODUCTS.ESLINT,
];

/** List of products displayed in hamburger menu. */
export const PRODUCTS_MENU_LIST: Record<string, { type: 'separator'; title: ReactNode }> =
  Object.fromEntries(
    (
      [
        'The GraphQL Stack',
        ...FOUR_MAIN_PRODUCTS,
        'Libraries',
        ...SIX_HIGHLIGHTED_PRODUCTS,
      ] as const
    ).map((item, i) => {
      if (typeof item === 'string') {
        return [
          i,
          {
            type: 'separator',
            title: (
              <>
                {/* This is a one-off class. The margins and paddings of the parent list item are were large. */}
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <style className="hive-label-separator">
                  {'li:has(>.hive-label-separator) { margin: 0.75rem 0 0.25rem 0; padding: 0 }'}
                </style>
                <span className="ml-2 font-medium text-gray-500 dark:text-neutral-400">{item}</span>
              </>
            ),
          },
        ];
      }
      const Logo = item.logo;
      return [
        i,
        {
          type: 'page',
          href: item.href,
          newWindow: true,
          title: (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex translate-y-[0.25px]',
                  i > 6 && 'rounded-sm bg-gray-500 text-white dark:bg-white/10',
                )}
              >
                <Logo className="size-4 text-[8px]" />
              </div>
              {item.name}
            </div>
          ),
        },
      ];
    }),
  );
