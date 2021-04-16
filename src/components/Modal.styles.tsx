import tw, { css, styled } from 'twin.macro';

interface IStyleProps {
  visible?: boolean
  placement?: 'top' | 'center' | 'bottom'
}

export const ModalContainer = styled.div(({ visible }: IStyleProps) => [
  tw`fixed inset-0 visible font-sans`,
  css`
    z-index: 400; //TODO: Used for Docusaurus, remove when no longer needed.
    backdrop-filter: blur(2px);
    ${!visible && tw`invisible`}
  `
]);

export const ModalOverlay = styled.div(({ visible }: IStyleProps) => [
  tw`absolute inset-0`,
  tw`w-full h-full bg-gray-900 invisible opacity-0`,
  tw`transition-all duration-150 ease-in-out`,
  css`
    ${visible && tw`visible opacity-40`}
  `
]);

export const ModalWrapper = styled.div(({ visible, placement }: IStyleProps) => [
  tw`absolute inset-0 flex flex-col opacity-100 transform-none h-full w-full max-w-none rounded-none`,
  tw`transition-all duration-300 ease-in-out`,
  tw`dark:bg-gray-900 bg-white`,
  css`
      ${!visible && tw`opacity-0`}
  `,
  (placement === 'top' || placement === 'center') && [
    tw`md:(left-2/4 right-auto bottom-auto transform -translate-x-1/2 -translate-y-1/2 h-auto max-w-2xl rounded-md)`,
    css`
      @media screen and (min-width: 768px) {
        max-height: 80%;
      }
    `,
  ],
  placement === 'top' && tw`md:(top-1/4)`,
  placement === 'center' && tw`md:(top-2/4)`,
  placement === 'bottom' && [
    tw`md:(top-auto left-2/4 bottom-0 transform -translate-x-1/2 h-4/5 w-4/5 max-w-2xl rounded-t-md)`
  ]
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
  tw`block p-6 overflow-y-auto`,
  tw`dark:text-gray-300 text-black`,
  css`
    max-height: calc(100% - 5.25rem);

    ::-webkit-scrollbar-track {
      ${tw`dark:bg-gray-900 bg-white w-2.5 rounded`}
    }

    ::-webkit-scrollbar {
      ${tw`dark:bg-gray-900 bg-white w-2.5 rounded`}
    }

    ::-webkit-scrollbar-thumb {
      ${tw`dark:(bg-gray-500 border-gray-900) bg-gray-300 border-solid border-3 border-white rounded`}
    }
  `
]);

export const ModalClose = styled.button(() => [
  tw`absolute top-6 right-6 flex md:hidden justify-center items-center p-1.5`,
  tw`bg-transparent border-0 outline-none cursor-pointer hover:opacity-70`,
  tw`transition duration-200 ease-in-out`,
]);