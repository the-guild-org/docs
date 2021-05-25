import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.section(() => [tw`w-full bg-white`]);

export const Container = styled.div(() => [tw`container-max py-6`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-xl md:text-2xl`,
]);

export const Placeholder = styled.div(() => [
  tw`flex items-center justify-center h-24 w-full bg-gray-100 rounded-lg`,
]);

export const Table = styled.table(() => [tw`w-full border-collapse`]);

export const TableHeader = styled.thead(() => [
  css`
    th {
      ${tw`px-2 font-semibold text-left text-xs text-gray-300 uppercase whitespace-nowrap`}
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
        tw`inline-block mx-1 text-sm bg-gray-200 rounded-lg select-none`,
        tw`hover:opacity-70 transition duration-200 ease-in-out`,
      ]}

      &.selected {
        ${tw`text-white bg-black`}
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

export const TableItem = styled.tr(() => [
  tw`font-medium text-xs text-gray-500 border-0 border-b border-solid border-gray-300 last:border-0`,
  css`
    td {
      ${tw`px-2`}

      &:nth-child(2),
      &:nth-child(3) {
        ${tw`whitespace-nowrap`}
      }

      div {
        ${tw`flex items-center`}
      }

      img {
        ${tw`m-4 ml-0 select-none`}
      }

      h3 {
        ${tw`m-0 font-bold text-lg text-black`}
      }

      p {
        ${tw`m-0`}
      }

      button {
        ${[
          tw`flex justify-center items-center h-10 w-10 bg-gray-200 hocus:bg-black border-0 rounded-lg cursor-pointer outline-none`,
          tw`transition duration-150 ease-in-out`,
        ]}

        &:hover, &:focus {
          img {
            filter: invert(1);
          }
        }

        img {
          ${[
            tw`w-5 m-0 ml-0.5 transform -rotate-90`,
            tw`transition duration-150 ease-in-out`,
          ]}
        }
      }
    }
  `,
]);

export const TableItemInfo = styled.div(() => [
  tw`flex items-center`,
  css`
    a {
      ${tw`flex items-center hocus:opacity-75 transition duration-150 ease-in-out`}
    }
  `,
]);
