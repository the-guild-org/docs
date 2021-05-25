import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.section(() => [tw`bg-white`]);

export const Container = styled.div(() => [tw`container-min py-12`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-2xl md:text-3xl`,
]);

export const Items = styled.div(() => [tw`flex flex-wrap`]);

export const Item = styled.article(() => [
  tw`box-border flex flex-col w-full max-w-lg pr-10 mb-9 last:mb-0`,
  tw`md:w-1/2 lg:(w-1/3 mb-0)`,

  css`
    h3 {
      ${tw`m-0 font-semibold text-base text-black`}
    }

    p {
      ${tw`flex-grow mt-2 mb-4 text-sm text-gray-500`}
    }

    a {
      ${[
        tw`w-max mt-auto text-sm text-light-blue no-underline`,
        tw`transition-all duration-300 ease-in-out`,
      ]}

      &:hover, &:focus {
        color: #15afd0;
        text-shadow: 3px 5px 14px rgba(28, 200, 238, 0.4);
      }
    }
  `,
]);
