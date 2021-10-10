import featureListImage1 from '../static/dummy/envelop/features-pluggable.png';
import featureListImage2 from '../static/dummy/envelop/features-performant.png';
import featureListImage3 from '../static/dummy/envelop/features-modern.png';
import heroGradientImage from '../static/dummy/envelop/hero.png';
import heroIllustrationImage from '../static/dummy/envelop/communication.png';
import marketplaceListImage from '../static/dummy/marketplace/logo-modules.svg';
import { IMarketplaceListProps } from '../types/components';

const subheaderImage =
  'https://the-guild.dev/static/shared-logos/products/envelop.svg';

export const dummyFeatureList = {
  title: 'The best and simple features',
  items: [
    {
      image: {
        alt: 'Toy Brick Icon',
        src: featureListImage1,
      },
      title: 'Pluggable',
      description: 'Powerful plugin system',
      link: {
        children: 'Github',
        title: 'Learn more',
        target: '_blank',
        rel: 'noopener norefereer',
        href: 'https://github.com/the-guild-org'
      }
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

export const dummyInfoList = {
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
      title: 'Github integration',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.',
      link: {
        children: 'Github',
        title: 'View the code',
        href: 'https://github.com/dotansimha/envelop/',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
    {
      title: "Let's work together",
      description:
        'We want to hear from you, our community of fellow engineers.',
      link: {
        children: 'envelop@theguild.dev',
        title: 'Reach us out',
        href: 'mailto:envelop@theguild.dev',
      },
    },
  ],
};

export const dummyHeroVideo = {
  title: 'Easy Installation',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque mauris imperdiet nulla vehicula, vitae porttitor massa consequat. Proin semper bibendum aliquam.',
  link: {
    children: 'Documentation',
    title: 'Read the documentation',
    href: '#',
  },
  video: {
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    placeholder:
      'https://ak.picdn.net/shutterstock/videos/1033186691/thumb/1.jpg',
  },
  flipped: true,
};

export const dummyHeroIllustration = {
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

export const dummyHeroGradient = {
  title: 'A GraphQL server framework for improved developer experience',
  description:
    'Use any Node framework and any GraphQL feature, with the easiest plugins system - A new framework by The Guild',
  link: {
    children: 'Get Started',
    title: 'Learn more about GraphQL Envelop',
    href: '#',
  },
  version: '1.0.7',
  colors: ['#FF34AE', '#1CC8EE'],
  image: {
    src: heroGradientImage,
    alt: 'Illustration',
  },
};

export const dummyHeroMarketplace = {
  title: 'Marketplace',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sem ex. Aenean semper vehicula nibh non luctus. In rutrum nisl vitae ligula mollis feugiat.',
  link: {
    children: 'Get Started',
    title: 'Learn more about the ',
    href: '#',
  },
};

export const dummySubheader = {
  product: {
    title: 'Envelop',
    description: 'Modern GraphQL Framework',
    image: {
      src: subheaderImage,
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
      children: 'Marketplace',
      title: 'Browse the marketplace',
      href: '/marketplace',
    },
    {
      children: 'Features',
      title: "Discover Envelop's features",
      href: '/features',
    },
    {
      children: 'API & Doc',
      title: 'Learn more about Envelop',
      href: '/docs',
    },
    {
      children: 'Github',
      title: 'See our Github profile',
      href: 'https://github.com/dotansimha/envelop',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  cta: {
    children: 'Get Started',
    title: 'Learn more about Envelop',
    href: '#',
  },
};

export const dummyCardsColorful = {
  cards: [
    {
      title: 'GraphQL Modules',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'New release by the guild',
      link: {
        title: 'Learn more',
        href: '#',
      },
      color: '#3547E5',
    },
    {
      title: 'Clean up your code!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Pro tip',
      link: {
        title: 'Learn more',
        href: '#',
      },
      color: '#0B0D11',
    },
  ],
};

export const dummyMarketplaceList: IMarketplaceListProps = {
  title: 'Trending & Last Update',
  placeholder: 'There are no items available...',
  pagination: 4,
  items: [
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 1',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 2',
      tags: ['test', 'tag'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 2',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 3',
      tags: ['tag'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 3',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 4',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 5',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 6',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 7',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 8',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 9',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 9',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 10',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            href: '#',
            children: 'Apr 20, 2021 - Latest Update',
            title: 'Example Link Title',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        content: 'Lipsum 10',
      },
      update: '2021-05-07T10:14:55.884Z',
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
  ],
};

export const dummyMarketplaceSearch = {
  title: 'Explore Marketplace',
  tagsFilter: ['test', 'tag'],
  placeholder: 'Search...',
  primaryList: {
    title: 'Trending & Last Update',
    items: dummyMarketplaceList.items.slice(0, 7),
    placeholder: 'No products available...',
    pagination: 5,
  },
  secondaryList: {
    title: 'New Release',
    items: dummyMarketplaceList.items.slice(4, 10),
    placeholder: 'No products available...',
    pagination: 5,
  },
  queryList: {
    title: 'Query Results',
    items: dummyMarketplaceList.items,
    placeholder: 'No results for {query}',
    pagination: 8,
  },
};
