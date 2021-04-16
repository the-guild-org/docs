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
    title: 'Category Name or tags or popularity',
    items: [{
      title: 'Envelop',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.envelop
    }, {
      title: 'Hive',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.hive
    }, {
      title: 'Inspector',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.inspector
    }, {
      title: 'Code Generator',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.codeGen
    }, {
      title: 'CLI',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.cli
    }, {
      title: 'Scalars',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.scalars
    }]
  },
  {
    title: 'Category Name or tags or popularity',
    items: [{
      title: 'Mesh',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.mesh
    }, {
      title: 'Modules',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.modules
    }, {
      title: 'Tools',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.tools
    }, {
      title: 'Sofa',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.sofa
    }, {
      title: 'Angular',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.angular
    }, {
      title: 'Config',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.config
    }, {
      title: 'Whatsapp',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.whatsapp
    }, {
      title: 'Stencil',
      description: 'Modern GraphQL Framework',
      link: '#',
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
