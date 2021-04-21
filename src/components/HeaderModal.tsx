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
      description: 'Modern GraphQL Framework',
      link: 'https://graphql-hive.com/',
      image: productIcons.hive
    }],
  }, {
    title: 'Open Source',
    items: [{
      title: 'Envelop',
      description: 'Modern GraphQL Framework',
      link: 'https://github.com/dotansimha/envelop',
      image: productIcons.envelop
    }, {
      title: 'Inspector',
      description: 'Modern GraphQL Framework',
      link: 'https://graphql-inspector.com/',
      image: productIcons.inspector
    }, {
      title: 'Code Generator',
      description: 'Modern GraphQL Framework',
      link: 'https://www.graphql-code-generator.com/',
      image: productIcons.codeGen
    }, {
      title: 'CLI',
      description: 'Modern GraphQL Framework',
      link: 'https://github.com/Urigo/graphql-cli',
      image: productIcons.cli
    }, {
      title: 'ESLint',
      description: 'Modern GraphQL Framework',
      link: 'https://github.com/dotansimha/graphql-eslint/',
      image: productIcons.eslint
    }, {
      title: 'Scalars',
      description: 'Modern GraphQL Framework',
      link: 'https://www.graphql-scalars.dev/',
      image: productIcons.scalars
    }, {
      title: 'Mesh',
      description: 'Modern GraphQL Framework',
      link: 'https://www.graphql-mesh.com/',
      image: productIcons.mesh
    }, {
      title: 'Modules',
      description: 'Modern GraphQL Framework',
      link: 'https://graphql-modules.com/',
      image: productIcons.modules
    }, {
      title: 'Tools',
      description: 'Modern GraphQL Framework',
      link: 'https://www.graphql-tools.com/',
      image: productIcons.tools
    }, {
      title: 'Sofa',
      description: 'Modern GraphQL Framework',
      link: 'https://www.sofa-api.com/',
      image: productIcons.sofa
    }, {
      title: 'Angular',
      description: 'Modern GraphQL Framework',
      link: 'https://apollo-angular.com/',
      image: productIcons.angular
    }, {
      title: 'Config',
      description: 'Modern GraphQL Framework',
      link: 'https://graphql-config.com/introduction',
      image: productIcons.config
    }, {
      title: 'WhatsApp',
      description: 'Modern GraphQL Framework',
      link: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
      image: productIcons.whatsapp
    }, {
      title: 'Stencil',
      description: 'Modern GraphQL Framework',
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
