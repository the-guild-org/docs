import React from 'react';

import { ISchemaPageProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import { Wrapper, Container, Header, Title, ButtonWrapper, Button, EditorGroupWrapper, EditorWrapper, EditorHeader } from './SchemaTypes.styles';
import { Tag, TagsContainer } from './Tag';
import { SchemaEditor } from '../../../monaco-graphql-editor/src/editor/SchemaEditor';

export const SchemaType: React.FC<ISchemaPageProps> = ({ schemaName, tags, schema }) => {
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
            <EditorGroupWrapper>
                <EditorWrapper>
                    <EditorHeader>
                        <div>
                            <img src="" alt="schema.graphql" />
                            <span>
                                <p>schema.graphql</p>
                                <p>TS . React . Frontend</p>
                            </span>
                        </div>
                        <Button
                            type="button"
                            onClick={() => console.log('clicked')}
                        >
                            <img src={marketplaceAssets.caret} alt=">" />
                        </Button>
                    </EditorHeader>
                    <SchemaEditor schema={schema} />
                </EditorWrapper>
                <EditorWrapper>
                    <SchemaEditor schema={schema} />
                </EditorWrapper>
                <EditorWrapper>
                    <SchemaEditor schema={schema} />
                </EditorWrapper>
                <EditorWrapper>
                    <SchemaEditor schema={schema} />
                </EditorWrapper>
            </EditorGroupWrapper>
      </Wrapper>
  )
};
