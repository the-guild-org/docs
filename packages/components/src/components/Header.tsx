import React, { useState } from 'react';

import { HeaderModal } from './HeaderModal';
import { SearchBar } from './SearchBar';

import {
  HeaderWrapper,
  HeaderContainer,
  HeaderNav,
  HeaderLink,
  HeaderIcon,
  HeaderControls,
  HeaderSide,
  HeaderLogo,
} from './Header.styles';

import { IHeaderProps } from './types';
import { ThemeContext } from '../helpers/theme';
import { headerThemedIcons, logoThemedIcons } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';

export const Header: React.FC<IHeaderProps> = ({
  accentColor,
  activeLink,
  sameSite,
  themeSwitch,
}) => {
  const { isDarkTheme, setDarkTheme } = React.useContext(ThemeContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const icons = headerThemedIcons(isDarkTheme || false);
  const logos = logoThemedIcons(isDarkTheme || false);

  const handleModal = (state: boolean) => {
    !mobileNavOpen && toggleLockBodyScroll(state);
    setModalOpen(state);
  };

  const handleNav = (state: boolean) => {
    toggleLockBodyScroll(state);
    setMobileNavOpen(state);
  };

  const renderLinkOptions = (
    href: string,
    sameSite?: boolean,
    clickEvent?: () => void
  ) => {
    const rootURL = 'https://the-guild.dev';
    return clickEvent
      ? {
          href: '',
          onClick: (e: React.SyntheticEvent) => {
            e.preventDefault();
            clickEvent();
          },
        }
      : {
          rel: !sameSite ? 'noopener noreferrer' : undefined,
          target: !sameSite ? '_blank' : undefined,
          href: sameSite ? href : `${rootURL}${href}`,
        };
  };

  const links = [
    {
      label: 'Our Services',
      title: 'View our services',
      href: '/services',
      active: false,
    },
    {
      label: 'Platform',
      title: 'View our projects',
      href: '/open-source',
      active: false,
      clickEvent: () => handleModal(true),
    },
    {
      label: 'Blog',
      title: 'Read our blog',
      href: '/blog',
      active: false,
    },
    {
      label: 'About Us',
      title: 'Learn more about us',
      href: '/about-us',
      active: false,
    },
  ];

  links.map((link) => (link.active = activeLink.includes(link.href)));

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderSide>
          <HeaderIcon onClick={() => handleNav(true)}>
            <img src={icons.menu} height="24" width="24" alt="Search icon" />
          </HeaderIcon>
        </HeaderSide>

        <HeaderLogo
          {...renderLinkOptions('/', sameSite)}
          title="View our website"
        >
          <img src={logos.logoFull} height="30" alt="The Guild Logo" />
          <img src={logos.logoMono} height="38" alt="The Guild Monogram" />
        </HeaderLogo>

        <HeaderNav isModalOpen={mobileNavOpen}>
          <HeaderIcon iconType="close" onClick={() => handleNav(false)}>
            <img
              src={icons.close}
              height="24"
              width="24"
              alt="Menu close icon"
            />
          </HeaderIcon>
          {links.map((link) => (
            <HeaderLink
              key={link.label}
              title={link.title}
              accentColor={accentColor}
              isActiveLink={link.active}
              {...renderLinkOptions(link.href, sameSite, link.clickEvent)}
            >
              {link.label}
              {link.clickEvent && <img src={icons.caret} alt="Link icon" />}
            </HeaderLink>
          ))}
          <HeaderControls>
            <SearchBar
              accentColor={accentColor}
              title="Search docs"
              placeholder="Search..."
            />
            {themeSwitch && setDarkTheme && (
              <HeaderIcon
                iconType="theme"
                onClick={() => setDarkTheme((state: boolean) => !state)}
              >
                <img
                  src={icons.themeToggle}
                  height="16"
                  width="16"
                  alt="Theme toggle icon"
                />
              </HeaderIcon>
            )}
          </HeaderControls>
        </HeaderNav>

        <HeaderSide>
          <SearchBar
            accentColor={accentColor}
            title="Search docs"
            placeholder="Search..."
          />
        </HeaderSide>
      </HeaderContainer>
      <HeaderModal
        title="Products by The Guild"
        modalOpen={modalOpen}
        onCancelModal={() => handleModal(false)}
      />
    </HeaderWrapper>
  );
};
