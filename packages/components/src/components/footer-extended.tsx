import { ReactElement, useCallback } from 'react';
import clsx from 'clsx';
import { IFooterExtendedProps, ILink } from '../types/components';
import { Image } from './image';
import { PRODUCTS } from '../products';
import { GuildLogo, TheGuild } from './logos';
import { Anchor } from './anchor';
import csaStar from '../static/illustrations/csa-star-level-1-badge.png';

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
  {
    children: 'Open Source',
    title: 'Open Source',
    href: 'https://the-guild.dev/open-source',
  },
  {
    children: 'Services',
    title: 'services',
    href: 'https://the-guild.dev/services',
  },
  {
    children: 'GitHub',
    title: 'Check our GitHub account',
    href: 'https://github.com/the-guild-org',
  },
];

const COMMUNITY: ILink[] = [
  {
    children: 'Twitter',
    title: 'Visit our Twitter',
    href: 'https://twitter.com/TheGuildDev',
  },
  {
    children: 'LinkedIn',
    title: 'Visit our LinkedIn',
    href: 'https://linkedin.com/company/the-guild-software',
  },
  {
    children: 'Discord',
    title: 'Reach us on Discord',
    href: 'https://discord.com/invite/xud7bH9',
  },
  {
    children: 'Medium',
    title: 'Read our Medium posts',
    href: 'https://medium.com/the-guild',
  },
  {
    children: 'YouTube',
    title: 'Watch Our Videos',
    href: 'https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
  },
];

const products = Object.values(PRODUCTS);
const limitProductsTo = Math.ceil(products.length / 2);

const PRODUCTS_COLUMN_1 = products.slice(0, limitProductsTo).map(({ name, href, title }) => ({
  children: name,
  href,
  title,
}));
const PRODUCTS_COLUMN_2 = products.slice(limitProductsTo).map(({ name, href, title }) => ({
  children: name,
  href,
  title,
}));

const classes = {
  title: clsx('mb-3 text-xs font-semibold text-gray-900 dark:text-gray-100'),
};

export const FooterExtended = ({
  className,
  sameSite,
  resources,
  logo,
}: IFooterExtendedProps): ReactElement => {
  const allResources: ILink[] = [
    {
      children: 'Press Kit',
      title: 'Press Kit',
      href: '/logos',
    },
    ...(resources || []),
  ];
  const renderLinks = useCallback(
    (list: ILink[]) => (
      <ul className="m-0 mb-8 list-none p-0 last:mb-0">
        {list.map(link => (
          <li key={link.href} className="mb-3 last:mb-0">
            <Anchor
              className="
                inline-block
                text-sm
                font-medium
                text-gray-500
                hover:text-black
                dark:text-gray-400
                hover:dark:text-gray-100
              "
              {...link}
            />
          </li>
        ))}
      </ul>
    ),
    [],
  );

  return (
    <footer className={clsx('bg-white text-xs dark:bg-[#111]', className)}>
      <div className="container max-w-[90rem] border-t border-gray-300 dark:border-gray-800">
        <div className="my-8 flex flex-col gap-6 pt-2 pb-4 lg:flex-row">
          <div className="lg:w-full">
            <h3 className={classes.title}>PRODUCTS</h3>
            <div className="flex gap-6">
              <div className="w-1/2">{renderLinks(PRODUCTS_COLUMN_1)}</div>
              <div className="w-1/2">{renderLinks(PRODUCTS_COLUMN_2)}</div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-6">
            <div className="w-1/2">
              <h3 className={classes.title}>RESOURCES</h3>
              {renderLinks(allResources)}
              <h3 className={classes.title}>COMPANY</h3>
              {renderLinks(COMPANY)}
            </div>
            <div className="w-1/2">
              <h3 className={classes.title}>COMMUNITY</h3>
              {renderLinks(COMMUNITY)}
              <Image
                src={csaStar}
                alt="Cloud Security Alliance Star Level One Badge"
                title="Cloud Security Alliance Star Level One Badge"
                width="72"
                placeholder="empty"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 py-4 dark:border-gray-800">
          <Anchor
            className="flex items-center gap-x-1.5 text-gray-500 hover:text-black hover:dark:text-gray-100"
            href="https://the-guild.dev"
            sameSite={sameSite}
            {...logo}
          >
            <GuildLogo className="w-7" />
            <TheGuild className="w-10" />
          </Anchor>
        </div>
      </div>
    </footer>
  );
};
