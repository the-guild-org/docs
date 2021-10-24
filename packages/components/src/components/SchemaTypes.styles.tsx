import tw, { css, styled, theme } from 'twin.macro';

export const Wrapper = styled.section(() => [
  tw`w-full bg-white dark:bg-gray-900 font-default`,
]);

export const Container = styled.div(() => [
  tw`container-max py-6 flex flex-col md:(flex-row gap-16)justify-between`,
]);

export const Header = styled.span(() => [tw`pb-6 md:pb-0`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-black dark:text-gray-50 text-xl md:text-2xl`,
]);

export const ButtonWrapper = styled.span(() => [tw`flex gap-2.5`]);

export const Button = styled.button(() => [
  tw`flex justify-center items-center h-10 w-10 border-0 rounded-md cursor-pointer outline-none box-border`,
  tw`hocus:bg-black dark:(bg-gray-700 hocus:bg-white)`,
  tw`transition duration-150 ease-in-out`,
  css`
    background-color: ${`${theme`colors.grayscale-line`}`};

    &:hover,
    &:focus {
      img {
        filter: invert(1);
      }
    }

    img {
      ${[tw`w-4 h-4 m-0`]},
    }
  `,
]);

export const EditorGroupWrapper = styled.div(() => [
  tw`flex`,
  css`
    .wrapper {
      &:not(:last-child) {
        border-right: 0.0625rem solid
          ${`${theme`colors.grayscale-placeholder`}`};
      }
    }
  `,
]);

export const EditorWrapper = styled.div(() => [
  tw`min-w-full max-w-full lg:(min-w-1/4 max-w-1/4) pr-px`,
]);

export const EditorHeader = styled.div(() => [
  tw`p-3.5 flex justify-between bg-gray-100 dark:(bg-transparent) items-center`,
  css`
    border-bottom: 0.0625rem solid ${`${theme`colors.grayscale-placeholder`}`};
    box-shadow: 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.1);
    min-height: 5.3125rem;

    div {
      ${[tw`flex gap-2.5 items-center`]}
      
      img {
        background-color: ${`${theme`colors.grayscale-label`}`};
        ${[tw`w-14 h-14 rounded-md bg-gray-600`]}
      }

      span > p {
        ${[tw`text-sm dark:text-gray-50`]}
        color: ${`${theme`colors.title-active`}`};
        &.dark {
          color: color: rgba(249, 250, 251, var(--tw-text-opacity));
        }
      }
    }      
  `,
]);

export const Frameworks = styled.span(() => [
  tw`flex items-center gap-1.5 text-sm dark:text-gray-50`,
  css`
    color: ${`${theme`colors.grayscale-label`}`};
    span {
      ${[tw`w-1.25 h-1.25 inline-block`]}
      background-color: ${`${theme`colors.grayscale-placeholder`}`};
      border-radius: 50%;
    }
  `,
]);
