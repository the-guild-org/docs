import React from 'react';

import {
  Container,
  Copyright,
  Links,
  Line,
  Logo,
  Wrapper,
} from './Footer.styles';

import { useThemeContext } from '../helpers/theme';
import { logoThemedIcons } from '../helpers/assets';
import { IFooterProps } from '../types/components';

const links = [
  {
    children: 'Twitter',
    title: 'Visit our Twitter',
    href: 'https://twitter.com/TheGuildDev',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'LinkedIn',
    title: 'Visit our LinkedIn',
    href: 'https://linkedin.com/company/the-guild-software',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'GitHub',
    title: 'See our GitHub profile',
    href: 'https://github.com/the-guild-org',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Medium',
    title: 'Read our Medium posts',
    href: 'https://medium.com/the-guild',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'YouTube',
    title: 'Our Videos',
    href: 'https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export const Footer: React.FC<IFooterProps> = ({ sameSite, ...restProps }) => {
  const { isDarkTheme } = useThemeContext();
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
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        <Line {...restProps.lineProps} />
        <Copyright {...restProps.copyrightProps}>
          Belong anywhere. © The Guild, Inc.
        </Copyright>
        <Logo {...logoOptions} {...restProps.logoProps}>
          <img src={logos.logoMono} alt="The Guild" />
        </Logo>
        <Links>
          {links.map((link) => (
            <li key={link.href}>
              <a {...link} {...restProps.linkProps} />
            </li>
          ))}
        </Links>
      </Container>
    </Wrapper>
  );
};
