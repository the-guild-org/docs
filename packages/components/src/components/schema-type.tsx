import { ReactElement, ReactNode, useState } from 'react';
import { ExecutableDocumentEditor, SchemaEditor } from '@theguild/monaco-graphql-editor';
import { buildSchema } from 'graphql';
import { IEditorProps, ISchemaPageProps } from '../types/components';
import { CaretSlimIcon, MoreIcon, ShareIcon } from './icons';
import { Image } from './image';
import { Tag, TagsContainer } from './tag';

const Editor = ({
  title,
  frameworks = [],
  image,
  children,
}: Omit<IEditorProps, 'schema' | 'operations'>) => {
  return (
    <div className="min-w-full max-w-full pr-px lg:min-w-[25%] lg:max-w-[25%]">
      <div
        className="
          flex
          h-[85px]
          items-center
          justify-between
          bg-gray-100
          p-3.5
          dark:bg-transparent
        "
      >
        <div className="flex items-center gap-2.5">
          {image && <Image src={image} alt="logo" className="h-14 w-14" />}
          <span>
            {title && <p className="text-sm dark:text-gray-50">{title}</p>}
            {frameworks.length > 0 && (
              <span className="text-sm dark:text-gray-50">
                {frameworks.map(name => (
                  <span
                    key={name}
                    className="before:mx-1.5 before:content-['•'] before:first-of-type:hidden"
                  >
                    {name}
                  </span>
                ))}
              </span>
            )}
          </span>
        </div>
        <Button>
          <CaretSlimIcon className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  );
};

const Button = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <button
      type="button"
      className="
        rounded-md
        bg-gray-300
        p-3
        text-black
        transition
        hover:opacity-70
      "
      onClick={() => console.log('clicked')}
    >
      {children}
    </button>
  );
};

export const SchemaPage = ({
  schemaName,
  tags = [],
  editorData,
}: ISchemaPageProps): ReactElement => {
  const [schemaObj, setSchemaObj] = useState(() => buildSchema(editorData[0].schema!));
  return (
    <section className="w-full bg-white dark:bg-[#111]">
      <div className="container flex max-w-[90rem] flex-col justify-between py-6 md:flex-row md:gap-16">
        <span className="pb-6 md:pb-0">
          <h2 className="mt-0 mb-4 text-xl font-bold text-black dark:text-gray-50 md:text-2xl">
            {schemaName}
          </h2>
          <TagsContainer>
            {tags.map(tagName => (
              <Tag key={tagName}>{tagName}</Tag>
            ))}
          </TagsContainer>
        </span>
        <span className="flex items-start gap-2.5">
          <Button>
            <ShareIcon />
          </Button>
          <Button>
            <MoreIcon />
          </Button>
        </span>
      </div>
      <div className="flex">
        <Editor {...editorData[0]}>
          <SchemaEditor
            schema={editorData[0].schema}
            onSchemaChange={newSchemaObject => {
              setSchemaObj(newSchemaObject);
            }}
          />
        </Editor>

        <Editor {...editorData[1]}>
          <ExecutableDocumentEditor schema={schemaObj} defaultValue={editorData[1].operations} />
        </Editor>

        {editorData.slice(2).map(data => (
          <Editor {...data} key={data.title}>
            <SchemaEditor schema={data.schema} />
          </Editor>
        ))}
      </div>
    </section>
  );
};
