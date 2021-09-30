import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HeroGradient } from '../HeroGradient';
import { HeroIllustration } from '../HeroIllustration';
import { FeatureList } from '../FeatureList';
import { Header } from '../Header';
import { Subheader } from '../Subheader';
import { FooterExtended } from '../FooterExtended';
import { ExampleList } from '../ExampleList';

import { dummySubheader, dummyHeroGradient, dummyFeatureList, dummyExampleList, dummyHeroIllustration } from '../../helpers/dummy';

const featureListData = {
  ...dummyFeatureList,
    titleDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque mauris imperdiet nulla vehicula, vitae porttitor massa consequat. Proin semper bibendum aliquam',
    link: {
        children: 'Try It Now',
        title: 'Try It Now',
        href: '#',
},
};

const firstHeroIllustrationData = {
    ...dummyHeroIllustration,
    renderButton: true,
};

const secondHeroIllustrationData = {
    ...dummyHeroIllustration,
    flipped: false,
};

export default {
  title: 'Products/Codegen',
  argTypes: {
    page: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
} as Meta;

const Template: Story = ({ page, footerData }) => {
  const pages = {
    '/': (
    <>
        <HeroGradient {...dummyHeroGradient} />
        <HeroIllustration {...firstHeroIllustrationData} />
        <HeroIllustration {...secondHeroIllustrationData} />
        <FeatureList {...featureListData} />
    </>
    ),
    '/marketplace': <ExampleList {...dummyExampleList} />,
  };

  return (
  <>
    <Header accentColor="#ED2E7E" activeLink="/open-source" themeSwitch />
    <Subheader {...dummySubheader} activeLink={page} />
    {pages[page]}
    <FooterExtended {...footerData} />
  </>
  );
};

const footerData = {
    sameSite: false,
    resources: [
      {
        children: 'Documentation',
        title: 'Read the Docs',
        href: '/docs',
        onClick: (e) => {
          e.preventDefault();
          alert('Internal link handler');
        },
      },
      {
        children: 'Quick start',
        title: 'Learn first steps',
        href: '/docs',
        onClick: (e) => {
          e.preventDefault();
          alert('Internal link handler');
        },
      },
    ],
    onNewsletterSubmit: (e: React.FormEvent, value: string) => {
      console.log(e, value);
    },
};

export const Home = Template.bind({});
Home.args = {
  page: '/',
  footerData,
};

export const Marketplace = Template.bind({});
Marketplace.args = {
  page: '/marketplace',
  footerData,
};
