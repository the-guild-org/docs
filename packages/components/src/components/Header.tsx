import React, { useMemo, useState } from 'react';

import {
  Wrapper,
  Container,
  Navigation,
  Link,
  Icon,
  Controls,
  Side,
  Logo,
} from './Header.styles';
import { EcosystemList } from './EcosystemList';
import { SearchBar } from './SearchBar';
import { IHeaderProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { headerThemedIcons, logoThemedIcons } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './HeaderNavigationMenu';
import { useWindowSize } from '../helpers/hooks';

export const Header: React.FC<IHeaderProps> = ({
  accentColor,
  activeLink,
  themeSwitch,
  transformLinks = (links) => links,
  ...restProps
}) => {
  const { isDarkTheme, setDarkTheme } = useThemeContext();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const icons = headerThemedIcons(isDarkTheme || false);
  const logos = logoThemedIcons(isDarkTheme || false);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const shouldUseMenu = useMemo(
    () =>
      windowWidth &&
      windowWidth &&
      windowHeight &&
      windowHeight > 400 &&
      windowWidth > 800,
    [windowHeight, windowWidth]
  );

  const handleNav = (state: boolean) => {
    toggleLockBodyScroll(state);
    setMobileNavOpen(state);
  };

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
    const rootURL = 'https://the-guild.dev';
    return {
      rel: 'noopener noreferrer',
      target: '_blank',
      href: `${rootURL}${href}`,
    };
  };

  const links = transformLinks([
    {
      label: 'Our Services',
      title: 'View our services',
      href: '/services',
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
      label: 'About Us',
      title: 'Learn more about us',
      href: '/about-us',
    },
  ]);

  const onLinkClick = restProps.linkProps?.onClick;

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        <Side>
          <Icon
            onClick={() => handleNav(true)}
            {...restProps.navOpenButtonProps}
          >
            <img src={icons.menu} height="24" width="24" alt="Search icon" />
          </Icon>
        </Side>

        <Logo
          {...renderLinkOptions('/', onLinkClick)}
          title="View our website"
          {...restProps.logoProps}
        >
          <img src={logos.logoFull} height="30" alt="The Guild Logo" />
          <img src={logos.logoMono} height="38" alt="The Guild Monogram" />
        </Logo>

        <NavigationMenuRoot>
          <NavigationMenuList>
            <Navigation
              isModalOpen={mobileNavOpen}
              {...restProps.navigationProps}
            >
              <Icon
                iconType="close"
                onClick={() => handleNav(false)}
                {...restProps.navCloseButtonProps}
              >
                <img
                  src={icons.close}
                  height="22"
                  width="22"
                  alt="Menu close icon"
                />
              </Icon>

              {links.map((link) =>
                link.menu && shouldUseMenu ? (
                  <NavigationMenuItem key={link.label} value={link.label}>
                    <NavigationMenuTrigger accentColor={accentColor}>
                      <Link
                        title={link.title}
                        accentColor={accentColor}
                        isActiveLink={activeLink?.includes(link.href)}
                        {...restProps.linkProps}
                        {...renderLinkOptions(
                          link.href,
                          link.onClick || onLinkClick
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>{link.menu}</NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink>
                      <Link
                        title={link.title}
                        accentColor={accentColor}
                        isActiveLink={activeLink?.includes(link.href)}
                        {...restProps.linkProps}
                        {...renderLinkOptions(
                          link.href,
                          link.onClick || onLinkClick
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}

              <Controls>
                <SearchBar
                  accentColor={accentColor}
                  title="Search docs"
                  placeholder="Search..."
                  {...restProps.searchBarProps}
                />
                {themeSwitch && setDarkTheme && (
                  <Icon
                    iconType="theme"
                    onClick={() => setDarkTheme((state: boolean) => !state)}
                    {...restProps.themeButtonProps}
                  >
                    <img
                      src={icons.themeToggle}
                      height={16}
                      width={16}
                      alt="Theme toggle icon"
                    />
                  </Icon>
                )}
              </Controls>
            </Navigation>
          </NavigationMenuList>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenuRoot>

        <Side>
          <SearchBar
            accentColor={accentColor}
            title="Search docs"
            placeholder="Search..."
            {...restProps.searchBarProps}
          />
        </Side>
      </Container>
    </Wrapper>
  );
};
