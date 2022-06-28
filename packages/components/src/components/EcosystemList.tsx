import React from 'react';
import { Container, ProductCategory, ProductList, ProductThumbnail, ProductImage } from './Ecosystem.styles';
import { PRODUCTS } from '../helpers/assets';

const productCategories = [
  {
    title: 'Build GraphQL servers',
    items: PRODUCTS.filter(p =>
      ['Yoga', 'Modules', 'Envelop', 'Mesh', 'Dataloader', 'LiveQuery', 'Scalars', 'SOFA'].includes(p.children)
    ),
  },
  {
    title: 'Supercharge your workflow',
    items: PRODUCTS.filter(p =>
      ['Code Generator', 'Tools', 'Hive', 'Inspector', 'ESLint', 'Config', 'CLI'].includes(p.children)
    ),
  },
  // {
  //   title: 'Manage your schemas',
  //   items: PRODUCTS.filter((p) => ['Hive', 'Inspector'].includes(p.children)),
  // },
  {
    title: 'Build great user experience',
    items: PRODUCTS.filter(p => ['Swift', 'Angular', 'Stencil', 'KitQL'].includes(p.children)),
  },
];

export const EcosystemList: React.FC = () => {
  return (
    <Container>
      {productCategories.map((category, index) => (
        <ProductCategory key={index}>
          <h3>{category.title}</h3>
          <ProductList>
            {category.items.map(product => (
              <ProductThumbnail key={product.children} href={product.href} target="_blank" rel="noreferrer">
                <ProductImage>
                  <img src={product.logo} alt={`${product.children} logo`} />
                </ProductImage>
                <span>
                  <h4>{product.children}</h4>
                  <p>{product.title}</p>
                </span>
              </ProductThumbnail>
            ))}
          </ProductList>
        </ProductCategory>
      ))}
    </Container>
  );
};
