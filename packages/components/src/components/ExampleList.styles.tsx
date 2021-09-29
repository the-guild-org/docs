import tw, { css, styled } from 'twin.macro';

export const Header = styled.tr(() => [
  css`
    td {
      ${[tw`flex gap-2.5`]}
    }
    img {
      ${[tw`h-6 w-6`]}
    }
  `
]);

export const Examples = styled.div(() => [
  tw`flex flex-wrap lg:flex-nowrap -mx-6`,
]);

export const Examples2 = styled.table(() => [
  tw`flex flex-wrap lg:flex-nowrap -mx-6`,
]);
