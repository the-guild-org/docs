import tw, { css, styled } from 'twin.macro';
export { HeaderGlobalStyles } from '../styles/GlobalStyles';

interface themeProps {
  accentColor?: string
  isDark?: boolean
  isModal?: boolean,
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
      z-index: 300; //TODO: Used for Docusaurus, remove when no longer needed.

      ${[
      tw`absolute inset-0 flex-col justify-center`,
      tw`transition-all duration-300 ease-in-out`,
      !isModalOpen && css`top: -100vh; bottom: 100vh;`
    ]}
    }
  `,
  isDark ? tw`bg-gray-900` : tw`bg-white`,
]);

export const HeaderControls = styled.menu(() => [
  tw`flex m-0 p-0`,
  css`
    @media screen and (max-width: 768px) {
      button:first-child:not(:only-child) {
        ${tw`hidden`}
      }
    }
  `
]);

export const HeaderLogo = styled.a(() => [
  css`img {
    ${tw`first:(hidden md:block) last:(md:hidden)`}
  }`,
]);

export const HeaderLink = styled.a(({ accentColor, isDark, isModal }: themeProps) => [
  tw`inline-block mx-2.5 font-medium text-xs no-underline`,
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
  isModal ?
    isDark ? tw`text-white` : tw`text-black` :
    isDark ? tw`text-gray-100` : tw`text-gray-500`
  ,
]);

export const HeaderIcon = styled.button(({ iconType }: themeProps) => [
  tw`flex md:hidden justify-center items-center p-1.5`,
  tw`bg-transparent border-0 outline-none cursor-pointer hover:opacity-70`,
  tw`transition duration-200 ease-in-out`,
  iconType === 'toggle' && tw`transform scale-125 mt-4 md:(flex transform-none m-0)`,
  iconType === 'close' && tw`absolute top-6 right-6`,
]);

export const HeaderSide = styled.div(() => [
  tw`flex md:hidden`,
  css`min-width: 3.25rem;`
]);

export const HeaderSearch = styled.button(({ accentColor, isDark }: themeProps) => [
  tw`flex items-center mx-3 pl-1 pr-8 py-1 border-2 border-transparent rounded-md`,
  tw`font-sans font-medium text-xs outline-none cursor-pointer`,
  tw`transition duration-200 ease-in-out`,
  css`
      img { 
      ${tw`mr-1`} 
    }

    &:hover {
      img { 
        ${tw`opacity-70`} 
      }
    }

    @media screen and (max-width: 768px) {
      ${tw`p-0 bg-transparent`}
      span { 
        ${tw`hidden`} 
      }
      img { 
        ${tw`m-0 w-6 h-6`} 
      }
    }
  `,
  accentColor && css`&:hover, &:focus {
    border: 2px solid ${accentColor};
  }`,
  isDark ? tw`bg-gray-700 text-gray-200` : tw`bg-gray-100 text-gray-400`,
]);