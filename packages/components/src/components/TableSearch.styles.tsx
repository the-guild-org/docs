import tw, { css, styled } from 'twin.macro';

export const Search = styled.div(() => [
  tw`flex pb-3 border-0 border-b border-solid border-gray-300 dark:border-gray-800`,
  css`
    input {
    ${[
      tw`w-full ml-1.5 mt-0.5 font-medium text-black bg-white dark:(text-gray-50 bg-gray-900) text-sm border-0 outline-none`,
      css`
        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
            -webkit-appearance: none;
        }
        &:placeholder {
            ${tw`text-black dark:text-white`}
        }
      `,
    ]}
  }
`,
]);
