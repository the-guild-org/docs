import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.section(() => [tw`bg-white dark:bg-gray-900 font-default`]);

export const Container = styled.div(() => [tw`container-max py-12`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-black dark:text-gray-50 text-2xl md:text-3xl`,
]);

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

export const Results = styled.div(() => [
  tw`flex flex-wrap lg:flex-nowrap -mx-6`,
]);
