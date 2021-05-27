import React from 'react';

import { Container, Title, Item, Items, Wrapper } from './InfoList.styles';

import { IInfoListProps } from '../types/components';

export const InfoList: React.FC<IInfoListProps> = ({ title, items }) => (
  <Wrapper>
    <Container>
      {title && <Title>{title}</Title>}
      <Items>
        {items.map((item) => (
          <Item key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.link && <a {...item.link} />}
          </Item>
        ))}
      </Items>
    </Container>
  </Wrapper>
);
