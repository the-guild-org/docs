import { AutocompleteComponents } from '@algolia/autocomplete-js';
import React from 'react';
import tw, { styled, css } from 'twin.macro';
import { PRODUCTS } from '../../helpers/assets';
import { AlgoliaSearchItem } from '../../types/algolia';

const PreviewContainer = styled.div<{ accentColor: string }>(({ accentColor }) => [
  tw`flex flex-col px-10 overflow-y-auto select-text h-[600px]`,
  css`
    padding-top: var(--aa-spacing-half);
    padding-bottom: var(--aa-spacing-half);

    mark {
      background: ${accentColor};
    }
  `,
]);

export const PreviewProjectImage = styled.div(
  () => css`
    ${tw`relative mr-3`}
    img {
      ${tw`max-w-[25px] align-bottom`}
    }
  `
);

export const PreviewProject = styled.div(() => [
  tw`box-border flex select-none items-center justify-center w-full my-1 outline-none no-underline! mb-4`,
  css`
    span {
      ${tw`flex flex-col justify-center`}
      h4 {
        ${tw`m-0`}
      }

      h4 {
        ${tw`font-semibold text-sm dark:text-gray-400 text-black`}
      }
    }
  `,
]);

const PreviewTitle = tw.h3`mt-0 mb-3 w-full font-light text-center text-2xl text-black dark:text-gray-400`;
const PreviewSubTitle = tw.p`mt-0 mb-6 w-full font-light text-center text-base text-gray-600 dark:text-gray-400`;
const ContentSnippet = tw.p`text-center font-light text-center text-sm text-black dark:text-gray-400`;

const Cta = styled.p<{ accentColor: string }>(({ accentColor }) => [
  tw`mb-5 mt-8 text-center font-light text-center text-lg text-black dark:text-gray-400`,
  css`
    cursor: pointer;
    color: ${accentColor};
  `,
]);

const TocTitle = tw.h4`w-full mt-10 mb-1 font-light text-lg text-gray-600 dark:text-gray-400`;

const TocContent = styled.ol(
  tw`text-left font-light text-base text-gray-600 dark:text-gray-400`,
  css`
    list-style-position: inside !important;
    list-style: upper-roman;

    & ol {
      list-style: decimal;
      padding-left: 5px;
    }
  `
);

const TOC = ({ toc }: Pick<AlgoliaSearchItem, 'toc'>) => (
  <TocContent>
    {toc.map(tocItem => (
      <li key={tocItem.title}>{tocItem.title}</li>
    ))}
  </TocContent>
);

export const SidePreview = ({
  item,
  components,
  accentColor,
}: {
  item: AlgoliaSearchItem;
  components: AutocompleteComponents;
  accentColor: string;
}) => {
  if (!item) {
    return null;
  }
  const project = PRODUCTS.find(p => p.children === item.source);
  return (
    <PreviewContainer accentColor={accentColor}>
      {project && (
        <PreviewProject>
          <PreviewProjectImage>
            <img src={project.logo} alt={`${project.children} logo`} />
          </PreviewProjectImage>
          <span>
            <h4>{project.children}</h4>
          </span>
        </PreviewProject>
      )}
      <PreviewTitle>
        <components.Highlight hit={item} attribute="title" />
      </PreviewTitle>
      <PreviewSubTitle>{item.hierarchy.slice(1).join(' > ')}</PreviewSubTitle>
      <ContentSnippet>
        <components.Snippet hit={item} attribute="content" />
      </ContentSnippet>
      {item.toc.length > 1 && (
        <>
          <TocTitle>Table of content:</TocTitle>
          <TOC toc={item.toc} />
        </>
      )}
      <Cta accentColor={accentColor}>Press "Enter" to open {item.type} →</Cta>
    </PreviewContainer>
  );
};
