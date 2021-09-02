import React from 'react';

import TableItems from "./TableItems";

import typescriptLogo from "../static/icons/typescript.svg";

import { Examples } from './ExampleList.styles';

const ExampleList = () => {
  return (
    <Examples>
      <TableItems isDefault={false} {...dummyData} />
      <TableItems isDefault={false} {...dummyData} />
    </Examples>
  );
};

const dummyData = {
  header: {
    icon: typescriptLogo,
    text: 'Typescript'
  },
  pagination: 0,
  items: [
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
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
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
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
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
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
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
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
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
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
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
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
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
    {
      title: 'GraphQL Modules 1',
      tags: ['test'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      modal: {
        header: {
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
      link: {
        href: '#',
        target: '_blank',
        rel: 'noopener noreferrer',
        title: 'Learn more about GraphQL Jit',
      },
    },
  ]
};

export default ExampleList;
