import { ComponentProps, ReactElement } from 'react';
import { clsx } from 'clsx';
import { HiveCombinationMark } from '../logos';
import { PRODUCTS } from '../products';
import { IFooterExtendedProps, ILink } from '../types/components';
import { Anchor } from './anchor';
import {
  CSAStarLevelOneIcon,
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from './icons';

export interface HiveFooterProps extends IFooterExtendedProps {}

// 1. Products ✅
// 2. Developer
// - Documentation
// - Hive Status
// - Hive Updates
// - Blog

// 3. Enterprise
// - Customer Stories
// - Why GraphQL
// - Professional Services
// - Commitment to Security

// 4. Company
// - About Us
// - Brand Assets

// 5. Pricing

// 6. Contact Us

export function HiveFooter({ className, logo, resources = [], sameSite }: HiveFooterProps) {
  return (
    <footer
      className={clsx(
        'relative grid grid-cols-1 gap-x-6 gap-y-12 bg-white px-4 py-6 text-green-800 lg:grid-cols-4 lg:px-[120px]',
        className,
      )}
    >
      <div className="lg:pt-[72px]">
        <Anchor href="https://the-guild.dev" sameSite={sameSite} {...logo}>
          <HiveCombinationMark className="h-8 w-auto text-green-1000" />
        </Anchor>
        <p className="mt-6 lg:mt-8">Open-source GraphQL management platform</p>
      </div>
      <div className="grid grid-cols-2 justify-stretch gap-6 text-sm lg:col-span-3 lg:grid-cols-subgrid lg:pb-12 lg:pt-[72px] lg:text-base">
        <List heading="Products" links={products} />
        <List
          heading="Resources"
          links={[
            {
              children: 'Press Kit',
              title: 'Press Kit',
              href: 'https://the-guild.dev/logos',
            },
            ...resources,
          ]}
        />
        <List heading="Company" links={COMPANY} />
        <CSAStarLevelOneIcon className="size-20 lg:col-start-3 lg:size-[120px] lg:translate-y-[calc(-100%-1.5rem)]" />
      </div>
      <div className="col-span-full flex flex-row flex-wrap justify-between gap-[inherit] lg:w-full lg:pb-2 lg:pt-8">
        <div className="flex gap-6 lg:order-1">
          {COMMUNITY.map(({ icon: Icon, ...iconProps }) => (
            <Anchor key={iconProps.title} {...iconProps}>
              <Icon className="h-5 w-auto" />
            </Anchor>
          ))}
        </div>
        <p className="text-sm">© 2024 The Guild</p>
      </div>
      <DecorationArch className="pointer-events-none absolute bottom-0 left-0 hidden lg:block" />
    </footer>
  );
}

function List({ heading, links }: { heading: string; links: ILink[] }) {
  return (
    <div className="flex flex-col gap-y-3 text-nowrap lg:gap-y-4">
      <h3 className="font-medium">{heading}</h3>
      <ul className="contents">
        {links.map(link => (
          <li key={link.href}>
            <Anchor {...link} className="-m-2 block p-2 hover:underline" />
          </li>
        ))}
      </ul>
    </div>
  );
}

const COMPANY: ILink[] = [
  {
    children: 'About',
    title: 'Learn more about us',
    href: 'https://the-guild.dev/about-us',
  },
  {
    children: 'Blog',
    title: 'Read our blog',
    href: 'https://the-guild.dev/blog',
  },
  {
    children: 'Newsletter',
    title: 'Newsletter',
    href: 'https://the-guild.dev/newsletter',
  },
];

const COMMUNITY: (Omit<ILink, 'children'> & {
  icon: (props: ComponentProps<'svg'>) => ReactElement;
})[] = [
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

const products = [
  PRODUCTS.HIVE,
  PRODUCTS.MESH,
  PRODUCTS.YOGA,
  PRODUCTS.CODEGEN,
  PRODUCTS.INSPECTOR,
  PRODUCTS.SCALARS,
  PRODUCTS.ENVELOP,
  PRODUCTS.ESLINT,
  PRODUCTS.SOFA,
  { ...PRODUCTS.SOFA, name: 'GraphQL to REST' },
  // TODO: All libraries, go to /explore page
].map(({ name, href, title }) => ({
  children: name,
  href,
  title,
}));

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
          y1={-0.00000786805}
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
