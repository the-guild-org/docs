// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { FC, ReactElement, SVGProps } from 'react';
import { clsx } from 'clsx';
import { siteOrigin } from '../constants';
import { GuildLogo, TheGuild } from '../logos';
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

const COMPANY: ILink[] = [
  {
    children: 'About',
    title: 'Learn more about us',
    href: `${siteOrigin}/about-us`,
  },
  {
    children: 'Blog',
    title: 'Read our blog',
    href: `${siteOrigin}/blog`,
  },
  {
    children: 'Newsletter',
    title: 'Newsletter',
    href: `${siteOrigin}/newsletter`,
  },
];

const COMMUNITY: (Omit<ILink, 'children'> & {
  icon: FC<SVGProps<SVGElement>>;
})[] = [
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
    icon: GitHubIcon,
    title: 'Check our GitHub account',
    href: 'https://github.com/the-guild-org',
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
  PRODUCTS.NEXTRA,
  { ...PRODUCTS.SOFA, name: 'GraphQL to REST' },
].map(({ name, href, title }) => ({
  children: name,
  href,
  title,
}));

const classes = {
  title: clsx('mb-2.5 text-lg font-medium text-gray-900 dark:text-gray-100'),
  anchor: clsx('text-gray-500 hover:text-black dark:text-[#b4b5be] hover:dark:text-gray-100'),
};

const renderLinks = (list: ILink[]) => (
  <ul className="m-0 mb-8 list-none p-0 last:mb-0">
    {list.map((link, i) => (
      <li key={i} className="mb-3 last:mb-0">
        <Anchor className={clsx(classes.anchor, 'inline-block text-sm')} {...link} />
      </li>
    ))}
  </ul>
);

export function Footer({ className, resources = [], logo }: IFooterExtendedProps): ReactElement {
  return (
    <footer
      className={clsx(
        'bg-[#fafafa] py-[60px] text-base md:py-[140px] dark:bg-[#0f1114]',
        className,
      )}
    >
      <div className="container max-w-[90rem]">
        <div className="relative flex justify-between gap-10 max-md:flex-col">
          <Anchor className="flex items-center gap-2 self-start" href={`${siteOrigin}/`} {...logo}>
            <GuildLogo className="h-9 w-auto" />
            <TheGuild className="h-7 w-auto" />
          </Anchor>
          <div>
            <h3 className={classes.title}>Products</h3>
            <div className="flex gap-6">{renderLinks(products)}</div>
          </div>
          <div>
            <h3 className={classes.title}>Resources</h3>
            {renderLinks([
              {
                children: 'Press Kit',
                title: 'Press Kit',
                href: `${siteOrigin}/logos`,
              },
              ...resources,
            ])}
          </div>
          <div>
            <h3 className={classes.title}>Company</h3>
            {renderLinks(COMPANY)}
          </div>
          <div className="flex gap-5 items-start text-[#b4b5be]">
            {COMMUNITY.map(({ icon: Icon, ...iconProps }) => (
              <Anchor key={iconProps.title} className={classes.anchor} {...iconProps}>
                <Icon className="h-5 w-auto" />
              </Anchor>
            ))}
          </div>
          <CSAStarLevelOneIcon className="absolute right-0 ml-auto h-[4.5rem] w-auto md:bottom-0" />
        </div>
      </div>
    </footer>
  );
}
