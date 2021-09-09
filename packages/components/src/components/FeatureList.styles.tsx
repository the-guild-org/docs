import tw, { css, styled, theme } from 'twin.macro';
import { rgba } from 'polished';

export const Wrapper = styled.section(() => [
  tw`bg-white dark:bg-gray-900 font-default`,
]);

export const Container = styled.div(() => [tw`container-min py-14`]);

export const Title = styled.div(() => [
  tw`flex flex-wrap justify-center mb-6 pr-24 pl-24`,
  css`
    h2 {
      ${tw`mt-0 mb-1.5 font-bold text-black dark:text-gray-50 text-center text-2xl md:text-3xl`}
    }

    p {
      ${tw`mt-1 mb-1.5 text-base text-gray-500 dark:text-gray-400 text-center`}
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

export const Items = styled.div(() => [tw`flex flex-wrap justify-center`]);

export const Item = styled.article(() => [
  tw`flex flex-col items-center mx-5 mb-1 md:mb-0 last:mb-0 text-center`,
  css`
    width: 14rem;

    img {
      ${tw`w-28`}
    }

    h3 {
      ${tw`m-0 font-bold text-lg text-black dark:text-gray-50`}
    }

    p {
      ${tw`m-0 text-sm text-gray-500 dark:text-gray-400`}
    }
  `,
]);
