import React, { useEffect, useState } from "react";
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderNav,
  HeaderLink,
  HeaderIcon,
  HeaderControls,
  HeaderSide,
  HeaderLogo
} from "./Header.styles";
import { headerThemedIcons } from "./Header.assets";

import { HeaderModal } from "./HeaderModal";
import { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = (props) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [osModalOpen, setOSModalOpen] = useState(false);

  useEffect(() => {
    if (props.themeSwitch) {
      const theme = document.documentElement.dataset.theme;
      if (theme && theme === 'dark') setDarkTheme(true);
    }
  }, []);

  const renderLinkOptions = (href: string, sameSite: boolean, setModalOpen?: Function) => {
    const rootURL = 'https://the-guild.dev';
    return setModalOpen ? {
      href: href,
      onClick: (e: any) => {
        e.preventDefault();
        setModalOpen(true);
      }
    } : {
      rel: !sameSite ? 'noopener noreferrer' : undefined,
      target: !sameSite ? '_blank' : undefined,
      href: sameSite ? href : `${rootURL}${href}`
    };
  }

  const icons = headerThemedIcons(darkTheme);

  const links = [{
    label: 'Our Services',
    title: 'View our services',
    href: '/services',
  }, {
    label: 'Open Source',
    title: 'View our open source projects',
    href: '',
    setModalOpen: setOSModalOpen,
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
    <HeaderWrapper isDark={darkTheme}>
      <HeaderContainer>
        <HeaderSide>
          <HeaderIcon onClick={() => setMobileNavOpen(true)}>
            <img src={icons.menu} height="24" width="24" alt="Search icon" />
          </HeaderIcon>
        </HeaderSide>

        <HeaderLogo {...renderLinkOptions('/', props.sameSite)} title="View our website">
          <img src={icons.logoFull} height="30" alt="The Guild Logo" />
          <img src={icons.logoMono} height="38" alt="The Guild Monogram" />
        </HeaderLogo>

        <HeaderNav isDark={darkTheme} isModalOpen={mobileNavOpen}>
          <HeaderIcon iconType="close" onClick={() => setMobileNavOpen(false)}>
            <img src={icons.close} height="24" width="24" alt="Menu close icon" />
          </HeaderIcon>
          {links.map(link => (
            <HeaderLink
              key={link.label}
              accentColor={props.accentColor}
              isModal={!!link.setModalOpen}
              isDark={darkTheme}
              title={link.title}
              {...renderLinkOptions(link.href, props.sameSite, link.setModalOpen)}
            >
              {link.label}
              {link.setModalOpen && <img src={icons.caret} alt="Link icon" />}
            </HeaderLink>
          ))}
          <HeaderControls>
            {props.searchComponent}
            {
              props.themeSwitch &&
              <HeaderIcon
                iconType="toggle" onClick={() => {
                  document.documentElement.dataset.theme = darkTheme ? 'light' : 'dark';
                  setDarkTheme(state => !state);
                }}>
                <img src={icons.themeToggle} height="16" width="16" alt="Theme toggle icon" />
              </HeaderIcon>
            }
          </HeaderControls>
        </HeaderNav>

        <HeaderSide>
          {props.searchComponent}
        </HeaderSide>
      </HeaderContainer>
      <HeaderModal darkTheme={darkTheme} modalOpen={osModalOpen} setModalOpen={setOSModalOpen} />
    </HeaderWrapper>
  );
};
