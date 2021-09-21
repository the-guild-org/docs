import React from 'react';

import { Card, CardInfo, Container, Wrapper } from './CardsColorful.styles';

import { ICardsColorfulProps } from '../types/components';

export const CardsColorful: React.FC<ICardsColorfulProps> = ({
  cards,
  ...restProps
}) => (
  <Wrapper {...restProps.wrapperProps}>
    <Container {...restProps.containerProps}>
      {cards.map((card) => (
        <Card
          key={card.title}
          color={card.color}
          {...card.link}
          {...restProps.cardProps}
        >
          <CardInfo>
            <h2 {...restProps.cardCategoryProps}>{card.category}</h2>
            <h3 {...restProps.cardTitleProps}>{card.title}</h3>
            <p {...restProps.cardDescriptionProps}>{card.description}</p>
          </CardInfo>
        </Card>
      ))}
    </Container>
  </Wrapper>
);
