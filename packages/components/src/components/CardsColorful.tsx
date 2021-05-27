import React from 'react';

import { Card, CardInfo, Container, Wrapper } from './CardsColorful.styles';

import { ICardsColorfulProps } from '../types/components';

export const CardsColorful: React.FC<ICardsColorfulProps> = ({ cards }) => (
  <Wrapper>
    <Container>
      {cards.map((card) => (
        <Card key={card.title} color={card.color} {...card.link}>
          <CardInfo>
            <h2>{card.category}</h2>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </CardInfo>
        </Card>
      ))}
    </Container>
  </Wrapper>
);
