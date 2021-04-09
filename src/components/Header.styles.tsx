import tw, { css, styled } from 'twin.macro';
interface themeProps {
  accentColor?: string
  isDark?: boolean
  isModalOpen?: boolean
  iconType?: 'close' | 'toggle'
}

export const HeaderWrapper = styled.div(({ isDark }: themeProps) => [
  tw`px-6 py-2 md:py-5 font-sans`,
  isDark ? tw`bg-gray-900` : tw`bg-white`
]);

export const HeaderContainer = styled.div`
  ${tw`container flex justify-between items-center mx-auto`}
`;

export const HeaderNav = styled.nav(({ isDark, isModalOpen }: themeProps) => [
  tw`static flex flex-row justify-end items-center`,
  css`
    @media screen and (max-width: 768px) {
      z-index: 300;

      ${[
      tw`absolute inset-0 flex-col justify-center`,
      tw`transition-all duration-300 ease-in-out`
    ]}
      ${!isModalOpen && css`top: -100vh; bottom: 100vh;`}
    }
  `,
  isDark ? tw`bg-gray-900` : tw`bg-white`,
]);

export const HeaderControls = styled.menu`
  ${tw`flex m-0 p-0`}
`;

export const HeaderLogo = styled.div(() => [
  css`
    img {
      &:first-of-type {
        ${tw`hidden md:block`}
      }
      &:last-of-type {
        ${tw`md:hidden`}
      }
    }
  `,
]);

export const HeaderLink = styled.a(({ accentColor, isDark }: themeProps) => [
  tw`inline-block mx-2.5 text-xs no-underline`,
  tw`transition duration-200 ease-in-out`,
  css`
    img {
      ${tw`pl-1 pb-0.5`}
    }

    @media screen and (max-width: 768px) {
      ${tw`block mx-0 py-5 text-center text-xl`}
    }

    @media screen and (max-width: 360px) {
      ${tw`py-3 text-lg`}
    }
  `,
  accentColor && css`&:hover {
    color: ${accentColor};
  }`,
  isDark ? tw`text-gray-100` : tw`text-black`,
]);

export const HeaderIcon = styled.button(({ iconType }: themeProps) => [
  tw`flex md:hidden justify-center items-center p-1.5`,
  tw`bg-transparent border-0 outline-none cursor-pointer`,
  tw`transition duration-200 ease-in-out`,
  css`&:hover {
    opacity: 0.7;
  }`,
  iconType === 'toggle' && tw`transform scale-125 mt-4 md:flex md:transform-none md:m-0`,
  iconType === 'close' && tw`absolute top-6 right-6`,
]);

export const HeaderSearch = styled.button(({ accentColor, isDark }: themeProps) => [
  tw`hidden md:flex items-center mx-3 pl-2 pr-8 py-2 border-2 border-transparent rounded-md`,
  tw`font-sans font-medium text-xs outline-none cursor-pointer`,
  tw`transition duration-200 ease-in-out`,
  css`
    img {
      ${tw`mr-2`}
    }
  `,
  accentColor && css`&:hover, &:focus {
    border: 2px solid ${accentColor};
  }`,
  isDark ? tw`bg-gray-700 text-gray-200` : tw`bg-gray-100 text-gray-400`,
]);