import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.footer(() => [
  tw`bg-white dark:bg-gray-900 text-xs font-default`,
]);

export const Container = styled.div(() => [
  tw`container-max flex flex-col flex-wrap md:flex-row justify-between items-center pb-4 md:pb-5`,
]);

export const Line = styled.hr(() => [
  tw`w-full border-0 border-t border-solid border-gray-300 dark:border-gray-800 m-0 mb-4 md:mb-5`,
]);

export const Copyright = styled.p(() => [
  tw`flex-1 hidden md:block text-xs text-gray-500 dark:text-gray-400`,
]);

export const Logo = styled.a(() => [
  css`
    img {
      ${tw`mb-3 md:mb-0 opacity-50 transition duration-200 ease-in-out`}
    }
    &:hover {
      img {
        ${tw`opacity-100`}
      }
    }
  `,
]);

export const Links = styled.ul(() => [
  tw`flex flex-wrap flex-1 justify-end m-0 p-0 list-none`,
  css`
    li {
      &:not(:first-of-type) {
        &:before {
          content: '';
          ${tw`first-of-type:hidden inline-block align-middle mx-2 h-1 w-1 rounded bg-gray-500`}
        }
      }
    }

    a {
      ${[
        tw`inline-block text-xs text-gray-500 dark:text-gray-400 no-underline hover:(text-black dark:text-gray-100)`,
        tw`transition duration-200 ease-in-out`,
      ]}
    }
  `,
]);
