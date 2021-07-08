import tw, { css, styled } from 'twin.macro';

interface IStyleProps {
  isModalOpen?: boolean;
  placement?: 'top' | 'center' | 'bottom' | 'bottom-wide';
}

export const Container = styled.div(({ isModalOpen }: IStyleProps) => [
  tw`fixed inset-0 visible font-default`,
  css`
    z-index: 400; //TODO: Used for Docusaurus, remove when no longer needed.
    button:focus:not(:focus-visible) {
      ${tw`outline-none!`}
    }

    ${isModalOpen ? `
      backdrop-filter: blur(2px);
    ` : tw`invisible`}
  `,
]);

export const Overlay = styled.div(({ isModalOpen }: IStyleProps) => [
  tw`absolute inset-0`,
  tw`w-full h-full dark:bg-gray-500 bg-gray-900 invisible opacity-0`,
  tw`transition-all duration-200 ease-in-out`,
  css`
    ${isModalOpen && tw`visible opacity-40`}
  `,
]);

export const Wrapper = styled.div(({ isModalOpen, placement }: IStyleProps) => [
  tw`absolute inset-0 flex flex-col opacity-100 transform-none h-full w-full max-w-none rounded-none`,
  tw`dark:bg-gray-900 bg-white`,
  tw`md:(transform -translate-x-1/2)`,
  css`
    ${!isModalOpen && tw`opacity-0`}
  `,
  (placement === 'top' || placement === 'center') && [
    tw`md:(left-2/4 right-auto bottom-auto h-auto max-w-3xl rounded-md)`,
    css`
      @media screen and (min-width: 768px) {
        max-height: 80%;
      }
    `,
  ],
  placement === 'top' && tw`md:(top-10 -translate-y-0)`,
  placement === 'center' && tw`md:(top-2/4 -translate-y-1/2)`,
  placement === 'bottom' && [
    tw`md:(top-auto left-2/4 bottom-0 h-5/6 w-4/5 max-w-3xl rounded-t-md)`,
  ],
  placement === 'bottom-wide' && [
    tw`md:(top-auto left-2/4 bottom-0 h-5/6 w-4/5 max-w-7xl rounded-t-md)`,
  ],
]);

export const Header = styled.div(() => [
  tw`flex items-center px-6 py-6 border-solid border-0 border-b`,
  tw`dark:border-gray-700 border-gray-200`,
]);

export const HeaderImage = styled.img(() => [tw`w-10 mr-2 md:(w-16 mr-4)`]);

export const HeaderInfo = styled.div(() => [
  tw`flex flex-col justify-center w-full`,
  css`
    min-height: 2.25rem;

    h2 {
      ${tw`m-0 font-semibold text-lg md:text-xl dark:text-gray-100 text-black`}
    }

    a,
    p {
      ${tw`max-w-3/4 m-0 text-xs dark:text-gray-100 text-gray-500`}
    }

    a {
      ${[tw`flex hocus:opacity-60`, tw`transition duration-200 ease-in-out`]}

      p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        ${tw`max-w-none`}
      }

      img {
        ${tw`ml-1.5`}
      }
    }
  `,
]);

export const Body = styled.div(() => [
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
  `,
]);

export const CloseButton = styled.button(() => [
  tw`absolute top-6 right-6 flex justify-center items-center p-1.5`,
  tw`dark:bg-gray-700 bg-gray-200 border border-2 border-transparent rounded-lg cursor-pointer outline-none! hocus:(border-gray-500)`,
  tw`transition duration-200 ease-in-out`,
]);
