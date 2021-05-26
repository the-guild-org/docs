import tw, { css, styled, theme } from 'twin.macro';

interface IStyleProps {
  colors?: string[];
  hasImage?: boolean;
}

export const Wrapper = styled.section(() => [
  tw`text-white overflow-hidden md:pt-14`,
]);

export const Container = styled.div(() => [tw`container-min relative`]);

export const Content = styled.div(({ hasImage }: IStyleProps) => [
  hasImage
    ? tw`mb-32 pt-8 pb-72 md:(mb-4 px-10 pt-24 pb-14)`
    : tw`pt-20 pb-20 md:(px-10 pt-24 pb-14)`,
]);

export const CTA = styled.div(() => [
  tw`relative z-1 flex items-center mt-4 md:mt-9 text-xs`,
  css`
    a {
      ${[
        tw`block w-32 mr-4 px-1.5 py-3 font-medium text-xs text-center text-black bg-white rounded-md no-underline`,
        tw`transition duration-300 ease-in-out`,
      ]}

      &:hover, &:focus {
        box-shadow: 3px 5px 14px rgba(255, 255, 255, 0.4);
      }

      &:focus {
        background-color: ${theme`colors.dark-blue`};
      }
    }

    span {
      ${tw`text-white opacity-60`}
    }
  `,
]);

export const Image = styled.img(() => [
  tw`absolute w-full max-w-sm -bottom-36 -right-4 sm:(max-w-md) md:(-top-14 -right-16)`,
]);

export const Info = styled.div(() => [
  tw`relative z-1`,
  css`
    h1,
    p {
      ${tw`m-0`}
    }

    h1 {
      ${[
        tw`max-w-lg mb-2.5 font-bold text-2xl md:text-3xl`,
        css`
          line-height: 2.5rem !important;
        `,
      ]}
    }

    p {
      ${tw`max-w-md text-base md:text-lg text-gray-50 opacity-70`}
    }
  `,
]);

export const Gradient = styled.div(({ colors }: IStyleProps) => [
  tw`absolute inset-0 bg-black md:(mx-6 rounded-3xl) overflow-hidden`,
  css`
    span {
      ${tw`absolute transform -translate-x-1/2 -translate-y-1/2`}

      height: 500px;
      width: 500px;
      border-radius: 500px;
      filter: blur(60px);

      &:nth-child(1),
      &:nth-child(2) {
        background-color: ${(colors && colors[0]) || 'black'};
      }

      &:nth-child(3),
      &:nth-child(4) {
        background-color: ${(colors && colors[1]) || 'black'};
      }

      &:nth-child(1) {
        top: -100px;
        left: -40px;
      }

      &:nth-child(2) {
        ${tw`hidden md:block`}
        top: -20px;
        right: -450px;
      }

      &:nth-child(3) {
        right: -350px;
        bottom: -500px;
        filter: blur(70px);
      }

      &:nth-child(4) {
        left: -50px;
        bottom: -600px;
      }

      @media screen and (max-width: 767px) {
        &:nth-child(1) {
          top: -115px;
          left: -15px;
        }

        &:nth-child(3) {
          right: -700px;
          bottom: -450px;
        }

        &:nth-child(4) {
          left: -10px;
          bottom: -475px;
        }
      }
    }
  `,
]);
