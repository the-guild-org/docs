import tw, { css, styled } from 'twin.macro';

export const PreviewContainer = styled.div([
  tw`flex flex-row`,
  css`
    padding: var(--aa-spacing-half);
    max-height: var(--aa-detached-modal-max-height);
  `,
]);

export const ResultsContainer = styled.div([
  css`
    min-width: 400px;
  `,
]);

export const NoResultsContainer = styled.div([
  tw`mt-0 mb-6 w-full font-light text-center text-xl text-gray-600 dark:text-gray-400`,
]);

export const SearchBy = styled.a(
  tw`w-full justify-end items-center mt-5 p-2 flex flex-row text-black dark:text-white text-xs font-light`
);
