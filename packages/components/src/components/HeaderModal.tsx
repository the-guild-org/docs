import React from 'react';
import { Modal } from './Modal';
import {
  ProductCategory,
  ProductList,
  ProductThumbnail,
  ProductImage,
} from './HeaderModal.styles';
import type { IHeaderModalProps } from '../types/components';
import { PRODUCTS } from '../helpers/assets';

// Copy array because splice mutate original array
const products = [...PRODUCTS];
const hiveIndex = PRODUCTS.findIndex((product) => product.children === 'Hive');
const [hive] = products.splice(hiveIndex, 1);

const productCategories = [
  { title: 'Products', items: [hive] },
  { title: 'Open Source', items: products },
];

export const HeaderModal: React.FC<IHeaderModalProps> = ({
  title,
  modalOpen,
  onCancelModal,
  ...restProps
}) => {
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
                key={product.children}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                {...restProps.linkProps}
              >
                <ProductImage>
                  <img
                    src={product.logo}
                    alt={`${product.children} logo`}
                    {...restProps.imageProps}
                  />
                  <img
                    src={product.logo}
                    alt={`${product.children} blurred logo`}
                    {...restProps.imageProps}
                  />
                </ProductImage>
                <span>
                  <h4 {...restProps.titleProps}>{product.children}</h4>
                  <p {...restProps.descriptionProps}>{product.title}</p>
                </span>
              </ProductThumbnail>
            ))}
          </ProductList>
        </ProductCategory>
      ))}
    </Modal>
  );
};
