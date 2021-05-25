import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.section(() => [tw`bg-white`]);

export const Container = styled.div(() => [tw`container-max py-12`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-2xl md:text-3xl`,
]);

export const Search = styled.div(() => [
  tw`flex pb-3 border-0 border-b border-solid border-gray-300`,
  css`
    input {
      ${[
        tw`w-full ml-1.5 mt-0.5 font-medium text-sm border-0 outline-none`,
        css`
          &::-webkit-search-decoration,
          &::-webkit-search-cancel-button,
          &::-webkit-search-results-button,
          &::-webkit-search-results-decoration {
            -webkit-appearance: none;
          }
        `,
      ]}
    }
  `,
]);

export const Results = styled.div(() => [
  tw`flex flex-wrap xl:flex-nowrap -mx-6`,
]);
