import tw, { css, styled } from 'twin.macro';

interface IStyleProps {
  hasError?: boolean;
}

export const Form = styled.form(({ hasError }: IStyleProps) => [
  tw`flex items-center bg-gray-100 border-2 border-gray-100 rounded-md font-default`,
  tw`dark:(bg-gray-800 border-gray-800)`,
  css`
    span {
      img {
        ${tw`hidden md:block ml-3`}
      }
    }

    input {
      ${tw`w-full ml-3 md:ml-6 bg-transparent text-xs text-black dark:text-gray-200 placeholder-gray-400 outline-none`}
    }

    button {
      ${[
        tw`h-7 w-7 lg:(h-10 w-10) flex flex-none justify-center items-center m-2 bg-gray-300 rounded-md hocus:(bg-black outline-none)`,
        tw`transition duration-150 ease-in-out`,
        tw`dark:(bg-gray-700 hocus:bg-white)`,
      ]}

      &:hover, &:focus {
        img {
          filter: invert(1);
        }
      }
    }
  `,
  hasError && [
    tw`border-2 border-red-500 dark:border-red-400`,
    css`
      input {
        ${tw`text-red-500 dark:text-red-400`}
      }
    `,
  ],
]);
