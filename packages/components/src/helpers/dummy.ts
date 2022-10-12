import dedent from 'dedent';
import featureListImage1 from '../static/dummy/envelop/features-pluggable.png';
import featureListImage2 from '../static/dummy/envelop/features-performant.png';
import featureListImage3 from '../static/dummy/envelop/features-modern.png';
import heroIllustrationImage from '../static/dummy/envelop/communication.png';
import marketplaceListImage from '../static/dummy/marketplace/logo-modules.svg';
import yogaImage from '../static/illustrations/yoga.svg';
import {
  IFeatureListProps,
  IHeroGradientProps,
  IHeroIllustrationProps,
  IHeroMarketplaceProps,
  IHeroVideoProps,
  IInfoListProps,
  IMarketplaceListProps,
  IMarketplaceSearchProps,
  ISchemaPageProps,
  ISubheaderProps,
} from '../types/components';
import { CardsColorfulProps } from '../components/cards-colorful';

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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.',
      link: {
        children: 'Documentation',
        title: 'Read the documentation',
        href: '#',
      },
    },
    {
      title: 'GitHub integration',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.',
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
        title: 'Learn more about GraphQL Jit',
      },
    },
  ],
};

export const dummyMarketplaceSearch: IMarketplaceSearchProps = {
  title: 'Explore Marketplace',
  tagsFilter: [
    'typescript',
    'csharp',
    'flow',
    'java',
    'utilities',
    'mongodb',
    'angular',
    'react',
    'svelte',
    'next',
    'apollo',
    'urql',
    'vue',
    'kotlin',
    'android',
    'reason',
    'relay',
    'jsdoc',
    'plugin',
    'preset',
  ],
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

const dummySchema = dedent(/* GraphQL */ `
  type Query {
    ping: Boolean
    me: User!
  }

  " represents a valid email "
  scalar Email

  """
  Represents a simple user
  """
  type User {
    id: ID!
    email: Email!
    profile: Profile!
  }

  type Profile {
    name: String
    age: Int
  }
`);

const dummyOperations = dedent(/* GraphQL */ `
  query Me {
    me {
      id
      profile {
        name
      }
    }
    ping
  }

  fragment UserFields on User {
    profile {
      name
    }
  }
`);

export const dummySchemaPage: Omit<ISchemaPageProps, 'editorData'> & {
  editorData: Omit<ISchemaPageProps['editorData'][number], 'children'>[];
} = {
  schemaName: 'Schema Type 1',
  tags: ['TypeScript', 'Frontend', 'Backend'],
  editorData: [
    {
      title: 'schema.graphql',
      frameworks: ['TS', 'React', 'Frontend'],
      schema: dummySchema,
      image: marketplaceListImage,
    },
    {
      title: 'operation.graphql',
      frameworks: [],
      operations: dummyOperations,
      image: marketplaceListImage,
    },
    {
      title: 'codegen.yml',
      frameworks: [],
      schema: dummySchema,
      image: marketplaceListImage,
    },
    {
      title: '',
      schema: dummySchema,
    },
  ],
};
