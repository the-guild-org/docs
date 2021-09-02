import tw, { css, styled } from 'twin.macro';

export const TableItem = styled.tr(() => [
  tw`font-medium text-xs text-gray-500 dark:text-gray-400 border-0 border-b border-solid border-gray-300 dark:border-gray-800 last:border-0`,
  css`
    td {
      ${tw`px-2 py-4`}

      &:first-of-type {
        ${tw`w-14 md:w-24 pl-0`}
      }

      &:last-of-type {
        ${tw`pr-0`}
      }

      &:nth-of-type(3) {
        ${tw`hidden md:table-cell`}
      }
    }
  `,
]);

export const TableItemImage = styled.img(() => []);

export const TableItemInfo = styled.div(() => [
  tw`flex items-center`,
  css`
    min-height: 5rem;

    a {
      ${tw`flex items-center text-gray-500 dark:text-gray-400 hocus:opacity-75 transition duration-150 ease-in-out no-underline`}
    }

    h3 {
      ${tw`m-0 font-bold text-base md:text-lg text-black dark:text-white`}

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    p {
      ${tw`m-0`}

      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `,
]);

export const TableItemButton = styled.button(() => [
  tw`flex justify-center items-center h-8 w-8 md:(h-10 w-10) bg-gray-200 border-0 rounded-lg cursor-pointer outline-none`,
  tw`hocus:bg-black dark:(bg-gray-700 hocus:bg-white)`,
  tw`transition duration-150 ease-in-out`,
  css`
    &:hover,
    &:focus {
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
  `,
]);

export const TableItemDate = styled.span(() => [tw`md:whitespace-nowrap`]);
