import React, { isValidElement } from 'react';

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
  ...restProps
}) => (
  <Wrapper {...restProps.wrapperProps}>
    <Container {...restProps.containerProps}>
      <Gradient colors={colors} {...restProps.gradientProps}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Gradient>
      <Content hasImage={!!image}>
        <Info>
          <h1 {...restProps.titleProps}>{title}</h1>
          <p {...restProps.descriptionProps}>{description}</p>
        </Info>
        <CTA>
          {link &&
            toArray(link).map((link) => (
              <a
                key={`${link.href}${link.children}`}
                {...link}
                {...restProps.linkProps}
              />
            ))}
          {version && isValidElement(version) ? (
            version
          ) : (
            <span {...restProps.versionProps}>{version}</span>
          )}
        </CTA>
        {image &&
          (React.isValidElement(image) ? (
            image
          ) : (
            <Image src={image.src} alt={image.alt} {...restProps.imageProps} />
          ))}
      </Content>
    </Container>
  </Wrapper>
);

function toArray<T>(input: T | T[]) {
  return Array.isArray(input) ? input : [input];
}
