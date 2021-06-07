import React from 'react';

import {
  Container,
  Content,
  CTA,
  Image,
  Info,
  Wrapper,
  Gradient,
} from './HeroGradient.styles';

import { IHeroGradientProps } from '../types/components';

export const HeroGradient: React.FC<IHeroGradientProps> = ({
  title,
  description,
  link,
  version,
  colors,
  image,
}) => (
  <Wrapper>
    <Container>
      <Gradient colors={colors}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Gradient>
      <Content hasImage={!!image}>
        <Info>
          <h1>{title}</h1>
          <p>{description}</p>
        </Info>
        <CTA>
          {link && <a {...link} />}
          {version && <span>{version}</span>}
        </CTA>
        {image && <Image src={image.src} alt={image.alt} />}
      </Content>
    </Container>
  </Wrapper>
);
