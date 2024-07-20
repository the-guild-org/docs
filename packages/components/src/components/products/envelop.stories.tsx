import { ReactElement, ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  dummyCardsColorful,
  dummyFeatureList,
  dummyHeroGradient,
  dummyHeroIllustration,
  dummyHeroMarketplace,
  dummyHeroVideo,
  dummyInfoList,
  dummyMarketplaceSearch,
} from '../../helpers/dummy';
import { CardsColorful } from '../cards-colorful';
import { FeatureList } from '../feature-list';
import { Footer } from '../footer';
import { HeroGradient } from '../hero-gradient';
import { HeroIllustration } from '../hero-illustration';
import { HeroMarketplace } from '../hero-marketplace';
import { HeroVideo } from '../hero-video';
import { InfoList } from '../info-list';
import { MarketplaceSearch } from '../marketplace-search';

export default {
  title: 'Products/Envelop',
  component: Template,
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

function Template({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export const Home: Story = {
  args: {
    children: (
      <>
        <HeroGradient {...dummyHeroGradient} />
        <FeatureList {...dummyFeatureList} />
        <HeroVideo {...dummyHeroVideo} />
        <HeroIllustration {...dummyHeroIllustration} />
        <HeroMarketplace {...dummyHeroMarketplace} />
        <InfoList {...dummyInfoList} />
      </>
    ),
  },
};

export const Marketplace: Story = {
  args: {
    children: (
      <>
        <CardsColorful {...dummyCardsColorful} />
        <MarketplaceSearch {...dummyMarketplaceSearch} />
      </>
    ),
  },
};
