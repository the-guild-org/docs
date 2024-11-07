import { CardsColorfulProps } from '../components/cards-colorful';
import {
  IFeatureListProps,
  IHeroGradientProps,
  IHeroIllustrationProps,
  IHeroMarketplaceProps,
  IHeroVideoProps,
  IInfoListProps,
} from '../types/components';
import heroIllustrationImage from '../static/dummy/envelop/communication.png';
import featureListImage3 from '../static/dummy/envelop/features-modern.png';
import featureListImage2 from '../static/dummy/envelop/features-performant.png';
import featureListImage1 from '../static/dummy/envelop/features-pluggable.png';
import yogaImage from '../static/illustrations/yoga.svg';

export const dummyFeatureList: IFeatureListProps = {
  title: 'The best and simple features',
  description: 'Powerful plugin system learn more learn more',
  link: {
    href: '/wow',
    children: 'Hello world',
  },
  items: [
    {
      image: {
        alt: 'Toy Brick Icon',
        src: featureListImage1,
      },
      title: 'Pluggable',
      description: 'Powerful plugin system',
      link: {
        children: 'GitHub',
        title: 'Learn more',
        href: 'https://github.com/the-guild-org',
      },
    },
    {
      image: {
        alt: 'Gauge Icon',
        src: featureListImage2,
      },
      title: 'Performant',
      description: 'Use any Node framework, use any execution',
    },
    {
      image: {
        alt: 'Toy Brick Icon',
        src: featureListImage3,
      },
      title: 'Modern',
      description: 'Use all the latest GraphQL Capabilities',
    },
  ],
};

export const dummyInfoList: IInfoListProps = {
  title: 'Get Started',
  items: [
    {
      title: 'Install GraphQL Envelop',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.',
      link: {
        children: 'Documentation',
        title: 'Read the documentation',
        href: '#',
      },
    },
    {
      title: 'GitHub integration',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.',
      link: {
        children: 'GitHub',
        title: 'View the code',
        href: 'https://github.com/dotansimha/envelop',
      },
    },
    {
      title: "Let's work together",
      description: 'We want to hear from you, our community of fellow engineers.',
      link: {
        children: 'envelop@theguild.dev',
        title: 'Reach us out',
        href: 'mailto:envelop@theguild.dev',
      },
    },
  ],
};

export const dummyHeroVideo: IHeroVideoProps = {
  title: 'Easy Installation',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque mauris imperdiet nulla vehicula, vitae porttitor massa consequat. Proin semper bibendum aliquam.',
  link: {
    children: 'Documentation',
    title: 'Read the documentation',
    href: '#',
  },
  video: {
    src: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    placeholder: 'https://ak.picdn.net/shutterstock/videos/1033186691/thumb/1.jpg',
  },
  flipped: true,
};

export const dummyHeroIllustration: IHeroIllustrationProps = {
  title: 'Direct communication with your server',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque mauris imperdiet nulla vehicula, vitae porttitor massa consequat. Proin semper bibendum aliquam.',
  link: {
    children: 'Documentation',
    title: 'Read the documentation',
    href: '#',
  },
  image: {
    src: heroIllustrationImage,
    alt: 'Illustration',
  },
  flipped: true,
};

export const dummyHeroGradient: IHeroGradientProps = {
  title: 'A GraphQL server framework for improved developer experience',
  description:
    'Use any Node framework and any GraphQL feature, with the easiest plugins system - A new framework by The Guild',
  link: {
    children: 'Get Started',
    title: 'Learn more about GraphQL Envelop',
    href: '/docs',
  },
  version: '1.0.7',
  colors: ['#ff34ae', '#1cc8ee'],
  image: {
    src: yogaImage,
    alt: 'Illustration',
    loading: 'eager' as const,
  },
};

export const dummyHeroMarketplace: IHeroMarketplaceProps = {
  title: 'Marketplace',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sem ex. Aenean semper vehicula nibh non luctus. In rutrum nisl vitae ligula mollis feugiat.',
  link: {
    children: 'Get Started',
    title: 'Learn more about the ',
    href: '#',
  },
};

export const dummyCardsColorful: CardsColorfulProps = {
  cards: [
    {
      title: 'GraphQL Modules',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'New release by the guild',
      link: {
        title: 'Learn more',
        href: '#',
      },
      color: '#3547e5',
    },
    {
      title: 'Clean up your code!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Pro tip',
      link: {
        title: 'Learn more',
        href: '#',
      },
      color: '#0b0d11',
    },
  ],
};
