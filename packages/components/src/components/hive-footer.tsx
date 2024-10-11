import { ComponentProps, ReactNode } from 'react';
import { cn } from '../cn';
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

export function HiveFooter({ className, logo, resources = [], sameSite }: HiveFooterProps) {
  return (
    <footer className={cn('relative flex justify-center px-4 py-6 xl:px-[120px]', className)}>
      <div className="mx-4 grid w-full max-w-[75rem] grid-cols-1 gap-x-6 text-green-800 max-lg:gap-y-16 sm:grid-cols-4 lg:gap-x-8 xl:gap-x-10 dark:text-neutral-400">
        <div className="max-lg:col-span-full">
          <Anchor href="https://the-guild.dev" sameSite={sameSite} {...logo}>
            <HiveCombinationMark className="h-8 w-auto text-green-1000 dark:text-white" />
          </Anchor>
          <p className="mt-6 lg:mt-8">Open-source GraphQL management platform</p>
        </div>
        <div className="col-span-full grid grid-flow-row grid-cols-2 justify-stretch gap-6 text-sm sm:col-span-4 sm:grid-cols-3 lg:col-span-3 lg:pb-12 lg:text-base">
          <List heading="Products" links={products} />
          <div className="flex flex-col gap-[inherit]">
            <List heading="Developer" links={DEVELOPER} />
            {ENTERPRISE.length > 0 && <List heading="Enterprise" links={ENTERPRISE} />}
            {resources.length > 0 && <List heading="Resources" links={resources} />}
          </div>
          <div className="flex flex-col gap-[inherit]">
            <List heading="Company" links={COMPANY} />
            <a
              href="https://the-guild.dev/graphql/hive#pricing"
              className="-m-2 p-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-100"
            >
              Pricing
            </a>
            <a
              className="-m-2 p-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-100"
              href="https://the-guild.dev/contact"
              onClick={event => {
                window.$crisp?.push(['do', 'chat:open']);
                event.preventDefault();
              }}
            >
              Contact Us
            </a>
          </div>
          <CSAStarLink className="sm:col-start-[-1] lg:col-start-[-2]" />
        </div>
        <div className="col-span-full flex flex-row flex-wrap justify-between gap-x-[inherit] gap-y-8 lg:w-full lg:pb-2 lg:pt-8">
          <div className="flex gap-6 lg:order-1">
            {COMMUNITY.map(({ icon: Icon, ...iconProps }) => (
              <Anchor key={iconProps.title} {...iconProps}>
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
  links: ILink[];
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-y-3 text-nowrap lg:gap-y-4', className)}>
      <h3 className="font-medium dark:text-white">{heading}</h3>
      <ul className="contents">
        {links.map((link, i) => (
          <li key={i}>
            <Anchor
              {...link}
              className="-m-2 block p-2 hover:text-blue-700 hover:underline dark:hover:text-blue-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const ENTERPRISE: ILink[] = [
  //   {
  //     children: 'Consumer Stories',
  //     href: '#TODO!',
  //   },
  //   {
  //     children: 'Why GraphQL',
  //     href: '#TODO!',
  //   },
  //   {
  //     children: 'Professional Services',
  //     href: '#TODO!',
  //   },
  //   {
  //     children: 'Commitment to Security',
  //     href: '#TODO!',
  //   },
];

const DEVELOPER: ILink[] = [
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
    title: 'Read most recent developments from GraphQL Hive',
    href: 'https://the-guild.dev/graphql/hive/product-updates',
  },
  {
    children: 'Blog',
    title: 'Read our blog',
    href: 'https://the-guild.dev/blog',
  },
];

const COMPANY: ILink[] = [
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
];

const COMMUNITY: (Omit<ILink, 'children'> & {
  icon: (props: ComponentProps<'svg'>) => ReactNode;
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
        'w-fit rounded-full focus-visible:ring-2 focus-visible:ring-offset-4',
        className,
      )}
    >
      <CSAStarLevelOneIcon className="size-20 lg:size-[120px] dark:opacity-95" />
    </a>
  );
}
