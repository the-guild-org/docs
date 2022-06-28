import { Story, Meta } from '@storybook/react/types-6-0';
import { FooterExtended } from '../FooterExtended';
import { Header } from '../Header';
import { HeroGradient } from '../HeroGradient';
import { InfoList } from '../InfoList';
import { Subheader } from '../Subheader';

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

const Template: Story = ({ page }) => {
  const pages: any = {
    '/': (
      <>
        <HeroGradient {...heroGradientData} />
        <InfoList {...infoListData} />
      </>
    ),
  };

  return (
    <>
      <Header accentColor="#184BE6" activeLink="/open-source" themeSwitch />
      <Subheader {...subheaderData} activeLink={page} />
      {pages[page]}
      <FooterExtended {...footerData} />
    </>
  );
};

export const Home = Template.bind({});
Home.args = {
  page: '/',
};

const subheaderData = {
  product: {
    title: 'GraphQL Tools',
    description: 'Modern GraphQL Framework',
    image: {
      src: 'https://the-guild.dev/static/shared-logos/products/tools.svg',
      alt: 'Envelop',
    },
  },
  activeLink: '/',
  links: [
    {
      children: 'Home',
      title: 'Visit our Homepage',
      href: '/',
    },
    {
      children: 'API & Doc',
      title: 'Learn more about Envelop',
      href: '/docs',
    },
    {
      children: 'GitHub',
      title: 'See our GitHub profile',
      href: 'https://github.com/ardatan/graphql-tools',
      target: '_blank',
      rel: 'noreferrer',
    },
  ],
  cta: {
    children: 'Get Started',
    title: 'Learn more about GraphQL Tools',
    href: '/docs',
  },
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

const footerData = {
  resources: [
    {
      children: 'Documentation',
      title: 'Read the Docs',
      href: '/docs',
      onClick(e) {
        e.preventDefault();
        alert('Internal link handler');
      },
    },
    {
      children: 'Generate Schemas',
      title: 'Learn about generating schemas',
      href: '/docs/generate-schema',
      onClick(e) {
        e.preventDefault();
        alert('Internal link handler');
      },
    },
    {
      children: 'Mock APIs',
      title: 'Learn about mocking APIs',
      href: '/docs/mocking',
      onClick(e) {
        e.preventDefault();
        alert('Internal link handler');
      },
    },
    {
      children: 'Stitch Schemas',
      title: 'Learn about stitching schemas',
      href: '/docs/stitch-combining-schemas',
      onClick(e) {
        e.preventDefault();
        alert('Internal link handler');
      },
    },
  ],
};
