import { ReactElement } from 'react';
import { IFooterProps, ILink } from '../types/components';
import { GuildLogo } from './logos';
import clsx from 'clsx';
import NextLink from 'next/link';

const links: ILink[] = [
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
    children: 'GitHub',
    title: 'See our GitHub profile',
    href: 'https://github.com/the-guild-org',
  },
  {
    children: 'Medium',
    title: 'Read our Medium posts',
    href: 'https://medium.com/the-guild',
  },
  {
    children: 'YouTube',
    title: 'Our Videos',
    href: 'https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
  },
];

export const Footer = ({ sameSite, className, logo }: IFooterProps): ReactElement => {
  const logoOptions = sameSite
    ? { href: '/' }
    : {
        href: 'https://the-guild.dev',
        rel: 'noreferrer',
        target: '_blank',
      };

  return (
    <footer className={clsx('bg-white text-xs text-gray-500 dark:bg-[#111] dark:text-gray-400', className)}>
      <div
        className="
          container
          flex
          flex-col
          flex-wrap
          items-center
          justify-between
          border-t
          border-gray-300
          py-4
          dark:border-gray-800
          md:flex-row
          md:py-5
        "
      >
        <NextLink className="grow" {...logoOptions} {...logo}>
          <GuildLogo className="mx-auto mb-3 transition hover:text-gray-900 dark:hover:text-gray-100 md:mb-0" />
        </NextLink>
        <ul className="m-0 flex list-none flex-wrap p-0">
          {links.map(link => (
            <li
              key={link.href}
              className="
                before:mx-2
                before:first-of-type:hidden
                md:before:content-['•']
              "
            >
              <a
                target="_blank"
                rel="noreferrer"
                className="inline-block no-underline transition hover:text-black hover:dark:text-gray-100"
                {...link}
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
