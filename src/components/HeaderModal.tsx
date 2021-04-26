import React from 'react';

import { Modal } from './Modal';

import {
  ProductCategory,
  ProductList,
  ProductThumbnail,
  ProductImage
} from './HeaderModal.styles';


import { IHeaderModalProps } from './types';
import { productThemedIcons } from '../helpers/assets';
import { ThemeContext } from '../helpers/theme';

export const HeaderModal: React.FC<IHeaderModalProps> = ({ title, modalOpen, onCancelModal }) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const productIcons = productThemedIcons(isDarkTheme || false);

  const productCategories = [{
    title: 'Products',
    items: [{
      title: 'Hive',
      description: 'Schema Registry for your GraphQL Workflows',
      link: 'https://graphql-hive.com/',
      image: productIcons.hive
    }],
  }, {
    title: 'Open Source',
    items: [{
      title: 'Envelop',
      description: 'Modern GraphQL Framework',
      link: 'https://github.com/dotansimha/envelop/',
      image: productIcons.envelop
    }, {
      title: 'Inspector',
      description: 'Schema management tool',
      link: 'https://graphql-inspector.com/',
      image: productIcons.inspector
    }, {
      title: 'Code Generator',
      description: 'Generate anything from GraphQL',
      link: 'https://graphql-code-generator.com/',
      image: productIcons.codeGen
    }, {
      title: 'CLI',
      description: 'Command line tool for common GraphQL workflows',
      link: 'https://github.com/Urigo/graphql-cli',
      image: productIcons.cli
    }, {
      title: 'ESLint',
      description: 'Customisable ESLint parser, plugin and set rules for GraphQL',
      link: 'https://github.com/dotansimha/graphql-eslint/',
      image: productIcons.eslint
    }, {
      title: 'Scalars',
      description: 'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
      link: 'https://graphql-scalars.dev/',
      image: productIcons.scalars
    }, {
      title: 'Mesh',
      description: 'Query anything, run anywhere',
      link: 'https://graphql-mesh.com/',
      image: productIcons.mesh
    }, {
      title: 'Modules',
      description: 'Enterprise Grade Tooling For Your GraphQL Server',
      link: 'https://graphql-modules.com/',
      image: productIcons.modules
    }, {
      title: 'Tools',
      description: 'A set of utilities for faster GraphQL development',
      link: 'https://graphql-tools.com/',
      image: productIcons.tools
    }, {
      title: 'SOFA',
      description: 'Generate RESTful APIs from your GraphQL Server',
      link: 'https://sofa-api.com/',
      image: productIcons.sofa
    }, {
      title: 'Angular',
      description: 'A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server',
      link: 'https://apollo-angular.com/',
      image: productIcons.angular
    }, {
      title: 'Config',
      description: 'One configuration for all your GraphQL tools',
      link: 'https://graphql-config.com/introduction',
      image: productIcons.config
    }, {
      title: 'WhatsApp',
      description: 'Full Stack, open source tutorial',
      link: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
      image: productIcons.whatsapp
    }, {
      title: 'Stencil',
      description: 'A fully-featured, production ready caching GraphQL client for Stencil and every GraphQL server',
      link: 'https://github.com/ardatan/stencil-apollo',
      image: productIcons.stencil
    }]
  }];

  return (
    <Modal
      title={title}
      placement="bottom"
      visible={modalOpen}
      onCancel={() => onCancelModal()}
    >
      {productCategories.map((category, index) => (
        <ProductCategory key={index}>
          <h3>{category.title}</h3>
          <ProductList>
            {category.items.map(product => (
              <ProductThumbnail
                key={product.title}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProductImage>
                  <img src={product.image} alt={`${product.title} logo`} />
                  <img src={product.image} alt={`${product.title} blurred logo`} />
                </ProductImage>
                <span>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                </span>
              </ProductThumbnail>
            ))}
          </ProductList>
        </ProductCategory>
      ))}
    </Modal>
  );
};
