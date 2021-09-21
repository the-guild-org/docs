import React from 'react';

import IllustrationDesktop from '../static/illustrations/marketplace-desktop.png';
import IllustrationMobile from '../static/illustrations/marketplace-mobile.png';
import CubeTL from '../static/illustrations/marketplace-cube-tl.png';
import CubeTR from '../static/illustrations/marketplace-cube-tr.png';
import CubeBL from '../static/illustrations/marketplace-cube-bl.png';
import CubeBR from '../static/illustrations/marketplace-cube-br.png';

import {
  Container,
  Content,
  CTA,
  Cubes,
  Image,
  Info,
  Wrapper,
  Gradient,
} from './HeroMarketplace.styles';

import { IHeroMarketplaceProps } from '../types/components';

export const HeroMarketplace: React.FC<IHeroMarketplaceProps> = ({
  title,
  description,
  link,
  ...restProps
}) => (
  <Wrapper {...restProps.wrapperProps}>
    <Container {...restProps.containerProps}>
      <Gradient colors={['#FF34AE', '#1CC8EE']}>
        <span></span>
        <span></span>
        <span></span>
      </Gradient>
      <Cubes>
        <img src={CubeTL} alt="Cube" />
        <img src={CubeTR} alt="Cube" />
        <img src={CubeBR} alt="Cube" />
        <img src={CubeBL} alt="Cube" />
      </Cubes>
      <Content>
        <Image {...restProps.imageProps}>
          <source media="(min-width:768px)" srcSet={IllustrationDesktop} />
          <img src={IllustrationMobile} alt="Products List" />
        </Image>
        <Info>
          <h2 {...restProps.titleProps}>{title}</h2>
          <p {...restProps.descriptionProps}>{description}</p>
          {link && (
            <CTA>
              <a {...link} {...restProps.linkProps} />
            </CTA>
          )}
        </Info>
      </Content>
    </Container>
  </Wrapper>
);
