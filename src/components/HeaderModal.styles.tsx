import tw, { css, styled } from 'twin.macro';

interface themeProps {
  isDark?: boolean
  isModalOpen?: boolean
}

export const Modal = styled.div(({ isModalOpen }: themeProps) => [
  tw`hidden`,
  tw`absolute inset-0 font-sans`,
  isModalOpen && tw`block`,
]);

export const ModalOverlay = styled.div(() => [
  tw`absolute inset-0`,
  tw`w-full h-full bg-gray-900 opacity-40`
]);

export const ModalWrapper = styled.div(({ isDark }: themeProps) => [
  tw`absolute left-2/4 transform -translate-x-1/2 bottom-0 z-50`,
  tw`flex flex-col w-4/5 max-w-2xl rounded-t-md`,
  css`
    height: 85%;
    
    @media screen and (max-width: 768px) {
      ${tw`inset-0 transform-none h-full w-full max-w-none rounded-none`}
    }
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
]);

export const ProductThumbnail = styled.a(({ isDark }: themeProps) => [
  tw`flex py-2 px-1 rounded-lg no-underline`,
  tw`transition duration-200`,
  css`
    width: calc(50% - 0.8rem);
    margin: 0.25rem 0;

    &:nth-child(odd) {
      margin-right: 0.25rem;
    }

    &:nth-child(even) {
      margin-left: 0.25rem;
    }

    &:hover {
      ${isDark ? tw`bg-gray-800` : tw`bg-gray-100`}
    }

    img {
      ${tw`mr-3`}
    }
    
    span {
      ${tw`flex flex-col justify-center `}

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