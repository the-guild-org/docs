import tw, { css, styled, theme } from 'twin.macro';
import { rgba } from 'polished';

interface IStyleProps {
  flipped?: boolean;
}

export const Wrapper = styled.section(() => [tw`bg-white`]);

export const Container = styled.div(({ flipped }: IStyleProps) => [
  tw`container-min flex flex-wrap items-center py-8`,
  tw`md:(flex-nowrap justify-between)`,
  flipped && tw`md:flex-row-reverse`,
]);

export const Illustration = styled.div(({ flipped }: IStyleProps) => [
  tw`flex w-full mb-6 bg-white`,
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
      ${tw`max-w-sm m-0 font-bold text-2xl md:text-3xl`}
    }

    p {
      ${tw`max-w-md mt-1 mb-3 text-base text-gray-500`}
    }

    a {
      ${[
        tw`w-max mt-auto text-sm text-light-blue no-underline`,
        tw`transition-all duration-300 ease-in-out`,
      ]}

      &:hover, &:focus {
        color: ${theme`colors.dark-blue`};
        text-shadow: 3px 5px 14px ${rgba(theme`colors.light-blue`, 0.4)};
      }
    }
  `,
]);
