import React from 'react';

import { Container, Title, Item, Items, Wrapper } from './InfoList.styles';

import { IInfoListProps } from '../types/components';

export const InfoList: React.FC<IInfoListProps> = ({ title, items, ...restProps }) => (
  <Wrapper {...restProps.wrapperProps}>
    <Container {...restProps.containerProps}>
      {title && <Title {...restProps.titleProps}>{title}</Title>}
      <Items>
        {items.map((item, index) => (
          <Item key={`info-${index}`}>
            <h3 {...restProps.itemTitleProps}>{item.title}</h3>
            <p {...restProps.itemDescriptionProps}>{item.description}</p>
            {item.link && <a {...item.link} {...restProps.itemLinkProps}/>}
          </Item>
        ))}
      </Items>
    </Container>
  </Wrapper>
);
