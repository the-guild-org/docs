import tw, { css, styled } from 'twin.macro';

export const Wrapper = styled.section(() => [tw`bg-white`]);

export const Container = styled.div(() => [tw`container-min py-14`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-6 font-bold text-center text-2xl md:text-3xl`,
]);

export const Items = styled.div(() => [tw`flex flex-wrap justify-center`]);

export const Item = styled.article(() => [
  tw`flex flex-col items-center mx-5 mb-1 md:mb-0 last:mb-0 text-center`,
  css`
    width: 14rem;

    img {
      ${tw`w-28`}
    }

    h3 {
      ${tw`m-0 font-bold text-lg text-black`}
    }

    p {
      ${tw`m-0 text-sm text-gray-500`}
    }
  `,
]);
