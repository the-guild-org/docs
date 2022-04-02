import React, { FC, useState } from 'react';
import { buildSchema } from 'graphql';

import { ISchemaPageProps, IEditorProps } from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import {
  Wrapper,
  Container,
  Header,
  Title,
  ButtonWrapper,
  Button,
  EditorGroupWrapper,
  EditorWrapper,
  EditorHeader,
  Frameworks,
} from './SchemaTypes.styles';
import { Tag, TagsContainer } from './Tag';
import {
  SchemaEditor,
  ExecutableDocumentEditor,
} from '../../../monaco-graphql-editor/src';

const FrameworkList = ({ options }: { options: any[] }): JSX.Element => {
  const list = options.reduce((prev: string, curr: string) => [
    prev,
    <span key={prev} />,
    curr,
  ]);

  return <Frameworks>{list}</Frameworks>;
};

const Editor: FC<Omit<IEditorProps, 'schema' | 'operations'>> = ({
  title,
  frameworks = [],
  icon,
  image,
  children,
}) => (
  <EditorWrapper className="wrapper">
    <EditorHeader>
      <div>
        {image && <img src={image} alt="logo" />}
        <span>
          {title && <p>{title}</p>}
          {frameworks.length > 0 && <FrameworkList options={frameworks} />}
        </span>
      </div>
      <Button type="button" onClick={() => console.log('clicked')}>
        <img src={icon} alt=">" />
      </Button>
    </EditorHeader>
    {children}
  </EditorWrapper>
);

export const SchemaPage: FC<ISchemaPageProps> = ({
  schemaName,
  tags = [],
  editorData,
}) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  const [schemaObj, setSchemaObj] = useState(() =>
    buildSchema(editorData[0].schema!)
  );

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>{schemaName}</Title>
          <TagsContainer>
            {tags.map((tagName) => (
              <Tag key={tagName}>{tagName}</Tag>
            ))}
          </TagsContainer>
        </Header>
        <ButtonWrapper>
          <Button type="button" onClick={() => console.log('clicked')}>
            <img src={marketplaceAssets.share} alt="share" />
          </Button>
          <Button type="button" onClick={() => console.log('clicked')}>
            <img src={marketplaceAssets.moreVertical} alt="more" />
          </Button>
        </ButtonWrapper>
      </Container>
      <EditorGroupWrapper>
        <Editor {...editorData[0]} icon={marketplaceAssets.caret}>
          <SchemaEditor
            schema={editorData[0].schema}
            onSchemaChange={(newSchemaObject) => {
              setSchemaObj(newSchemaObject);
            }}
          />
        </Editor>

        <Editor {...editorData[1]} icon={marketplaceAssets.caret}>
          <ExecutableDocumentEditor
            schema={schemaObj}
            defaultValue={editorData[1].operations!}
          />
        </Editor>

        {editorData.slice(2).map((data) => (
          <Editor
            {...data}
            key={data.title || 'output'}
            icon={marketplaceAssets.caret}
          >
            <SchemaEditor schema={data.schema} />
          </Editor>
        ))}
      </EditorGroupWrapper>
    </Wrapper>
  );
};
