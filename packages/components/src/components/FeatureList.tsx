import React from 'react';

import { Container, Title, Item, Items, Wrapper } from './FeatureList.styles';

import { IFeatureListProps } from '../types/components';

export const FeatureList: React.FC<IFeatureListProps> = ({ title, items }) => (
  <Wrapper>
    <Container>
      {title && <Title>{title}</Title>}
      <Items>
        {items.map((item) => (
          <Item key={item.title}>
            <img src={item.image.src} alt={item.image.alt} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Item>
        ))}
      </Items>
    </Container>
  </Wrapper>
);
