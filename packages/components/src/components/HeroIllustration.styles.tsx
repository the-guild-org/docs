import tw, { css, styled, theme } from 'twin.macro';
import { rgba } from 'polished';

interface IStyleProps {
  flipped?: boolean;
}

export const Wrapper = styled.section(() => [
  tw`bg-white dark:bg-gray-900 font-default`,
]);

export const Container = styled.div(({ flipped }: IStyleProps) => [
  tw`container-min flex flex-wrap items-center py-8`,
  tw`md:(flex-nowrap justify-between)`,
  flipped && tw`md:flex-row-reverse`,
]);

export const Illustration = styled.div(({ flipped }: IStyleProps) => [
  tw`flex w-full mb-6`,
  tw`md:(w-2/5 mb-0)`,
  css`
    img {
      ${tw`w-full max-w-md`}
    }
  `,
  flipped ? tw`md:ml-8` : tw`md:mr-8`,
]);

export const Info = styled.div(() => [
  tw`mb-6 md:mb-0`,
  css`
    h2 {
      ${tw`max-w-sm m-0 font-bold text-black dark:text-gray-50 text-2xl md:text-3xl`}
    }

    p {
      ${tw`max-w-md mt-1 mb-3 text-base text-gray-500 dark:text-gray-400`}
    }

    a {
      ${[
        tw`w-max mt-auto text-sm text-light-blue no-underline`,
        tw`transition-all duration-300 ease-in-out`,
      ]}

      &:hover, &:focus {
        color: ${`${theme`colors.dark-blue`}`};
        text-shadow: 3px 5px 14px ${rgba(theme`colors.light-blue`, 0.4)};
      }
    }
  `,
]);

export const CTA = styled.div(() => [
  tw`relative z-1 hidden mt-4 md:(flex items-center mt-9) text-xs`,
  css`
    a {
      ${[
        tw`block w-32 mr-4 px-1.5 py-3 font-medium text-xs text-center text-white bg-light-blue rounded-md no-underline`,
        tw`transition duration-300 ease-in-out`,
      ]}

      &:hover,
      &:focus {
        box-shadow: 3px 5px 14px ${rgba(theme`colors.light-blue`, 0.4)};
      }

      &:focus {
        background-color: ${`${theme`colors.dark-blue`}`};
      }
    }
  `,
]);

