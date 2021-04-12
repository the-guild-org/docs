import tw, { css, styled } from 'twin.macro';

interface themeProps {
  isModalOpen?: boolean
}

export const Modal = styled.div(({ isModalOpen }: themeProps) => [
  tw`fixed inset-0 visible font-sans`,
  css`
    z-index: 400; //TODO: Used for Docusaurus, remove when no longer needed.
    backdrop-filter: blur(2px);
    ${!isModalOpen && tw`invisible`}
  `
]);

export const ModalOverlay = styled.div(({ isModalOpen }: themeProps) => [
  tw`absolute inset-0`,
  tw`w-full h-full bg-gray-900 invisible opacity-0`,
  tw`transition-all duration-150 ease-in-out`,
  css`
    ${isModalOpen && tw`visible opacity-40`}
  `
]);

export const ModalWrapper = styled.div(({ isModalOpen }: themeProps) => [
  tw`absolute inset-0 flex flex-col opacity-100 transform-none h-full w-full max-w-none rounded-none`,
  tw`md:(top-auto left-2/4 bottom-0 transform -translate-x-1/2 h-4/5 w-4/5 max-w-2xl rounded-t-md)`,
  tw`transition-all duration-300 ease-in-out`,
  tw`dark:bg-gray-900 bg-white`,
  css`
      ${!isModalOpen && tw`opacity-0`}
  `,
]);

export const ModalHeader = styled.div(() => [
  tw`px-6 py-7 border-solid border-0 border-b`,
  tw`dark:border-gray-700 border-gray-200`,
  css`
    h2 {
      ${tw`m-0 font-semibold text-lg dark:text-gray-100 text-black`}
    }

    button {
      ${tw`block`}
    }
  `,
]);
export const ModalContent = styled.div(() => [
  tw`block px-6 py-7 pb-0 overflow-y-auto`,
  css`
    max-height: calc(100% - 5.25rem);

    ::-webkit-scrollbar-track {
      ${tw`dark:bg-gray-800 bg-gray-100`}
    }

    ::-webkit-scrollbar {
      ${tw`w-1.5 dark:bg-gray-800 bg-gray-100`}
    }

    ::-webkit-scrollbar-thumb {
      ${tw`dark:bg-gray-700 bg-gray-300`}
    }
  `
]);

export const ProductCategory = styled.div(() => [
  tw`mb-6`,
  css`
    h3 {
      ${tw`w-full mt-0 mb-3 font-normal text-base text-gray-600 dark:text-gray-400 text-black`}
    }
  `
]);

export const ProductList = styled.div(() => [
  tw`flex flex-wrap`,
  css`
    @media screen and (min-width: 768px) {
      &:hover > a {
        &:not(a:hover) {
          filter: grayscale(100%);
          opacity: 0.2;

          img {
            filter: brightness(0);
          }
        }

        &:hover {
          img:nth-child(2) {
            position: absolute;
            top: 4px;
            display: block;
            filter: blur(3px);
            opacity: 0.45;
          }
        }
      }
    }
  `,
]);

export const ProductImage = styled.div(() => [
  tw`relative mr-3`,
  css`
    img {
      ${tw`align-bottom last:hidden`}
    }
  `
]);

export const ProductThumbnail = styled.a(() => [
  tw`flex w-full my-1 md:(m-0) py-3 px-2 rounded-lg no-underline!`,
  tw`dark:hover:bg-gray-800 hover:bg-gray-100`,
  css`
    span {
      ${tw`flex flex-col justify-center`}

      h4, p {
        ${tw`m-0`}
      }

      h4 {
        ${tw`font-semibold text-base dark:text-gray-400 text-black`}
      }

      p {
        ${tw`font-medium text-xs dark:text-gray-500 text-gray-400`}
      }
    }

    @media screen and (min-width: 640px) {
      width: calc(50% - 1rem);
    }
  `
]);