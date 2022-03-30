import React from 'react';
import tw, { styled } from 'twin.macro';
import { Newsletter } from './Newsletter';
import {
  Column,
  WideColumn,
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
import type { IFooterExtendedProps, ILink } from '../types/components';

const products = [
  {
    children: 'Hive',
    title: 'Schema Registry for your GraphQL Workflows',
    href: 'https://graphql-hive.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Envelop',
    title: 'Modern GraphQL Framework',
    href: 'https://envelop.dev',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Inspector',
    title: 'Schema management tool',
    href: 'https://graphql-inspector.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Code Generator',
    title: 'Generate anything from GraphQL',
    href: 'https://graphql-code-generator.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Mesh',
    title: 'Query anything, run anywhere',
    href: 'https://graphql-mesh.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Helix',
    title: 'A highly evolved GraphQL HTTP Server',
    href: 'https://graphql-helix.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'ESLint',
    title: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    href: 'https://github.com/B2o5T/graphql-eslint',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Modules',
    title: 'Enterprise Grade Tooling For Your GraphQL Server',
    href: 'https://graphql-modules.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://graphql-tools.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Scalars',
    title:
      'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://graphql-scalars.dev',
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
    href: 'https://graphql-shield.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Swift',
    title: 'A GraphQL client that lets you forget about GraphQL',
    href: 'https://swift-graphql.com',
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
    href: 'https://sofa-api.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    children: 'Angular',
    title:
      'A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server',
    href: 'https://apollo-angular.com',
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
    children: 'GitHub',
    title: 'Check our GitHub profile',
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
    href: 'https://linkedin.com/company/the-guild-software',
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
  {
    children: 'YouTube',
    title: 'Watch Our Videos',
    href: 'https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

const BasicRow = styled.div(() => tw`flex`);

const BasicColumn = styled.div(() => tw`w-1/2`);

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

  const renderLinks = (
    list: ILink[],
    slice?: {
      limit?: number;
      after: number;
    }
  ) => {
    return (
      <Links>
        {list
          .filter((_, index) => {
            if (slice) {
              if (index >= slice.after) {
                return slice.limit ? index - slice.after < slice.limit : true;
              } else {
                return false;
              }
            }

            return true;
          })
          .map((link, index) => (
            <li key={link.href + index}>
              <a {...link} {...restProps.linkProps} />
            </li>
          ))}
      </Links>
    );
  };

  const limitProductsTo = Math.floor(products.length / 2);

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        <Line {...restProps.lineProps} />
        <Row>
          <WideColumn>
            <Title {...restProps.titleProps}>PRODUCTS</Title>
            <BasicRow>
              <BasicColumn>
                <Links>
                  {renderLinks(products, {
                    limit: limitProductsTo,
                    after: 0,
                  })}
                </Links>
              </BasicColumn>
              <BasicColumn>
                <Links>
                  {renderLinks(products, {
                    limit: limitProductsTo,
                    after: limitProductsTo,
                  })}
                </Links>
              </BasicColumn>
            </BasicRow>
          </WideColumn>
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
        <Row
          equalPadding
          style={{
            alignItems: 'center',
            borderTop: '1px solid #262626',
          }}
        >
          <Logo {...logoOptions} {...restProps.logoProps}>
            <img src={logos.logoFull} alt="The Guild" />
          </Logo>
          <Copyright style={{ marginLeft: 25 }} {...restProps.copyrightProps}>
            Belong anywhere. © The Guild, Inc.
          </Copyright>
        </Row>
      </Container>
    </Wrapper>
  );
};
