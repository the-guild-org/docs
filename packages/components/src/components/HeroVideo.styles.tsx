import tw, { css, styled } from 'twin.macro';

interface IStyleProps {
  flipped?: boolean;
}

export const Wrapper = styled.section(() => [tw`bg-gray-100`]);

export const Container = styled.div(({ flipped }: IStyleProps) => [
  tw`container-min flex flex-wrap py-8`,
  tw`md:(flex-nowrap justify-center items-center)`,
  flipped && tw`md:flex-row-reverse`,
]);

export const Video = styled.div(({ flipped }: IStyleProps) => [
  tw`w-full h-72 sm:(h-96) md:(h-72 w-3/5) lg:h-96 bg-white rounded-xl shadow-xl overflow-hidden`,
  flipped ? tw`md:mr-8` : tw`md:ml-8`,
]);

export const Info = styled.div(() => [
  tw`mt-8 mb-16 md:my-0`,
  css`
    h2 {
      ${tw`max-w-sm m-0 font-bold text-2xl md:text-3xl`}
    }

    p {
      ${tw`max-w-md mt-1 mb-3 text-base text-gray-500`}
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
