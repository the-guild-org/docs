import tw, { css, styled } from 'twin.macro';
import { getLuminance } from 'polished';

interface IStyleProps {
  color?: string;
}

export const Wrapper = styled.section(() => [
  tw`bg-white dark:bg-gray-900 py-8 font-default`,
]);

export const Container = styled.div(() => [
  tw`container-max flex flex-wrap space-y-6 md:(flex-nowrap space-x-8 space-y-0)`,
]);

export const Card = styled.a(({ color }: IStyleProps) => [
  tw`relative w-full p-8 rounded-3xl text-white no-underline`,
  tw`md:(h-72 w-1/2 hover:(transform scale-105 shadow-xl))`,
  tw`transition duration-200 ease-in-out`,
  css`
    min-height: 200px;
    background-color: ${color || 'black'};

    &:after {
      content: '';
      width: calc(50% - 1rem);
      @media screen and (max-width: 1024px) {
        width: calc(30% - 1rem);
      }

      ${[
        tw`absolute top-0 right-0 h-full rounded-3xl`,
        {
          backgroundColor: '#24272E',
          opacity: getLuminance(color || 'black') > 0.1 ? '15%' : '100%',
        },
      ]}
    }
  `,
]);

export const CardInfo = styled.div(() => [
  tw`w-3/4 lg:(w-1/2)`,
  css`
    h2,
    h3,
    p {
      ${tw`m-0`}
    }

    h2 {
      ${tw`pb-1.5 font-semibold text-xs uppercase opacity-60`}
    }

    h3 {
      ${tw`pb-2.5 font-bold text-2xl md:text-3xl`}
    }

    p {
      ${tw`font-medium text-xs opacity-60`}
    }
  `,
]);
