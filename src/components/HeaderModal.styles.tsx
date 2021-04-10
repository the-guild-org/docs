import tw, { css, styled } from 'twin.macro';

interface themeProps {
  isDark?: boolean
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

export const ModalWrapper = styled.div(({ isDark, isModalOpen }: themeProps) => [
  tw`absolute bottom-0 left-2/4 transform -translate-x-1/2 bottom-0`,
  tw`flex flex-col w-4/5 max-w-2xl opacity-100 rounded-t-md`,
  css`
    height: 85%;
    
    @media screen and (max-width: 768px) {
      ${tw`inset-0 transform-none h-full w-full max-w-none rounded-none`}
    }
  `,
  tw`transition-all duration-300 ease-in-out`,
  css`
      ${!isModalOpen && tw`opacity-0`}
  `,
  isDark ? tw`bg-gray-900` : tw`bg-white`,
]);

export const ModalHeader = styled.div(({ isDark }: themeProps) => [
  tw`px-6 py-7 border-solid border-0 border-b`,
  css`
    ${isDark ? tw` border-gray-700` : tw` border-gray-200`},

    h2 {
      ${tw`m-0 font-semibold text-lg`}
      ${isDark ? tw`text-gray-100` : tw`text-black`}
    }

    button {
      ${tw`block`}
    }
  `,
]);
export const ModalContent = styled.div(({ isDark }: themeProps) => [
  tw`block px-6 py-7 pb-0`,
  css`
    max-height: calc(100% - 7rem);
    overflow: auto;

    ::-webkit-scrollbar-track {
      ${isDark ? tw`text-gray-800` : tw`bg-gray-100`}
    }

    ::-webkit-scrollbar {
      ${tw`w-1.5`}
      ${isDark ? tw`bg-gray-800` : tw`bg-gray-100`}
    }

    ::-webkit-scrollbar-thumb {
      ${isDark ? tw`bg-gray-600` : tw`bg-gray-300`}
    }
  `
]);

export const ProductCategory = styled.div(({ isDark }: themeProps) => [
  css`
  ${tw`mb-6`}
    h3 {
      ${tw`w-full mt-0 mb-3 font-normal text-base text-gray-600`}
      ${isDark ? tw`text-gray-400` : tw`text-black`}
    }
  `
]);

export const ProductList = styled.div(() => [
  tw`flex flex-wrap`,
  css`
    @media screen and (min-width: 769px) {
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
      vertical-align: bottom;

      &:nth-child(2) {
        display: none;
      }
    }
  `
]);

export const ProductThumbnail = styled.a(({ isDark }: themeProps) => [
  tw`flex py-3 px-2 rounded-lg no-underline!`,
  css`
    width: calc(50% - 1rem);

    &:hover {
      ${isDark ? tw`bg-gray-800` : tw`bg-gray-100`}
    }
    
    span {
      ${tw`flex flex-col justify-center`}

      h4, p {
        ${tw`m-0`}
      }

      h4 {
        ${tw`font-semibold text-base`}
        ${isDark ? tw`text-gray-400` : tw`text-black`}
      }

      p {
        ${tw`font-medium text-xs`}
        ${isDark ? tw`text-gray-500` : tw`text-gray-400`}
      }
    }

    @media screen and (max-width: 640px) {
      width: 100%;
      
      &:nth-child(odd),
      &:nth-child(even) {
        margin: 0.25rem 0;
      }
    }
  `
]);