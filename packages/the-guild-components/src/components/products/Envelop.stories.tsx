import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { GlobalStyles } from '../../helpers/styles';

import { CardsColorful } from '../CardsColorful';
import { Footer } from '../Footer';
import { FeatureList } from '../FeatureList';
import { Header } from '../Header';
import { HeroIllustration } from '../HeroIllustration';
import { HeroGradient } from '../HeroGradient';
import { HeroVideo } from '../HeroVideo';
import { InfoList } from '../InfoList';
import { MarketplaceSearch } from '../MarketplaceSearch';
import { Subheader } from '../Subheader';

import {
  dummyCardsColorful,
  dummyFeatureList,
  dummyHeroGradient,
  dummyHeroIllustration,
  dummyHeroMarketplace,
  dummyHeroVideo,
  dummyInfoList,
  dummyMarketplaceSearch,
  dummySubheader,
} from '../../helpers/dummy';
import { HeroMarketplace } from '../HeroMarketplace';

export default {
  title: 'Products/Envelop',
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
        <HeroGradient {...dummyHeroGradient} />
        <FeatureList {...dummyFeatureList} />
        <HeroVideo {...dummyHeroVideo} />
        <HeroIllustration {...dummyHeroIllustration} />
        <HeroMarketplace {...dummyHeroMarketplace} />
        <InfoList {...dummyInfoList} />
      </>
    ),
    '/marketplace': (
      <>
        <CardsColorful {...dummyCardsColorful} />
        <MarketplaceSearch {...dummyMarketplaceSearch} />
      </>
    ),
  };

  return (
    <>
      <GlobalStyles />
      <Header accentColor="#ED2E7E" activeLink="/open-source" />
      <Subheader {...dummySubheader} activeLink={page} />
      {pages[page]}
      <Footer />
    </>
  );
};

export const Home = Template.bind({});
Home.args = {
  page: '/',
};

export const Marketplace = Template.bind({});
Marketplace.args = {
  page: '/marketplace',
};
