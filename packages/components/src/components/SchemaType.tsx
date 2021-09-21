import React from 'react';

import { ISchemaPageProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import { Wrapper, Container, Header, Title, ButtonWrapper, Button, EditorGroupWrapper, EditorWrapper, EditorHeader, Frameworks } from './SchemaTypes.styles';
import { Tag, TagsContainer } from './Tag';
import { SchemaEditor } from '../../../monaco-graphql-editor/src/editor/SchemaEditor';

const FrameworkList = ({ options }) => {
    const list = options.reduce((prev : string, curr : string) => [prev, <span key={prev}></span>, curr]);

    return <Frameworks>{list}</Frameworks>
};

const Editor = ({ title, frameworks, schema, icon, image }) => (
    <EditorWrapper className='wrapper'>
        <EditorHeader>
            <div>
                <img src={image} alt="logo" />
                <span>
                    <p>{title}</p>
                    <FrameworkList options={frameworks} />
                </span>
            </div>
            <Button
                type="button"
                onClick={() => console.log('clicked')}
            >
                <img src={icon} alt=">" />
            </Button>
        </EditorHeader>
        <SchemaEditor schema={schema} />
    </EditorWrapper>
);

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
                <Editor title="schema.graphql" frameworks={['TS', 'React', 'Frontend']} schema={schema} icon={marketplaceAssets.caret} />
                <Editor title="operation.graphql" frameworks={['TS', 'React', 'Frontend']} schema={schema} icon={marketplaceAssets.caret} />
                <Editor title="codegen.yml" frameworks={['TS', 'React', 'Frontend']} schema={schema} icon={marketplaceAssets.caret} />
                <Editor title="schema.graphql" frameworks={['TS', 'React', 'Frontend']} schema={schema} icon={marketplaceAssets.caret} />
            </EditorGroupWrapper>
      </Wrapper>
  )
};
