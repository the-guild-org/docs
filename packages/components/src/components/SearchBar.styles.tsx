import tw, { css, styled } from 'twin.macro';
interface IStyleProps {
  accentColor?: string;
  isFull?: boolean;
}

export const SearchButton = styled.button(
  ({ accentColor, isFull }: IStyleProps) => [
    tw`flex items-center p-0 font-sans font-medium text-xs text-gray-500 bg-transparent border-transparent cursor-pointer`,
    tw`md:(ml-3 pl-1 pr-8 py-1 border-2 bg-gray-100 rounded-md)`,
    tw`md:dark:(bg-gray-800 text-gray-300)`,
    tw`transition duration-200 ease-in-out`,
    css`
      img {
        ${[
          tw`h-6 w-6 m-0 md:(h-4.5 w-4.5 mr-1) hover:opacity-70`,
          tw`transition duration-200 ease-in-out`,
        ]}
      }

      span {
        ${tw`hidden md:block`}
      }

      @media screen and (min-width: 768px) {
        &:hover,
        &:focus {
          border: 2px solid ${accentColor};
        }
      }
    `,
    isFull && tw`w-full m-0! md:p-2!`,
  ]
);

export const SearchForm = styled.div(({ accentColor }: IStyleProps) => [
  tw`sticky -top-6 z-10 -m-6 p-6 bg-white shadow-sm`,
  tw`dark:bg-gray-900 bg-white`,
  css`
    form {
      ${[tw`flex items-center p-2 rounded-lg`, tw`dark:bg-gray-800 bg-gray-50`]}

      border: 2px solid ${accentColor};
    }

    img {
      ${tw`align-bottom p-1`}
    }

    input {
      ${[
        tw`w-full mx-2 text-lg border-0 outline-none`,
        tw`dark:(bg-gray-800 text-gray-300 placeholder-gray-300) bg-gray-50 text-gray-500 placeholder-gray-500`,
        css`
          &::-webkit-search-decoration,
          &::-webkit-search-cancel-button,
          &::-webkit-search-results-button,
          &::-webkit-search-results-decoration {
            -webkit-appearance: none;
          }
        `,
      ]}
    }

    button {
      ${[
        tw`p-0 bg-transparent border-0 cursor-pointer`,
        tw`transition duration-200 ease-in-out`,
        tw`hover:(opacity-70)`,
      ]}
    }
  `,
]);

export const SearchResults = styled.section(() => [tw`mt-9`]);

export const SearchHit = styled.article(({ accentColor }: IStyleProps) => [
  css`
    h2 {
      ${[
        tw`text-base font-semibold`,
        css`
          color: ${accentColor};
        `,
      ]}
    }

    &:last-child {
      a {
        ${tw`mb-0`}
      }
    }

    a {
      ${[
        tw`flex items-center mb-2 px-5 py-3 rounded-md break-all no-underline`,
        tw`dark:bg-gray-800 bg-gray-100`,
      ]}

      &:hover, &:focus {
        outline: none;
        background-color: ${accentColor};

        img {
          filter: brightness(0) invert(1);
        }

        span {
          ${tw`text-white`}
        }

        p {
          ${tw`text-gray-200`}
        }
      }

      img {
        ${tw`mr-4`}
      }

      span,
      p {
        ${tw`m-0`}
      }

      span {
        ${tw`dark:text-gray-300 text-gray-700`}

        em {
          ${tw`underline`}
        }
      }

      p {
        ${tw`text-xs text-gray-400`}
      }
    }
  `,
]);
