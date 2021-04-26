import tw, { css, styled } from 'twin.macro';

export const ProductCategory = styled.div(() => [
  tw`mb-6 last:mb-0`,
  css`
    h3 {
      ${tw`w-full mt-0 mb-3 font-normal text-base text-gray-600 dark:text-gray-400 text-black`}
    }
  `
]);

export const ProductList = styled.div(() => [
  tw`flex flex-wrap`,
  css`
    @media screen and (min-width: 768px) {
      &:hover > a {
        &:not(a:hover) {
          filter: grayscale(100%);
          opacity: 0.2;

          img {
            filter: brightness(0);
          }
        }

        &:hover {
          img:nth-child(2) {
            position: absolute;
            top: 4px;
            display: block;
            filter: blur(3px);
            opacity: 0.45;
          }
        }
      }
    }
  `,
]);

export const ProductImage = styled.div(() => [
  tw`relative mr-3`,
  css`
    img {
      ${tw`align-bottom last:hidden`}
    }
  `
]);

export const ProductThumbnail = styled.a(() => [
  tw`flex w-full my-1 md:(m-0) py-3 px-2 rounded-lg outline-none no-underline!`,
  tw`dark:hocus:bg-gray-800 hocus:bg-gray-100`,
  css`
    span {
      ${tw`flex flex-col justify-center`}

      h4, p {
        ${tw`m-0`}
      }

      h4 {
        ${tw`font-semibold text-base dark:text-gray-400 text-black`}
      }

      p {
        ${tw`font-medium text-xs dark:text-gray-500 text-gray-400`}
      }
    }

    @media screen and (min-width: 640px) {
      width: calc(50% - 1rem);
    }
  `
]);