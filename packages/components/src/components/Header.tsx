import { useState, useMemo, ReactElement, MouseEventHandler, MouseEvent } from 'react';
import clsx from 'clsx';
import { Root, Trigger, Indicator, Viewport, List, Item, Link, Content } from '@radix-ui/react-navigation-menu';
import { SearchBar } from './SearchBar';
import { IHeaderProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { toggleLockBodyScroll } from '../helpers/modals';
import { CaretIcon, HamburgerIcon, MoonIcon } from './icons';
import { GuildLogo, TheGuild } from './logos';
import { Nav } from './Nav';
import { SolutionsMenu } from './SolutionsMenu';
import { EcosystemList } from './EcosystemList';
import { useWindowSize } from '../helpers/hooks';

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
  ...restProps
}: IHeaderProps): ReactElement => {
  const { setDarkTheme } = useThemeContext();
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

  const onLinkClick = restProps.linkProps?.onClick;

  return (
    <header className="bg-white py-2.5 px-3 font-default dark:bg-gray-900 md:py-4" {...restProps.wrapperProps}>
      <div className="container flex max-w-[90rem] items-center justify-between" {...restProps.containerProps}>
        <button
          className="rounded-sm text-gray-500 outline-none transition hover:text-gray-400 focus:ring dark:text-gray-200 dark:hover:text-gray-400 md:hidden"
          onClick={() => handleNav(true)}
          {...restProps.navOpenButtonProps}
        >
          <HamburgerIcon />
        </button>

        {/* TODO: find a way to remove this tag otherwise header not centered on mobile */}
        <div className="md:absolute" />

        <a
          title="View our website"
          className="flex items-center gap-x-1.5 rounded-sm outline-none focus:ring dark:text-gray-100"
          {...renderLinkOptions('/', onLinkClick)}
          {...restProps.logoProps}
        >
          <GuildLogo className="md:w-7" />
          <TheGuild className="hidden w-11 md:block" />
        </a>

        <Root asChild>
          <List>
            <Viewport className="absolute top-10 right-0 z-50" />
            <Nav isOpen={mobileNavOpen} setOpen={setMobileNavOpen} {...restProps.navigationProps}>
              {links.map(link => {
                const linkEl = (
                  <a
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
                        font-medium
                        no-underline
                        outline-none
                        transition
                        hover:[color:var(--accentColor)]
                        focus:ring
                        sm:py-5
                        sm:text-lg
                        md:mx-2.5
                        md:py-0
                        md:text-left
                        md:text-xs`,
                      activeLink?.includes(link.href)
                        ? `
                        relative
                        text-black
                        after:absolute
                        after:bottom-0
                        after:h-0.5
                        after:w-full
                        after:rounded
                        after:bg-black
                        after:content-['']
                        dark:text-gray-50
                        after:dark:bg-white
                        after:sm:bottom-2.5
                        after:md:-bottom-2`
                        : 'text-gray-500 dark:text-gray-400'
                    )}
                    style={{ '--accentColor': accentColor }}
                    {...restProps.linkProps}
                    {...renderLinkOptions(link.href, link.onClick || onLinkClick)}
                  >
                    {link.label}
                    {(link.onClick || link.menu) && (
                      <CaretIcon
                        className="
                          ml-1
                          transition-transform
                          duration-200
                          [[data-state=open]_>_&]:rotate-180
                        "
                      />
                    )}
                  </a>
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
                {...restProps.searchBarProps}
              />
              {themeSwitch && setDarkTheme && (
                <button
                  onClick={() => setDarkTheme(prev => !prev)}
                  className="self-center rounded-sm outline-none focus:ring md:ml-5"
                  {...restProps.themeButtonProps}
                >
                  <MoonIcon className="fill-transparent stroke-gray-500 dark:fill-gray-100 dark:stroke-gray-100" />
                </button>
              )}
            </Nav>
            <Indicator className="absolute top-9 z-50 flex h-2.5 justify-center">
              <div className="h-3 w-3 rotate-45 rounded-t-sm bg-white dark:bg-gray-800" />
            </Indicator>
          </List>
        </Root>

        {!disableSearch && (
          <SearchBar
            accentColor={accentColor}
            title="Search docs"
            placeholder="Search…"
            className="md:hidden"
            {...restProps.searchBarProps}
          />
        )}
      </div>
    </header>
  );
};
