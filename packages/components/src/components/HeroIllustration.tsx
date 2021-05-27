import React from 'react';

import {
  Container,
  Illustration,
  Info,
  Wrapper,
} from './HeroIllustration.styles';

import { IHeroIllustrationProps } from '../types/components';

export const HeroIllustration: React.FC<IHeroIllustrationProps> = ({
  title,
  description,
  link,
  image,
  flipped,
}) => (
  <Wrapper>
    <Container flipped={flipped}>
      <Illustration flipped={flipped}>
        <img src={image.src} alt={image.alt} />
      </Illustration>
      <Info>
        <h2>{title}</h2>
        <p>{description}</p>
        {link && <a {...link} />}
      </Info>
    </Container>
  </Wrapper>
);
