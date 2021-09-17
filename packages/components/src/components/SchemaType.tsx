import React from 'react';

import { ISchemaPageProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import { Wrapper, Container, Header, Title, ButtonWrapper, Button, EditorWrapper } from './SchemaTypes.styles';
import { Tag, TagsContainer } from './Tag';

// wrap title
export const SchemaType: React.FC<ISchemaPageProps> = ({ schemaName, tags }) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);

  return (
      <Wrapper>
            <Container>
                <Header>
                    <Title>{schemaName}</Title>
                    <TagsContainer>
                        {tags.length > 0 && tags.map((tagName) => (
                            <Tag key={tagName}>{tagName}</Tag>
                        ))}
                    </TagsContainer>
                </Header>
                <ButtonWrapper>
                    <Button
                    type="button"
                    onClick={() => console.log('clicked')}
                    >
                        <img src={marketplaceAssets.share} alt="share" />
                    </Button>
                    <Button
                    type="button"
                    onClick={() => console.log('clicked')}
                    >
                        <img src={marketplaceAssets.moreVertical} alt="more" />
                    </Button>
                </ButtonWrapper>
            </Container>
            <EditorWrapper></EditorWrapper>
      </Wrapper>
  )
};
