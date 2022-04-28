import tw, { css, styled } from 'twin.macro';

export const ProductCategory = styled.div(() => [
  tw`mb-6 last:mb-0`,
  css`
    h3 {
      ${tw`w-full mt-1 mb-5 font-normal text-base text-gray-600 dark:text-gray-400 text-black`}
    }
  `,
]);

export const ProductList = styled.div(() => [tw`flex flex-wrap`]);

export const ProductImage = styled.div(
  () => css`
    ${tw`relative mr-3`}
    img {
      ${tw`max-w-[25px] align-bottom last:hidden`}
    }
  `
);

export const ProductThumbnail = styled.a(() => [
  tw`box-border flex items-center w-full my-1 md:(w-1/2 m-0) py-2 px-2 rounded-lg outline-none no-underline!`,
  tw`dark:hocus:bg-gray-700 hocus:bg-gray-100`,
  css`
    span {
      ${tw`flex flex-col justify-center`}
      h4, p {
        ${tw`m-0`}
      }

      h4 {
        ${tw`font-semibold text-sm dark:text-gray-400 text-black`}
      }

      p {
        ${tw`font-medium text-xs dark:text-gray-500 text-gray-400`}
      }
    }
  `,
]);

export const Container = styled.div([
  tw`dark:bg-gray-800 bg-white`,
  {
    maxHeight: 'calc(100vh - 70px)',
    overflowY: 'scroll',
    padding: '20px',
    minHeight: '300px',
    width: '800px',
    borderRadius: 6,
    boxShadow:
      'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  },
]);
