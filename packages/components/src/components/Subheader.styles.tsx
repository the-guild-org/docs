import tw, { css, styled } from 'twin.macro';

interface IStyleProps {
  isActiveLink?: boolean;
  isModalOpen?: boolean;
  iconType?: 'open' | 'close';
}

export const Wrapper = styled.header(() => [
  tw`sticky top-0 z-10 py-5 bg-white`,
  css`
    box-shadow: 0px 16px 20px rgba(0, 0, 0, 0.04);
    button:focus:not(:focus-visible) {
      ${tw`outline-none!`}
    }
  `,
]);

export const Container = styled.div(() => [
  tw`container-max flex justify-between md:justify-end`,
]);

export const Navigation = styled.nav(({ isModalOpen }: IStyleProps) => [
  tw`fixed flex flex-col justify-center bg-white`,
  tw`transition-all duration-300 ease-in-out`,
  tw`md:(static flex-row flex-1 justify-end items-center transition-none)`,
  css`
    z-index: 300; //TODO: Used for Docusaurus, remove when no longer needed.
    @media screen and (max-width: 768px) {
      ${[
        tw`inset-0`,
        !isModalOpen &&
          css`
            top: -100vh;
            bottom: 100vh;
          `,
      ]}
    }
  `,
]);

export const Logo = styled.a(() => [
  tw`flex no-underline`,
  css`
    img {
      ${tw`w-12`}
    }

    span {
      ${tw`flex flex-col justify-center ml-2 -mt-1`}

      p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        ${tw`m-0 first:(text-black font-semibold) last:(text-xs text-gray-500)`}
      }
    }
  `,
]);

export const Link = styled.a(({ isActiveLink }: IStyleProps) => [
  tw`w-max mx-auto py-3 font-medium text-base text-center no-underline! hover:text-black`,
  tw`sm:(text-lg py-5)`,
  tw`md:(mx-2.5 last:mr-5 py-0 text-xs text-left)`,
  tw`transition duration-200 ease-in-out`,
  isActiveLink ? tw`text-black` : tw`text-gray-500`,
]);

export const Controls = styled.div(() => [
  tw`flex flex-none justify-end items-center`,
]);

export const CTA = styled.a(() => [
  tw`flex-none mx-1 px-3 py-3 bg-light-blue font-medium text-xs text-center text-white rounded-md no-underline!`,
  tw`md:(mx-0 px-5)`,
  tw`transition duration-200 ease-in-out`,
  css`
    &:hover, &:focus {
        box-shadow: 3px 5px 14px rgba(28, 200, 238, 0.4);
      }
    }
    &:focus {
      background-color: #15AFD0;
    }
  `,
]);

export const Icon = styled.button(({ iconType }: IStyleProps) => [
  tw`flex md:hidden justify-center items-center p-1.5`,
  tw`bg-transparent border-0 cursor-pointer outline-none hover:opacity-70`,
  tw`transition duration-200 ease-in-out`,
  iconType === 'open' && tw`-mr-1`,
  iconType === 'close' &&
    tw`absolute top-6 right-6 dark:bg-gray-700 bg-gray-200 rounded-lg`,
]);
