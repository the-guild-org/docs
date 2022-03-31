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
import { logoThemedIcons, PRODUCTS } from '../helpers/assets';
import type { IFooterExtendedProps, ILink } from '../types/components';

const COMPANY: ILink[] = [
  {
    children: 'About',
    title: 'Learn more about us',
    href: 'https://the-guild.dev/about-us',
  },
  {
    children: 'Blog',
    title: 'Read our blog',
    href: 'https://the-guild.dev/blog',
  },
  {
    children: 'GitHub',
    title: 'Check our GitHub profile',
    href: 'https://github.com/the-guild-org',
  },
];

const COMMUNITY: ILink[] = [
  {
    children: 'Twitter',
    title: 'Visit our Twitter',
    href: 'https://twitter.com/TheGuildDev',
  },
  {
    children: 'LinkedIn',
    title: 'Visit our LinkedIn',
    href: 'https://linkedin.com/company/the-guild-software',
  },
  {
    children: 'Discord',
    title: 'Reach us on Discord',
    href: 'https://discord.com/invite/xud7bH9',
  },
  {
    children: 'Medium',
    title: 'Read our Medium posts',
    href: 'https://medium.com/the-guild',
  },
  {
    children: 'YouTube',
    title: 'Watch Our Videos',
    href: 'https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
  },
];

const BasicRow = styled.div(() => tw`flex`);
const BasicColumn = styled.div(() => tw`w-1/2`);

const limitProductsTo = Math.ceil(PRODUCTS.length / 2);
const PRODUCTS_COLUMN_1 = PRODUCTS.slice(0, limitProductsTo);
const PRODUCTS_COLUMN_2 = PRODUCTS.slice(limitProductsTo);

export const FooterExtended: React.FC<IFooterExtendedProps> = ({
  sameSite,
  resources,
  onNewsletterSubmit,
  ...restProps
}) => {
  const { isDarkTheme } = useThemeContext();
  const logos = logoThemedIcons(isDarkTheme);

  const logoOptions = sameSite
    ? { href: '/' }
    : {
        href: 'https://the-guild.dev',
        rel: 'noreferrer',
        target: '_blank',
      };

  const renderLinks = (list: ILink[]) => (
    <Links>
      {list.map((link) => (
        <li key={link.href}>
          <a
            {...link}
            {...restProps.linkProps}
            rel="noreferrer"
            target="_blank"
          />
        </li>
      ))}
    </Links>
  );

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        <Line {...restProps.lineProps} />
        <Row>
          <WideColumn>
            <Title {...restProps.titleProps}>PRODUCTS</Title>
            <BasicRow>
              <BasicColumn>{renderLinks(PRODUCTS_COLUMN_1)}</BasicColumn>
              <BasicColumn>{renderLinks(PRODUCTS_COLUMN_2)}</BasicColumn>
            </BasicRow>
          </WideColumn>
          <Column>
            {resources && (
              <>
                <Title {...restProps.titleProps}>RESOURCES</Title>
                {renderLinks(resources)}
              </>
            )}
            <Title {...restProps.titleProps}>COMPANY</Title>
            {renderLinks(COMPANY)}
          </Column>
          <Column>
            <Title {...restProps.titleProps}>COMMUNITY</Title>
            {renderLinks(COMMUNITY)}
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
