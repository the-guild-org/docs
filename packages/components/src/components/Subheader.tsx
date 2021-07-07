import React, { useState } from 'react';

import {
  Container,
  Controls,
  CTA,
  Icon,
  Link,
  Logo,
  Navigation,
  Wrapper,
} from './Subheader.styles';

import { ISubheaderProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { headerThemedIcons } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';

export const Subheader: React.FC<ISubheaderProps> = ({
  product,
  activeLink,
  links,
  cta,
  ...restProps
}) => {
  const { isDarkTheme } = useThemeContext();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const icons = headerThemedIcons(isDarkTheme || false);

  const handleNav = (state: boolean) => {
    toggleLockBodyScroll(state);
    setMobileNavOpen(state);
  };

  links.forEach((link) => {
    if (link.href === '/') {
      link.active = activeLink === link.href;
    } else {
      link.active = activeLink.startsWith(link.href);
    }
  });

  const renderNavigation = (
    <Navigation isModalOpen={mobileNavOpen} {...restProps.navigationProps}>
      <Icon iconType="close" onClick={() => handleNav(false)} {...restProps.navCloseButtonProps}>
        <img src={icons.close} height="22" width="22" alt="Menu close icon" />
      </Icon>
      {links.map((link) => (
        <Link key={link.href} isActiveLink={link.active} {...link} {...restProps.linkProps}/>
      ))}
    </Navigation>
  );

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        <Logo
          href="/"
          onClick={product.onClick}
          title={`${product.title} - ${product.description}`}
          {...restProps.logoProps}
        >
          <img src={product.image.src} alt={product.image.alt} />
          <span>
            <p>{product.title}</p>
            <p>{product.description}</p>
          </span>
        </Logo>
        {renderNavigation}
        <Controls>
          {cta && <CTA {...cta} {...restProps.ctaProps}/>}
          <Icon iconType="open" onClick={() => handleNav(true)} {...restProps.navOpenButtonProps}>
            <img
              src={icons.caretSlim}
              height="24"
              width="24"
              alt="Menu open icon"
            />
          </Icon>
        </Controls>
      </Container>
    </Wrapper>
  );
};
