import { ReactElement, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'nextra-theme-docs';
import {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Root,
  Trigger,
  Viewport,
} from '@radix-ui/react-navigation-menu';
import { useWindowSize } from '../helpers/hooks';
import { GuildLogo, TheGuild } from '../logos';
import { IHeaderProps } from '../types/components';
import { Anchor } from './anchor';
import { EcosystemList } from './ecosystem-list';
import { GraphqlConfLogoHoriz } from './graphql-conf-logo-horiz';
import { CaretIcon, HamburgerIcon, MoonIcon } from './icons';
import { Nav } from './nav';
import { SearchBar } from './search-bar';
import { SolutionsMenu } from './solutions-menu';
import graphqlConfBg from '../static/conf/graphql-conf-bg.png';

// TODO: fails during build (no matching export in for import "default")
// import graphqlConfLogo from '../static/conf/graphql-conf-logo.svg';

export const Header = ({
  accentColor,
  activeLink,
  themeSwitch = true,
  transformLinks = links => links,
  search = true,
  className,
  sameSite,
  searchBarProps,
}: IHeaderProps): ReactElement => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const shouldUseMenus = useMemo(
    () => windowWidth && windowHeight && windowHeight > 400 && windowWidth > 800,
    [windowHeight, windowWidth],
  );

  const toggleNav = useCallback(() => {
    setMobileNavOpen(prev => !prev);
  }, []);

  const links = transformLinks([
    {
      label: 'Solutions',
      title: '',
      href: 'https://the-guild.dev/solutions',
      menu: <SolutionsMenu />,
    },
    {
      label: 'Ecosystem',
      title: 'View our projects',
      href: 'https://the-guild.dev/open-source',
      menu: <EcosystemList />,
    },
    {
      label: 'Blog',
      title: 'Read our blog',
      href: 'https://the-guild.dev/blog',
    },
    {
      label: 'Our Services',
      title: 'View our services',
      href: 'https://the-guild.dev/services',
    },
    {
      label: 'About Us',
      title: 'Learn more about us',
      href: 'https://the-guild.dev/about-us',
    },
    {
      label: 'Contact Us',
      title: 'Share your excitement with us',
      href: 'https://the-guild.dev/contact',
    },
  ]);

  return (
    <>
      <div className="block">
        <div className="flex flex-col items-center justify-center bg-[#48224e] p-2 text-xs font-medium text-white sm:flex-row">
          Catch the highlights of GraphQL 2023!
          <Anchor
            href="https://graphql.org/conf/"
            className="rounded-md p-1 text-xs text-white underline"
          >
            Recordings available here.
          </Anchor>
        </div>
      </div>
      <header
        className={clsx(
          'bg-white py-2.5 dark:bg-[#111] md:py-3.5',
          !sameSite && 'max-md:hidden',
          className,
        )}
      >
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
            className="rounded-sm text-gray-500 outline-none transition hover:text-gray-400 focus-visible:ring dark:text-gray-200 dark:hover:text-gray-400 md:hidden"
            onClick={toggleNav}
          >
            <HamburgerIcon />
          </button>

          {/* TODO: find a way to remove this tag otherwise header not centered on mobile */}
          <div className="md:absolute" />

          <Anchor
            title="View our website"
            className="flex items-center gap-x-1.5 text-black hover:opacity-75 dark:text-gray-100"
            href="https://the-guild.dev"
            sameSite={sameSite}
          >
            <GuildLogo className="h-9 w-9" />
            <TheGuild className="hidden w-11 md:block" />
          </Anchor>

          <Root asChild>
            <List>
              <Viewport className="absolute right-0 top-10 z-50" />
              <Nav isOpen={mobileNavOpen} setOpen={setMobileNavOpen} className="gap-2">
                {links.map(({ label, menu, ...link }) => {
                  const linkEl = (
                    <Anchor
                      onClick={sameSite && mobileNavOpen ? toggleNav : undefined}
                      {...link}
                      className={clsx(
                        `mx-auto
                        flex
                        w-max
                        items-center
                        gap-2
                        p-1
                        text-base
                        hover:text-gray-800
                        dark:hover:text-gray-200
                        sm:text-lg
                        md:text-left
                        md:text-sm`,
                        activeLink && link.href.includes(activeLink)
                          ? 'text-gray-800 dark:text-gray-200'
                          : 'text-gray-600 dark:text-gray-400',
                      )}
                      style={{ '--accentColor': accentColor }}
                      sameSite={sameSite}
                    >
                      {label}
                      {menu && (
                        <CaretIcon
                          className="
                          transition-transform
                          duration-200
                          [[data-state=open]_>_&]:rotate-180
                        "
                        />
                      )}
                    </Anchor>
                  );

                  return (
                    <Item key={label} value={label}>
                      {menu && shouldUseMenus ? (
                        <>
                          <Trigger asChild>{linkEl}</Trigger>
                          <Content asChild>{menu}</Content>
                        </>
                      ) : (
                        <Link asChild>{linkEl}</Link>
                      )}
                    </Item>
                  );
                })}

                {search && (
                  <SearchBar
                    accentColor={accentColor}
                    title="Search docs"
                    placeholder="Search…"
                    className="hidden md:flex"
                    {...searchBarProps}
                  />
                )}

                {themeSwitch && (
                  <button
                    onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
                    className="mr-1 self-center rounded-sm p-2 outline-none focus-visible:ring"
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

          {search ? (
            <SearchBar
              accentColor={accentColor}
              title="Search docs"
              placeholder="Search…"
              className="md:hidden"
              {...searchBarProps}
            />
          ) : (
            <span className="md:absolute" />
          )}
        </div>
      </header>
    </>
  );
};
