import tw, { css, styled } from 'twin.macro';

export const Header = styled.tr(() => [
  css`
    td {
      ${[tw`flex gap-2.5 text-xs uppercase font-semibold items-center`]}

      &:first-of-type {
        ${[tw`pt-4`]}
      }
    }

    img {
      ${[tw`h-6 w-6`]}
    }
  `,
]);

export const TableBody = styled.tbody(() => [tw`min-w-2/4`]);

export const Examples = styled.table(() => [
  tw`flex flex-wrap lg:(flex-nowrap gap-8) pt-4`,
]);
