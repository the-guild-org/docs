import React from 'react';

import {IEditorProps, ISchemaPageProps} from '../types/components';
import {useThemeContext} from '../helpers/theme';
import {marketplaceThemedAssets} from '../helpers/assets';
import {
    Button,
    ButtonWrapper,
    Container,
    EditorGroupWrapper,
    EditorHeader,
    EditorWrapper,
    Frameworks,
    Header,
    Title,
    Wrapper
} from './SchemaPage.styles';
import {Tag, TagsContainer} from './Tag';
import {SchemaEditor} from '@theguild/editor';

export const SchemaPage: React.FC<ISchemaPageProps> = ({
                                                           schemaName,
                                                           tags,
                                                           editorData
                                                       }) => {
    const {isDarkTheme} = useThemeContext();
    const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);

    return (
        <Wrapper>
            <Container>
                <Header>
                    <Title>{schemaName}</Title>
                    <TagsContainer>
                        {tags &&
                        tags.length > 0 &&
                        tags.map((tagName) => <Tag key={tagName}>{tagName}</Tag>)}
                    </TagsContainer>
                </Header>
                <ButtonWrapper>
                    <Button type="button" onClick={() => console.log('clicked')}>
                        <img src={marketplaceAssets.share} alt="share"/>
                    </Button>
                    <Button type="button" onClick={() => console.log('clicked')}>
                        <img src={marketplaceAssets.moreVertical} alt="more"/>
                    </Button>
                </ButtonWrapper>
            </Container>
            <EditorGroupWrapper>
                {(editorData as Array<IEditorProps>).map((data) => (
                    <Editor
                        key={data.title || 'output'}
                        title={data.title}
                        frameworks={data.frameworks}
                        schema={data.schema}
                        image={data.image}
                        icon={marketplaceAssets.caret}
                    />
                ))}
            </EditorGroupWrapper>
        </Wrapper>
    );
};

const FrameworkList = ({options}: { options: any }): JSX.Element => {
    const list = options.reduce((prev: string, curr: string) => [
        prev,
        <span key={prev}></span>,
        curr
    ]);

    return <Frameworks>{list}</Frameworks>;
};

const Editor: React.FC<IEditorProps> = ({
                                            title, frameworks,
                                            schema, icon, image
                                        }) => (
    <EditorWrapper className="wrapper">
        <EditorHeader>
            <div>
                {image && <img src={image} alt="logo"/>}
                <span>
          {title && <p>{title}</p>}
                    {frameworks && frameworks.length > 0 && (
                        <FrameworkList options={frameworks}/>
                    )}
        </span>
            </div>
            <Button type="button" onClick={() => console.log('clicked')}>
                <img src={icon} alt=">"/>
            </Button>
        </EditorHeader>
        <SchemaEditor schema={schema}/>
    </EditorWrapper>
);
