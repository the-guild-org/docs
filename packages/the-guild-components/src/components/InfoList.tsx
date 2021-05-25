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
            {item.link && (
              <a href={item.link.href} title={item.link.title}>
                {item.link.label}
              </a>
            )}
          </Item>
        ))}
      </Items>
    </Container>
  </Wrapper>
);
