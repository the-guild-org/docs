import tw, { css, styled, theme } from 'twin.macro';
import { rgba } from 'polished';

interface IStyleProps {
  colors?: string[];
}

export const Wrapper = styled.section(() => [tw`overflow-hidden`]);

export const Container = styled.div(() => [tw`relative`]);

export const Content = styled.div(() => [
  tw`container-min flex flex-wrap items-center mt-16 mb-28 pt-20 pb-1 md:(flex-nowrap mt-7 mb-20 pt-0)`,
]);

export const CTA = styled.div(() => [
  tw`relative z-1 hidden mt-4 md:(flex items-center mt-9) text-xs`,
  css`
    a {
      ${[
        tw`block w-32 mr-4 px-1.5 py-3 font-medium text-xs text-center text-white bg-light-blue rounded-md no-underline`,
        tw`transition duration-300 ease-in-out`,
      ]}

      &:hover,
      &:focus {
        box-shadow: 3px 5px 14px ${rgba(theme`colors.light-blue`, 0.4)};
      }

      &:focus {
        background-color: ${`${theme`colors.dark-blue`}`};
      }
    }

    span {
      ${tw`text-white opacity-60`}
    }
  `,
]);

export const Image = styled.picture(() => [
  tw`z-1 w-full max-w-md -ml-8 -mb-20 mt-5 order-last md:(w-auto max-w-none -ml-12 -mb-24 mt-0 order-first) lg:(w-2/3 -ml-14)`,
  css`
    img {
      ${tw`w-full`}
    }
  `,
]);

export const Info = styled.div(() => [
  tw`relative z-1`,
  css`
    h2,
    p {
      ${tw`m-0`}
    }

    h2 {
      ${[
        tw`max-w-lg mb-2.5 font-bold text-white text-2xl md:text-3xl`,
        css`
          line-height: 2.5rem !important;
        `,
      ]}
    }

    p {
      ${tw`max-w-lg text-base text-gray-300 opacity-70`}
    }
  `,
]);

export const Cubes = styled.div(() => [
  css`
    img {
      ${tw`absolute transform -translate-x-1/2 -translate-y-1/2`}

      &:nth-child(2),
      &:nth-child(3) {
        ${tw`hidden md:block`}
      }

      &:nth-child(1) {
        top: 26px;
        left: 40px;
      }

      &:nth-child(2) {
        top: 75px;
        right: -210px;
      }

      &:nth-child(3) {
        bottom: -130px;
        right: -75px;
      }

      &:nth-child(4) {
        bottom: -155px;
        left: 42px;
      }

      @media screen and (max-width: 767px) {
        &:nth-child(1) {
          top: -10px;
          left: 25px;
        }

        &:nth-child(4) {
          bottom: -110px;
          right: -60px;
          left: auto;
          transform: scaleX(-1);
        }
      }
    }
  `,
]);

export const Gradient = styled.div(({ colors }: IStyleProps) => [
  tw`absolute inset-0 bg-black overflow-hidden`,
  css`
    span {
      ${tw`absolute transform -translate-x-1/2 -translate-y-1/2`}

      height: 750px;
      width: 750px;
      border-radius: 750px;
      filter: blur(70px);
      opacity: 40%;

      &:nth-child(1),
      &:nth-child(2) {
        background-color: ${(colors && colors[0]) || 'black'};
      }

      &:nth-child(3) {
        background-color: ${(colors && colors[1]) || 'black'};
      }

      &:nth-child(1) {
        top: -150px;
        left: -60px;
      }

      &:nth-child(2) {
        ${tw`hidden md:block`}
        right: -700px;
        bottom: -800px;
      }

      &:nth-child(3) {
        left: 20px;
        bottom: -700px;
      }

      @media screen and (max-width: 767px) {
        &:nth-child(1) {
          top: -175px;
          left: -30px;
        }

        &:nth-child(3) {
          left: -30px;
          bottom: -600px;
        }
      }
    }
  `,
]);
