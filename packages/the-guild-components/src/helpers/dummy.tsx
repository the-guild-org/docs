import React from 'react';

import featureListImage1 from '../static/dummy/envelop/features-plugable.png';
import featureListImage2 from '../static/dummy/envelop/features-performant.png';
import featureListImage3 from '../static/dummy/envelop/features-modern.png';
import heroGradientImage from '../static/dummy/envelop/hero.png';
import heroIllustrationImage from '../static/dummy/envelop/communication.png';
import marketplaceListImage from '../static/dummy/marketplace/logo-modules.svg';

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
        label: 'Documentation',
        title: 'Read the documentation',
        href: '/docs',
      },
    },
    {
      title: 'Github integration',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.',
      link: {
        label: 'Github',
        title: 'View the code',
        href: 'https://github.com/dotansimha/envelop/',
      },
    },
    {
      title: "Let's work together",
      description:
        'We want to hear from you, our community of fellow engineers.',
      link: {
        label: 'envelop@theguild.dev',
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
    label: 'Documentation',
    title: 'Read the documentation',
    href: '/docs',
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
    label: 'Documentation',
    title: 'Read the documentation',
    href: '/docs',
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
    label: 'Get Started',
    title: 'Learn more about GraphQL Envelop',
    href: '/get-started',
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
    label: 'Get Started',
    title: 'Learn more about the ',
    href: '/marketplace',
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
      label: 'Home',
      title: 'Visit our Homepage',
      href: '/',
      active: false,
    },
    {
      label: 'Marketplace',
      title: 'Browse the marketplace',
      href: '/marketplace',
      active: false,
    },
    {
      label: 'Features',
      title: "Discover Envelop's features",
      href: '/features',
      active: false,
    },
    {
      label: 'API & Doc',
      title: 'Learn more about Envelop',
      href: '/docs',
      active: false,
    },
    {
      label: 'Github',
      title: 'See our Github profile',
      href: 'https://github.com/dotansimha/envelop',
      active: false,
    },
  ],
  cta: {
    label: 'Get Started',
    title: 'Learn more about Envelop',
    href: '/get-started',
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
        href: '/',
      },
      color: '#3547E5',
    },
    {
      title: 'Clean up your code!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Pro tip',
      link: {
        title: 'Learn more',
        href: '/',
      },
      color: '#0B0D11',
    },
  ],
};

export const dummyMarketplaceSearch = {
  title: 'Explore Marketplace',
  placeholder: 'Search...',
};

export const dummyMarketplaceList = {
  title: 'Trending & Last Update',
  placeholder: 'There are no items available...',
  pagination: 4,
  items: [
    {
      title: 'GraphQL Modules 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 1',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
      },
    },
    {
      title: 'GraphQL Modules 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 2',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
      },
    },
    {
      title: 'GraphQL Modules 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 3',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
      },
    },
    {
      title: 'GraphQL Modules 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 4',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
      },
    },
    {
      title: 'GraphQL Modules 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
          image: {
            src: marketplaceListImage,
            alt: 'GraphQL Jit Logo',
          },
          description: {
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 5',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
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
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 6',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
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
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 7',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
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
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 8',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
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
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 9',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
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
            label: 'Apr 20, 2021 - Latest Update',
            href: 'https://google.com',
            title: 'Example Link Title',
          },
        },
        content: 'Lipsum 10',
      },
      update: '2021-05-07T10:14:55.884Z',
      stars: 10394,
      image: {
        src: marketplaceListImage,
        alt: 'GraphQL Modules Logo',
      },
      link: {
        title: 'Learn more about GraphQL Jit',
        href: '/',
      },
    },
  ],
};

export const dummyDocsLegend = {
  items: [
    ['focus-1', 0, 'Focus 1'],
    ['focus-2', 1, 'Focus 2'],
    ['focus-3', 2, 'Focus 3'],
    ['focus-4', 0, 'Focus 4'],
  ],
  prev: {
    href: '#',
    name: 'Article 1',
  },
  current: {
    href: '#',
    name: 'TypeScript GraphQL Files Modules Example',
  },
  next: {
    href: '#',
    name: 'Article 3',
  },
};

export const dummyDocsNavigation = {
  items: [
    {
      name: 'Getting Started',
      href: '',
      isPage: false,
      isCategory: true,
      paths: [
        {
          name: 'First steps',
          href: 'docs',
          isPage: true,
          isCategory: false,
        },
        {
          name: 'Know How',
          href: 'know-how',
          isPage: true,
          isCategory: false,
        },
      ],
    },
    {
      name: 'Typescript',
      href: '',
      isPage: false,
      isCategory: true,
      paths: [
        {
          name: 'Types',
          href: 'types',
          isPage: false,
          isCategory: false,
          paths: [
            {
              name: 'Typescript One',
              href: 'ts-one',
              isPage: false,
              paths: [
                {
                  name: 'Version A',
                  href: 'ts-a',
                  isPage: true,
                },
                {
                  name: 'Version B',
                  href: 'ts-b',
                  isPage: true,
                },
              ],
            },
            {
              name: 'Typescript Two',
              href: 'ts-two',
              isPage: true,
            },
          ],
        },
        {
          name: 'Interfaces',
          href: 'interfaces',
          isPage: true,
        },
      ],
    },
    {
      name: 'Advanced',
      href: '',
      isPage: false,
      isCategory: true,
      paths: [
        {
          name: 'Examples',
          href: 'examples',
          isPage: true,
        },
      ],
    },
  ],
};

export const dummyDocsContent = (
  <>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <a href="#">This is a link</a>
    <hr />
    <h1 id="focus-1">Focus 1</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <hr />
    <h2>API Reference</h2>
    <h3>
      <code>useTypeImports</code>
    </h3>
    <p
      dangerouslySetInnerHTML={{
        __html: `
          Will use <code>import type { }</code> rather than 
          <code>import { }</code> when importing only types. 
          This gives compatibility with TypeScript's 
          "importsNotUsedAsValues": "error" option
        `,
      }}
    />
    <img
      src="https://www.apollographql.com/blog/static/1_4If-QCJPmB6SJV9EyNTsmw-bcd013c4bd08d09d2a2ac86f5e01a9e4.png"
      alt="GraphQL Schema"
    />
    <blockquote
      dangerouslySetInnerHTML={{
        __html: `
          <strong>Note:</strong> this plugin generates code that intended for 
          <code>apollo-client</code> @ <code>&gt; v3</code> only.
          `,
      }}
    />
    <hr />
    <h2 id="focus-2">Focus 2</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <h3 id="focus-3">Focus 3</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <h2 id="focus-4">Focus 4</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit, erat
      non mattis feugiat, nisi sem commodo lacus, in vehicula nibh quam vitae
      metus.
    </p>
  </>
);
