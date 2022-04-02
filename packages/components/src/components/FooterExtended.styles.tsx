import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.footer(() => [
  tw`bg-white dark:bg-gray-900 text-xs font-default`,
]);

export const Container = styled.div(() => [tw`container-max`]);

export const Row = styled.div(
  ({ equalPadding }: { equalPadding?: boolean }) => [
    tw`flex flex-wrap lg:flex-nowrap`,
    equalPadding ? tw`py-4 md:(py-8)` : tw`pt-2 pb-4 md:(pt-4 pb-8)`,
  ]
);

export const Column = styled.div(() => [
  tw`w-full first-of-type:w-full xs:(first-of-type:w-full w-1/2) lg:(first-of-type:w-1/4! w-1/4!)`,
  tw`mb-6 last:mb-0 lg:(mb-0)`,
]);

export const WideColumn = styled(Column)(() => [
  tw`w-full first-of-type:w-full xs:(first-of-type:w-full w-full) lg:(first-of-type:w-2/4! w-2/4!)`,
]);

export const Line = styled.hr(() => [
  tw`w-full border-0 border-t border-solid border-gray-300 dark:border-gray-800 m-0 mb-4 md:mb-5`,
]);

export const Logo = styled.a(() => [
  tw`block w-max`,
  css`
    img {
      ${tw`mb-6 opacity-50 transition duration-200 ease-in-out block m-0`}
    }

    &:hover {
      img {
        ${tw`opacity-100`}
      }
    }
  `,
]);

export const Copyright = styled.p(() => [
  tw`block text-xs text-gray-500 dark:text-gray-400`,
]);

export const Title = styled.p(() => [
  tw`text-gray-900 dark:text-gray-100 text-xs font-semibold mb-3`,
]);

export const Description = styled.p(() => [
  tw`text-gray-500 dark:text-gray-400 text-sm mb-3`,
]);

export const Links = styled.ul(() => [
  tw`list-none m-0 p-0 mb-8 last:mb-0`,
  css`
    li {
      ${tw`mb-3 last:mb-0`}
    }
    a {
      ${[
        tw`inline-block text-sm text-gray-500 font-medium dark:text-gray-400 no-underline hover:(text-black dark:text-gray-100)`,
        tw`transition duration-200 ease-in-out`,
      ]}
    }
  `,
]);
