import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.section(() => [
    tw`w-full bg-white dark:bg-gray-900 font-default`,
]);

export const Container = styled.div(() => [
    tw`container-max py-6 flex flex-col md:(flex-row gap-16)justify-between`
]);

export const Header = styled.span(() => [
    tw`pb-6 md:pb-0`,
]);

export const Title = styled.h2(() => [
    tw`mt-0 mb-4 font-bold text-black dark:text-gray-50 text-xl md:text-2xl`,
]);

export const ButtonWrapper = styled.span(() => [
    tw`flex gap-2.5`,
]);

export const Button = styled.button(() => [
  tw`flex justify-center items-center h-10 w-10 bg-gray-200 border-0 rounded-md cursor-pointer outline-none box-border`,
  tw`hocus:bg-black dark:(bg-gray-700 hocus:bg-white)`,
  tw`transition duration-150 ease-in-out`,
  css`
    &:hover,
    &:focus {
        img {
            filter: invert(1);
        }
    }
  `
]);

export const EditorWrapper = styled.div(() => []);
