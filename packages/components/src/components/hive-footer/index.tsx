import { ComponentProps, ReactNode } from 'react';
import { cn } from '../../cn';
import { siteOrigin } from '../../constants';
import { HiveCombinationMark } from '../../logos';
import { FOUR_MAIN_PRODUCTS, SIX_HIGHLIGHTED_PRODUCTS } from '../../products';
import { ILink } from '../../types/components';
import { Anchor } from '../anchor';
import { ContactTextLink } from '../contact-us';
import { __LANDING_WIDTHS_ID } from '../hive-layout-config';
import {
  CSAStarLevelOneIcon,
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from '../icons/index';

const INNER_BOX_WIDTH_STYLE =
  'max-w-[90rem] [body:has(#hive-l-widths)_&]:max-w-[75rem] [body:has(#hive-l-widths)_&]:mx-4';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.assert(
    __LANDING_WIDTHS_ID === 'hive-l-widths',
    '__LANDING_WIDTHS_ID diverged from the className used in HiveFooter.',
  );
}

export type HiveFooterProps = {
  className?: string;
  logo?: ReactNode;
  href?: string;
  description?: string;
  items?: HiveFooterItems;
};

export function HiveFooter({
  className,
  logo = <HiveCombinationMark className="h-8 w-auto" />,
  href = `${siteOrigin}/`,
  description = 'Open-source GraphQL management platform',
  items,
}: HiveFooterProps) {
  items = { ...HiveFooter.DEFAULT_ITEMS, ...items };

  return (
    <footer
      className={cn('relative flex justify-center px-4 pb-6 pt-[72px] xl:px-[120px]', className)}
    >
      <div
        className={cn(
          'grid w-full grid-cols-1 gap-x-6 text-green-800 max-lg:gap-y-16 sm:grid-cols-4 lg:gap-x-8 xl:gap-x-10 dark:text-neutral-400',
          INNER_BOX_WIDTH_STYLE,
        )}
      >
        <div className="max-lg:col-span-full">
          <Anchor
            href={href}
            className="hive-focus -m-1.5 flex rounded p-1.5 text-green-1000 dark:text-white"
          >
            {logo}
          </Anchor>
          <p className="mt-6 lg:mt-8">{description}</p>
        </div>
        <div className="col-span-full grid grid-flow-row grid-cols-2 justify-stretch gap-6 text-sm sm:col-span-4 sm:grid-cols-3 lg:col-span-3 lg:pb-12 lg:text-base">
          <List heading="Products" links={productLinks} />

          <div className="flex flex-col gap-[inherit]">
            <List heading="Developer" links={items.developer} />
            <List heading="Resources" links={items.resources} />
          </div>

          <div className="flex flex-col gap-[inherit]">
            <List heading="Company" links={items.company} />
            {items.links?.map((link, i) => (
              <Anchor
                key={i}
                className="hive-focus -m-2 rounded p-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-100"
                {...link}
              />
            ))}
            <ContactTextLink />
          </div>
          <CSAStarLink className="sm:col-start-[-1] lg:col-start-[-2]" />
        </div>

        <div className="col-span-full flex flex-wrap justify-between gap-x-[inherit] gap-y-8 lg:w-full lg:pb-2 lg:pt-8">
          <div className="flex gap-6 lg:order-1">
            {SOCIAL_ICONS.map(({ icon: Icon, ...iconProps }) => (
              <Anchor
                key={iconProps.title}
                className="hive-focus -m-1 rounded-md p-1 hover:text-blue-700 dark:hover:text-blue-100"
                {...iconProps}
              >
                <Icon className="h-5 w-auto" />
              </Anchor>
            ))}
          </div>
          <p className="text-sm">© {new Date().getFullYear()} The Guild</p>
        </div>
      </div>

      <DecorationArch className="pointer-events-none absolute bottom-0 left-0 hidden mix-blend-multiply lg:block dark:opacity-5 dark:mix-blend-normal" />
    </footer>
  );
}

function List({
  heading,
  links,
  className,
}: {
  heading: string;
  links: ILink[] | undefined;
  className?: string;
}) {
  if (!links?.length) return null;

  return (
    <div className={cn('flex flex-col gap-y-3 text-nowrap lg:gap-y-4', className)}>
      <h3 className="font-medium dark:text-white">{heading}</h3>
      <ul className="contents">
        {links.map((link, i) => (
          <li key={i}>
            <Anchor
              {...link}
              className="hive-focus -m-2 block rounded p-2 hover:text-blue-700 hover:underline dark:hover:text-blue-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface HiveFooterItems {
  developer?: ILink[];
  company?: ILink[];
  resources?: ILink[];
  links?: ILink[];
}

const DEFAULT_ITEMS: HiveFooterItems = {
  developer: [
    {
      children: 'Documentation',
      title: 'Read the docs',
      href: '/docs',
    },
    {
      children: 'Hive Status',
      title: 'Check Hive status',
      href: 'https://status.graphql-hive.com/',
    },
    {
      children: 'Hive Updates',
      title: 'Read most recent developments from Hive',
      href: 'https://the-guild.dev/graphql/hive/product-updates',
    },
    {
      children: 'Blog',
      title: 'Read our blog',
      href: 'https://the-guild.dev/blog',
    },
  ],
  company: [
    {
      children: 'About',
      title: 'Learn more about us',
      href: 'https://the-guild.dev/about-us',
    },
    {
      children: 'Brand Assets',
      title: 'Brand Assets',
      href: 'https://the-guild.dev/logos',
    },
    {
      children: 'Newsletter',
      title: 'Newsletter',
      href: 'https://the-guild.dev/newsletter',
    },
  ],
  resources: [],
  links: [
    {
      children: 'OSS Friends',
      href: 'https://the-guild.dev/graphql/hive/oss-friends',
    },
    {
      children: 'Pricing',
      href: 'https://the-guild.dev/graphql/hive/pricing',
    },
  ],
};

HiveFooter.DEFAULT_ITEMS = DEFAULT_ITEMS;

interface SocialLink extends Omit<ILink, 'children'> {
  icon: (props: ComponentProps<'svg'>) => ReactNode;
}

const SOCIAL_ICONS: SocialLink[] = [
  {
    icon: GitHubIcon,
    title: 'Check our GitHub account',
    href: 'https://github.com/the-guild-org',
  },
  {
    icon: TwitterIcon,
    title: 'Visit our Twitter',
    href: 'https://twitter.com/TheGuildDev',
  },
  {
    icon: LinkedInIcon,
    title: 'Visit our LinkedIn',
    href: 'https://linkedin.com/company/the-guild-software',
  },
  {
    icon: DiscordIcon,
    title: 'Reach us on Discord',
    href: 'https://discord.com/invite/xud7bH9',
  },
  {
    icon: YouTubeIcon,
    title: 'Watch Our Videos',
    href: 'https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
  },
];

const productLinks = [...FOUR_MAIN_PRODUCTS, ...SIX_HIGHLIGHTED_PRODUCTS].map(
  ({ name, href, title }) => ({
    children: name,
    href,
    title,
  }),
);

function DecorationArch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={360}
      height={360}
      viewBox="0 0 360 360"
      fill="none"
      {...props}
    >
      <path
        d="M360 159.793a39.152 39.152 0 00-11.468-27.672l-56.99-56.99-6.673-6.673-56.99-56.99A39.153 39.153 0 00200.207 0H0v75.131h226.157c32.428 0 58.712 26.284 58.712 58.712V360H360V159.793z"
        fill="url(#paint0_linear_711_2541)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_711_2541"
          x1={180}
          y1={-0.000_007_868_05}
          x2={180}
          y2={360}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C1D3D7" />
          <stop offset={1} stopColor="#86B6C1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CSAStarLink({ className }: { className?: string }) {
  return (
    <a
      href="https://cloudsecurityalliance.org/star/registry/software-products-guild-ltd-the-guild/services/graphql-hive"
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'hive-focus w-fit rounded-full focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--nextra-bg))]',
        className,
      )}
    >
      <CSAStarLevelOneIcon className="size-20 lg:size-[120px] dark:opacity-95" />
    </a>
  );
}
