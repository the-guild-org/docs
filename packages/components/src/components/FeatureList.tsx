import React from 'react';

import { Container, Title, Item, Items, Wrapper } from './FeatureList.styles';

import { IFeatureListProps } from '../types/components';

export const FeatureList: React.FC<IFeatureListProps> = ({ title, items, ...restProps }) => (
  <Wrapper {...restProps.wrapperProps}>
    <Container {...restProps.containerProps}>
      {title && <Title {...restProps.titleProps}>{title}</Title>}
      <Items>
        {items.map((item, index) => (
          <Item key={`feature-${index}`}>
            <img src={item.image.src} alt={item.image.alt}  {...restProps.itemImageProps}/>
            <h3  {...restProps.itemTitleProps}>{item.title}</h3>
            <p  {...restProps.itemDescriptionProps}>{item.description}</p>
          </Item>
        ))}
      </Items>
    </Container>
  </Wrapper>
);
