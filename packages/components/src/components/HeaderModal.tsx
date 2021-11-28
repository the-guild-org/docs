import React from 'react';

import { Modal } from './Modal';

import {
  ProductCategory,
  ProductList,
  ProductThumbnail,
  ProductImage,
} from './HeaderModal.styles';

import { IHeaderModalProps } from '../types/components';
import { logoThemedIcons } from '../helpers/assets';
import { useThemeContext } from '../helpers/theme';

export const HeaderModal: React.FC<IHeaderModalProps> = ({
  title,
  modalOpen,
  onCancelModal,
  ...restProps
}) => {
  const { isDarkTheme } = useThemeContext();
  const logoIcons = logoThemedIcons(isDarkTheme || false);

  const productCategories = [
    {
      title: 'Products',
      items: [
        {
          title: 'Hive',
          description: 'Schema Registry for your GraphQL Workflows',
          link: 'https://graphql-hive.com/',
          image: logoIcons.hive,
        },
      ],
    },
    {
      title: 'Open Source',
      items: [
        {
          title: 'Envelop',
          description: 'Modern GraphQL Framework',
          link: 'https://www.envelop.dev/',
          image: logoIcons.envelop,
        },
        {
          title: 'Inspector',
          description: 'Schema management tool',
          link: 'https://graphql-inspector.com/',
          image: logoIcons.inspector,
        },
        {
          title: 'Code Generator',
          description: 'Generate anything from GraphQL',
          link: 'https://graphql-code-generator.com/',
          image: logoIcons.codeGen,
        },
        {
          title: 'Mesh',
          description: 'Query anything, run anywhere',
          link: 'https://graphql-mesh.com/',
          image: logoIcons.mesh,
        },
        {
          title: 'Tools',
          description: 'A set of utilities for faster GraphQL development',
          link: 'https://graphql-tools.com/',
          image: logoIcons.tools,
        },
        {
          title: 'Helix',
          description: 'A highly evolved GraphQL HTTP Server',
          link: 'https://graphql-helix.com',
          image: logoIcons.helix,
        },
        {
          title: 'ESLint',
          description:
            'Customisable ESLint parser, plugin and set rules for GraphQL',
          link: 'https://github.com/dotansimha/graphql-eslint/',
          image: logoIcons.eslint,
        },
        {
          title: 'Scalars',
          description:
            'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
          link: 'https://graphql-scalars.dev/',
          image: logoIcons.scalars,
        },
        {
          title: 'Modules',
          description: 'Enterprise Grade Tooling For Your GraphQL Server',
          link: 'https://graphql-modules.com/',
          image: logoIcons.modules,
        },
        {
          title: 'Config',
          description: 'One configuration for all your GraphQL tools',
          link: 'https://graphql-config.com/introduction',
          image: logoIcons.config,
        },
        {
          title: 'Shield',
          description:
            'GraphQL Permissions Framework For Complex Authorisation Systems',
          link: 'https://www.graphql-shield.com/',
          image: logoIcons.shield,
        },
        {
          title: 'Swift',
          description: 'A GraphQL client that lets you forget about GraphQL',
          link: 'https://www.swift-graphql.com/',
          image: logoIcons.swift,
        },
        {
          title: 'SOFA',
          description: 'Generate RESTful APIs from your GraphQL Server',
          link: 'https://sofa-api.com/',
          image: logoIcons.sofa,
        },
        {
          title: 'CLI',
          description: 'Command line tool for common GraphQL workflows',
          link: 'https://www.graphql-cli.com/',
          image: logoIcons.cli,
        },
        {
          title: 'Angular',
          description:
            'A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server',
          link: 'https://apollo-angular.com/',
          image: logoIcons.angular,
        },
        {
          title: 'WhatsApp',
          description: 'Full Stack, open source tutorial',
          link: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
          image: logoIcons.whatsapp,
        },
        {
          title: 'Stencil',
          description:
            'A fully-featured, production ready caching GraphQL client for Stencil and every GraphQL server',
          link: 'https://github.com/ardatan/stencil-apollo',
          image: logoIcons.stencil,
        },
      ],
    },
  ];

  return (
    <Modal
      title={title}
      placement="bottom"
      visible={modalOpen}
      onCancel={() => onCancelModal()}
      {...restProps.modalProps}
    >
      {productCategories.map((category, index) => (
        <ProductCategory key={index}>
          <h3 {...restProps.categoryTitleProps}>{category.title}</h3>
          <ProductList>
            {category.items.map((product) => (
              <ProductThumbnail
                key={product.title}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                {...restProps.linkProps}
              >
                <ProductImage>
                  <img
                    src={product.image}
                    alt={`${product.title} logo`}
                    {...restProps.imageProps}
                  />
                  <img
                    src={product.image}
                    alt={`${product.title} blurred logo`}
                    {...restProps.imageProps}
                  />
                </ProductImage>
                <span>
                  <h4 {...restProps.titleProps}>{product.title}</h4>
                  <p {...restProps.descriptionProps}>{product.description}</p>
                </span>
              </ProductThumbnail>
            ))}
          </ProductList>
        </ProductCategory>
      ))}
    </Modal>
  );
};
