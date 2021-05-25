import React from 'react';

import {
  Container,
  Copyright,
  Links,
  Line,
  Logo,
  Wrapper,
} from './Footer.styles';

import { ThemeContext } from '../helpers/theme';
import { logoThemedIcons } from '../helpers/assets';
import { IFooterProps } from '../types/components';

const links = [
  {
    label: 'Twitter',
    title: 'Visit our Twitter',
    href: 'https://twitter.com/TheGuildDev',
  },
  {
    label: 'LinkedIn',
    title: 'Visit our LinkedIn',
    href: 'https://www.linkedin.com/company/the-guild-software/',
  },
  {
    label: 'Github',
    title: 'See our Github profile',
    href: 'https://github.com/the-guild-org',
  },
  {
    label: 'Medium',
    title: 'Read our Medium posts',
    href: 'https://medium.com/the-guild',
  },
];

export const Footer: React.FC<IFooterProps> = ({ sameSite }) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const logos = logoThemedIcons(isDarkTheme || false);

  const logoOptions = sameSite
    ? {
        href: '/',
      }
    : {
        href: 'https://the-guild.dev',
        rel: 'noopener noreferrer',
        target: '_blank',
      };

  return (
    <Wrapper>
      <Container>
        <Line />
        <Copyright>Belong anywhere. © The Guild, Inc.</Copyright>
        <Logo {...logoOptions}>
          <img src={logos.logoMono} alt="The Guild" />
        </Logo>
        <Links>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                title={link.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </Links>
      </Container>
    </Wrapper>
  );
};
