import React, { useEffect, useState } from 'react';

import { HeaderModal } from './HeaderModal';
import {
  HeaderGlobalStyles,
  HeaderWrapper,
  HeaderContainer,
  HeaderNav,
  HeaderLink,
  HeaderIcon,
  HeaderControls,
  HeaderSide,
  HeaderLogo
} from './Header.styles';
import { headerThemedIcons } from './Header.assets';
import { IHeaderProps } from './types';
import { useDarkTheme } from '../helpers/theme';
import { toggleBodyModalClass } from '../helpers/modals';

export const Header: React.FC<IHeaderProps> = (props) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { darkTheme, setDarkTheme } = useDarkTheme();

  const toggleModal = (state: boolean) => {
    !mobileNavOpen && toggleBodyModalClass(state);
    setModalOpen(state);
  }

  const toggleMobileNavigation = (state: boolean) => {
    toggleBodyModalClass(state);
    setMobileNavOpen(state);
  }

  const renderLinkOptions = (href: string, sameSite: boolean, toggleModal?: Function) => {
    const rootURL = 'https://the-guild.dev';
    return toggleModal ? {
      href: href,
      hasModal: true,
      onClick: (e: React.SyntheticEvent) => {
        e.preventDefault();
        toggleModal(true);
      }
    } : {
      rel: !sameSite ? 'noopener noreferrer' : undefined,
      target: !sameSite ? '_blank' : undefined,
      href: sameSite ? href : `${rootURL}${href}`
    };
  }

  const icons = headerThemedIcons(darkTheme);

  // TODO: Investigate a better way to handle SB's theme change
  useEffect(() => {
    if (props.sbTheme !== undefined) setDarkTheme(props.sbTheme);
  }, [props.sbTheme]);

  const links = [{
    label: 'Our Services',
    title: 'View our services',
    href: '/services',
  }, {
    label: 'Open Source',
    title: 'View our open source projects',
    href: '',
    toggleModal: toggleModal,
  }, {
    label: 'Products',
    title: 'Discover our products',
    href: '/open-source',
  }, {
    label: 'Blog',
    title: 'Read our blog',
    href: '/blog',
  }, {
    label: 'Company',
    title: 'Learn more about us',
    href: '/about-us',
  }];

  return (
    <>
      <HeaderGlobalStyles />
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderSide>
            <HeaderIcon onClick={() => toggleMobileNavigation(true)}>
              <img src={icons.menu} height="24" width="24" alt="Search icon" />
            </HeaderIcon>
          </HeaderSide>

          <HeaderLogo {...renderLinkOptions('/', props.sameSite)} title="View our website">
            <img src={icons.logoFull} height="30" alt="The Guild Logo" />
            <img src={icons.logoMono} height="38" alt="The Guild Monogram" />
          </HeaderLogo>

          <HeaderNav isModalOpen={mobileNavOpen}>
            <HeaderIcon iconType="close" onClick={() => toggleMobileNavigation(false)}>
              <img src={icons.close} height="24" width="24" alt="Menu close icon" />
            </HeaderIcon>
            {links.map(link => (
              <HeaderLink
                key={link.label}
                title={link.title}
                accentColor={props.accentColor}
                {...renderLinkOptions(link.href, props.sameSite, link.toggleModal)}
              >
                {link.label}
                {link.toggleModal && <img src={icons.caret} alt="Link icon" />}
              </HeaderLink>
            ))}
            <HeaderControls>
              {props.searchComponent}
              {
                props.themeSwitch &&
                <HeaderIcon
                  iconType="toggle" onClick={() => setDarkTheme(!darkTheme)}>
                  <img src={icons.themeToggle} height="16" width="16" alt="Theme toggle icon" />
                </HeaderIcon>
              }
            </HeaderControls>
          </HeaderNav>

          <HeaderSide>
            {props.searchComponent}
          </HeaderSide>
        </HeaderContainer>
        <HeaderModal modalOpen={modalOpen} toggleModal={toggleModal} />
      </HeaderWrapper>
    </>
  );
};