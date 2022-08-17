import { useState, useMemo, ReactElement, MouseEventHandler, MouseEvent, forwardRef } from 'react';
import clsx from 'clsx';
import { Root, Trigger, Indicator, Viewport, List, Item, Link, Content } from '@radix-ui/react-navigation-menu';
import { useTheme } from 'next-themes';
import { SearchBar } from './search-bar';
import { IHeaderProps } from '../types/components';
import { toggleLockBodyScroll } from '../helpers/modals';
import { CaretIcon, HamburgerIcon, MoonIcon } from './icons';
import { GuildLogo, TheGuild } from './logos';
import { Nav } from './nav';
import { SolutionsMenu } from './solutions-menu';
import { EcosystemList } from './ecosystem-list';
import { useWindowSize } from '../helpers/hooks';
import { Anchor } from './anchor';

const renderLinkOptions = (href: string, onClick?: MouseEventHandler<HTMLAnchorElement>) => {
  if (onClick) {
    return {
      href,
      onClick(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        onClick(e);
      },
    };
  }

  return {
    href: `https://the-guild.dev${href}`,
    target: '_blank',
    rel: 'noreferrer',
  };
};

export const Header = ({
  accentColor,
  activeLink,
  themeSwitch,
  transformLinks = links => links,
  disableSearch = false,
  className,
  searchBarProps,
}: IHeaderProps): ReactElement => {
  const { theme, setTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const shouldUseMenus = useMemo(
    () => windowWidth && windowHeight && windowHeight > 400 && windowWidth > 800,
    [windowHeight, windowWidth]
  );

  const handleNav = (state: boolean) => {
    toggleLockBodyScroll(state);
    setMobileNavOpen(state);
  };

  const links = transformLinks([
    {
      label: 'Solutions',
      title: '',
      href: '/solutions',
      menu: <SolutionsMenu />,
    },
    {
      label: 'Ecosystem',
      title: 'View our projects',
      href: '/open-source',
      menu: <EcosystemList />,
    },
    {
      label: 'Blog',
      title: 'Read our blog',
      href: '/blog',
    },
    {
      label: 'Our Services',
      title: 'View our services',
      href: '/services',
    },
    {
      label: 'About Us',
      title: 'Learn more about us',
      href: '/about-us',
    },
  ]);

  return (
    <header className={clsx('bg-white py-2.5 dark:bg-[#111] md:py-3.5', className)}>
      <div
        className="
          container
          flex
          max-w-[90rem]
          items-center
          justify-between
          pl-[max(env(safe-area-inset-left),1.5rem)]
          pr-[max(env(safe-area-inset-right),1.5rem)]
        "
      >
        <button
          className="rounded-sm text-gray-500 outline-none transition hover:text-gray-400 focus:ring dark:text-gray-200 dark:hover:text-gray-400 md:hidden"
          onClick={() => handleNav(true)}
        >
          <HamburgerIcon />
        </button>

        {/* TODO: find a way to remove this tag otherwise header not centered on mobile */}
        <div className="md:absolute" />

        <a
          title="View our website"
          className="flex items-center gap-x-1.5 rounded-sm text-black outline-none hover:opacity-75 focus:ring dark:text-gray-100"
          {...renderLinkOptions('/')}
        >
          <GuildLogo className="h-9 w-9" />
          <TheGuild className="hidden w-11 md:block" />
        </a>

        <Root asChild>
          <List>
            <Viewport className="absolute top-10 right-0 z-50" />
            <Nav isOpen={mobileNavOpen} setOpen={setMobileNavOpen} className="md:gap-4">
              {links.map(link => {
                const linkEl = (
                  <Anchor
                    key={link.label}
                    title={link.title}
                    className={clsx(
                      `mx-auto
                        flex
                        w-max
                        items-center
                        rounded-sm
                        py-3
                        text-center
                        text-base
                        no-underline
                        outline-none
                        hover:text-gray-800
                        focus:ring
                        dark:hover:text-gray-200
                        sm:py-5
                        sm:text-lg
                        md:py-0
                        md:text-left
                        md:text-sm`,
                      activeLink?.includes(link.href)
                        ? `
                        relative
                        font-medium
                        text-black
                        after:absolute
                        after:bottom-0
                        after:h-0.5
                        after:w-full
                        after:rounded
                        after:bg-black
                        after:content-['']
                        dark:text-[#f3f4f6]
                        after:dark:bg-white
                        after:sm:bottom-2.5
                        after:md:-bottom-2`
                        : 'text-gray-600 dark:text-gray-400'
                    )}
                    style={{ '--accentColor': accentColor }}
                    {...renderLinkOptions(link.href, link.onClick)}
                  >
                    {link.label}
                    {(link.onClick || link.menu) && (
                      <CaretIcon
                        className="
                          ml-2
                          transition-transform
                          duration-200
                          [[data-state=open]_>_&]:rotate-180
                        "
                      />
                    )}
                  </Anchor>
                );

                return link.menu && shouldUseMenus ? (
                  <Item key={link.label} value={link.label}>
                    <Trigger asChild>{linkEl}</Trigger>
                    <Content asChild>{link.menu}</Content>
                  </Item>
                ) : (
                  <Item key={link.label}>
                    <Link asChild>{linkEl}</Link>
                  </Item>
                );
              })}

              <SearchBar
                accentColor={accentColor}
                title="Search docs"
                placeholder="Search…"
                className="hidden md:flex"
                {...searchBarProps}
              />

              {themeSwitch && (
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="mr-1 self-center rounded-sm p-2 outline-none focus:ring"
                >
                  <MoonIcon className="fill-transparent stroke-gray-500 dark:fill-gray-100 dark:stroke-gray-100" />
                </button>
              )}
            </Nav>

            <Indicator className="absolute top-9 z-50 flex h-2.5 justify-center">
              <div className="h-3 w-3 rotate-45 rounded-t-sm bg-white dark:bg-neutral-800" />
            </Indicator>
          </List>
        </Root>

        {!disableSearch && (
          <SearchBar
            accentColor={accentColor}
            title="Search docs"
            placeholder="Search…"
            className="md:hidden"
            {...searchBarProps}
          />
        )}
      </div>
    </header>
  );
};
