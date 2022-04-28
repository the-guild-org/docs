import tw, { css, styled } from 'twin.macro';

export const Category = styled.div(() => [
  tw`mb-6 last:mb-0`,
  css`
    h3 {
      ${tw`w-full mt-1 mb-5 font-normal text-base text-gray-600 dark:text-gray-400 text-black`}
    }
  `,
]);

export const List = styled.div(() => [tw`flex flex-wrap`]);

export const Item = styled.a(() => [
  tw`box-border flex items-center w-full my-1 md:(w-1/2 m-0) p-2 rounded-lg outline-none no-underline!`,
  tw`dark:hocus:bg-gray-700 hocus:bg-gray-100`,
  css`
    &:hover {
      h4 {
        ${tw`text-black dark:text-white`}
      }
    }
    span {
      ${tw`flex flex-col justify-center`}
      h4 {
        ${tw`m-0`}
      }

      h4 {
        ${tw`font-medium text-xs dark:text-gray-500 text-gray-400`}
      }
    }
  `,
]);

export const Callout = styled.div(() => [
  tw`mt-10 p-2`,
  tw`mt-10 p-2 flex justify-end`,
  css`
    a {
      ${tw`font-medium text-xs dark:text-white text-black`}
    }
  `,
]);

export const Container = styled.div([
  tw`dark:bg-gray-800 bg-white`,
  {
    padding: '20px',
    width: '600px',
    borderRadius: 6,
    boxShadow:
      'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  },
]);
