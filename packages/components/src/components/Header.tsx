import React, { useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { SearchBar } from './SearchBar';
import type { IHeaderProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { toggleLockBodyScroll } from '../helpers/modals';
import {
  CaretIcon,
  GuildLogo,
  HamburgerIcon,
  MoonIcon,
  TheGuild,
} from './Icon';
import { Nav } from './Nav';

const renderLinkOptions = (
  href: string,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
) => {
  if (onClick) {
    return {
      href,
      onClick(e: React.MouseEvent<HTMLAnchorElement>) {
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

export const Header: React.FC<IHeaderProps> = ({
  accentColor,
  activeLink,
  themeSwitch,
  ...restProps
}) => {
  const { setDarkTheme } = useThemeContext();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = useCallback(() => {
    setModalOpen((prev) => {
      if (!mobileNavOpen) {
        toggleLockBodyScroll(!prev);
      }
      return !prev;
    });
  }, [mobileNavOpen]);

  const handleNav = useCallback((state: boolean) => {
    toggleLockBodyScroll(state);
    setMobileNavOpen(state);
  }, []);

  const links = useMemo(
    () => [
      { label: 'Our Services', title: 'View our services', href: '/services' },
      {
        label: 'Platform',
        title: 'View our projects',
        href: '/open-source',
        onClick: handleModal,
      },
      { label: 'Blog', title: 'Read our blog', href: '/blog' },
      { label: 'About Us', title: 'Learn more about us', href: '/about-us' },
    ],
    [handleModal]
  );

  const onLinkClick = restProps.linkProps?.onClick;

  return (
    <header
      className="bg-white py-2.5 px-3 font-default dark:bg-gray-900 md:py-4"
      {...restProps.wrapperProps}
    >
      <div
        className="flex justify-between container-max"
        {...restProps.containerProps}
      >
        <button
          className="text-gray-500 transition hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-400 md:hidden outline-none focus:ring rounded-sm"
          onClick={() => handleNav(true)}
          {...restProps.navOpenButtonProps}
        >
          <HamburgerIcon />
        </button>

        <a
          title="View our website"
          className="flex items-center gap-x-1.5 dark:text-gray-100 outline-none focus:ring rounded-sm"
          {...renderLinkOptions('/', onLinkClick)}
          {...restProps.logoProps}
        >
          <GuildLogo className="md:w-7" />
          <TheGuild className="hidden w-11 md:block" />
        </a>

        <Nav
          isOpen={mobileNavOpen}
          setOpen={setMobileNavOpen}
          {...restProps.navigationProps}
        >
          {links.map((link) => (
            <a
              key={link.label}
              title={link.title}
              className={clsx(
                `mx-auto
                 flex
                 w-max
                 items-center
                 py-3
                 text-center
                 text-base
                 font-medium
                 no-underline
                 transition
                 hover:[color:var(--accentColor)]
                 outline-none
                 focus:ring
                 rounded-sm
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
              {link.onClick && <CaretIcon className="ml-1" />}
            </a>
          ))}
          <SearchBar
            accentColor={accentColor}
            title="Search docs"
            placeholder="Search..."
            className="hidden md:flex"
            {...restProps.searchBarProps}
          />
          {themeSwitch && setDarkTheme && (
            <button
              onClick={() => setDarkTheme((prev) => !prev)}
              className="self-center md:ml-5 outline-none focus:ring rounded-sm"
              {...restProps.themeButtonProps}
            >
              <MoonIcon className="fill-transparent stroke-gray-500 dark:fill-gray-100 dark:stroke-gray-100" />
            </button>
          )}
        </Nav>

        <SearchBar
          accentColor={accentColor}
          title="Search docs"
          placeholder="Search..."
          className="md:hidden"
          {...restProps.searchBarProps}
        />
      </div>
      {/*<HeaderModal*/}
      {/*  title="Products by The Guild"*/}
      {/*  modalOpen={modalOpen}*/}
      {/*  onCancelModal={handleModal}*/}
      {/*  {...restProps.headerModalProps}*/}
      {/*/>*/}
    </header>
  );
};
