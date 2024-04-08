import { ReactElement } from 'react';
import { Meta, Story } from '@storybook/react';
import { ILink } from '../../types/components';
import { FooterExtended } from '../footer-extended';
import { HeroGradient } from '../hero-gradient';
import { InfoList } from '../info-list';

export default {
  title: 'Products/Tools',
  argTypes: {
    page: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
} as Meta;

const Template: Story = ({ page }): ReactElement => {
  const pages: Record<string, ReactElement> = {
    '/': (
      <>
        <HeroGradient {...heroGradientData} />
        <InfoList {...infoListData} />
      </>
    ),
  };

  return (
    <>
      {pages[page]}
      <FooterExtended {...footerData} />
    </>
  );
};

export const Home = Template.bind({});
Home.args = {
  page: '/',
};

const heroGradientData = {
  title: 'A set of utilities for faster development of GraphQL Schemas',
  description:
    'GraphQL Tools is an npm package and an opinionated structure for how to build a GraphQL schema and resolvers in JavaScript, following the GraphQL-first development workflow.',
  link: {
    children: 'Get Started',
    title: 'Learn more about GraphQL Tools',
    href: '/docs',
  },
  version: 'v 7.0.5',
  colors: ['#000246', '#184be6'],
};

const infoListData = {
  title: 'Core features',
  items: [
    {
      title: 'The GraphQL-first philosophy',
      description:
        'Use the GraphQL schema definition language to generate a schema with full support for resolvers, interfaces, unions, and custom scalars.',
    },
    {
      title: 'Mock your GraphQL API',
      description:
        'With GraphQL Tools, you can mock your GraphQL API with fine-grained per-type mocking for fast prototyping without any datasources.',
    },
    {
      title: 'Stitch multiple GraphQL Schemas',
      description:
        'Automatically stitch multiple schemas together into one larger API in a simple, fast and powerful way.',
    },
  ],
};

const footerData: { resources: ILink[] } = {
  resources: [
    {
      children: 'Documentation',
      title: 'Read the Docs',
      href: '/docs',
    },
    {
      children: 'Generate Schemas',
      title: 'Learn about generating schemas',
      href: '/docs/generate-schema',
    },
    {
      children: 'Mock APIs',
      title: 'Learn about mocking APIs',
      href: '/docs/mocking',
    },
    {
      children: 'Stitch Schemas',
      title: 'Learn about stitching schemas',
      href: '/docs/stitch-combining-schemas',
    },
  ],
};
