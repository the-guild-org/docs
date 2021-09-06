import React from 'react';

import { Newsletter } from './Newsletter';
import {
  Column,
  Container,
  Copyright,
  Description,
  Links,
  Line,
  Logo,
  Title,
  Row,
  Wrapper,
} from './FooterExtended.styles';

import { useThemeContext } from '../helpers/theme';
import { logoThemedIcons } from '../helpers/assets';
import { IFooterExtendedProps, ILink } from '../types/components';

const products = [
  {
    children: 'Hive',
    title: 'Schema Registry for your GraphQL Workflows',
    href: 'https://graphql-hive.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Envelop',
    title: 'Modern GraphQL Framework',
    href: 'https://www.envelop.dev/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Inspector',
    title: 'Schema management tool',
    href: 'https://graphql-inspector.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Code Generator',
    title: 'Generate anything from GraphQL',
    href: 'https://graphql-code-generator.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Mesh',
    title: 'Query anything, run anywhere',
    href: 'https://graphql-mesh.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'ESLint',
    title: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    href: 'https://github.com/dotansimha/graphql-eslint/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Modules',
    title: 'Enterprise Grade Tooling For Your GraphQL Server',
    href: 'https://graphql-modules.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://graphql-tools.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Scalars',
    title:
      'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://graphql-scalars.dev/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Config',
    title: 'One configuration for all your GraphQL tools',
    href: 'https://graphql-config.com/introduction',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Shield',
    title: 'GraphQL Permissions Framework For Complex Authorisation Systems',
    href: 'https://www.graphql-shield.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Swift',
    title: 'A GraphQL client that lets you forget about GraphQL',
    href: 'https://www.swift-graphql.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'CLI',
    title: 'Command line tool for common GraphQL workflows',
    href: 'https://github.com/Urigo/graphql-cli',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL Server',
    href: 'https://sofa-api.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Angular',
    title:
      'A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server',
    href: 'https://apollo-angular.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'WhatsApp',
    title: 'Full Stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Stencil',
    title:
      'A fully-featured, production ready caching GraphQL client for Stencil and every GraphQL server',
    href: 'https://github.com/ardatan/stencil-apollo',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

const company = [
  {
    children: 'About',
    title: 'Learn more about us',
    href: 'https://the-guild.dev/about-us',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Blog',
    title: 'Read our blog',
    href: 'https://the-guild.dev/blog',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Github',
    title: 'Check our Github profile',
    href: 'https://github.com/the-guild-org',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

const community = [
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
    href: 'https://www.linkedin.com/company/the-guild-software/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Discord',
    title: 'Reach us on Discord',
    href: 'https://discord.com/invite/xud7bH9',
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
];

export const FooterExtended: React.FC<IFooterExtendedProps> = ({
  sameSite,
  resources,
  onNewsletterSubmit,
  ...restProps
}) => {
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

  const renderLinks = (list: ILink[]) => (
    <Links>
      {list.map((link, index) => (
        <li key={link.href + index}>
          <a {...link} {...restProps.linkProps} />
        </li>
      ))}
    </Links>
  );

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        <Line {...restProps.lineProps} />
        <Row>
          <Column>
            <Logo {...logoOptions} {...restProps.logoProps}>
              <img src={logos.logoFull} alt="The Guild" />
            </Logo>
            <Copyright {...restProps.copyrightProps}>
              Belong anywhere. © The Guild, Inc.
            </Copyright>
          </Column>
          <Column>
            <Title {...restProps.titleProps}>PRODUCTS</Title>
            <Links>{renderLinks(products)}</Links>
          </Column>
          <Column>
            {resources && (
              <>
                <Title {...restProps.titleProps}>RESOURCES</Title>
                <Links>{renderLinks(resources)}</Links>
              </>
            )}
            <Title {...restProps.titleProps}>COMPANY</Title>
            <Links>{renderLinks(company)}</Links>
          </Column>
          <Column>
            <Title {...restProps.titleProps}>COMMUNITY</Title>
            <Links>{renderLinks(community)}</Links>
            {onNewsletterSubmit && (
              <>
                <Title {...restProps.titleProps}>NEWSLETTER</Title>
                <Description {...restProps.descriptionProps}>
                  Stay up to date with the latest features and changes
                </Description>
                <Newsletter
                  onNewsletterSubmit={onNewsletterSubmit}
                  {...restProps.newsletterProps}
                />
              </>
            )}
          </Column>
        </Row>
      </Container>
    </Wrapper>
  );
};
