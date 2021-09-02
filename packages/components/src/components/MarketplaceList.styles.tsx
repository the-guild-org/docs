import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.section(() => [
  tw`w-full bg-white dark:bg-gray-900 font-default`,
]);

export const Container = styled.div(() => [tw`container-max py-6`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-black dark:text-gray-50 text-xl md:text-2xl`,
]);

export const Placeholder = styled.div(() => [
  tw`flex items-center justify-center h-24 w-full text-black bg-gray-100 dark:(text-gray-300 bg-gray-700) rounded-lg`,
]);

export const Table = styled.table(() => [tw`w-full border-collapse`]);

export const TableHeader = styled.thead(() => [
  css`
    th {
      ${tw`px-2 font-semibold text-left text-xs text-gray-300 dark:text-gray-600 uppercase whitespace-nowrap`}

      &:nth-of-type(3) {
        ${tw`hidden md:table-cell`}
      }
    }
  `,
]);

export const TableBody = styled.tbody(() => []);

export const TablePagination = styled.div(() => [
  css`
    ${tw`flex justify-center w-full`}

    ul {
      ${tw`flex list-none`}
    }

    li {
      ${[
        tw`inline-block mx-1 text-sm bg-gray-200 dark:(text-gray-300 bg-gray-700) rounded-lg select-none`,
        tw`hover:opacity-70 transition duration-200 ease-in-out`,
      ]}

      &.selected {
        ${tw`text-white bg-black dark:(text-gray-900 bg-gray-100)`}
      }

      &.next,
      &.previous {
        ${tw`hidden`}
      }
    }

    a {
      ${tw`flex items-center justify-center h-8 w-8 cursor-pointer`}
    }
  `,
]);
