import tw, { css, styled } from 'twin.macro';
export { HeaderGlobalStyles } from '../styles/GlobalStyles';

interface themeProps {
  accentColor?: string
  hasModal?: boolean
  isModalOpen?: boolean
  iconType?: 'close' | 'toggle'
}

export const HeaderWrapper = styled.div(() => [
  tw`px-6 py-2 md:py-5 font-sans`,
  tw`dark:bg-gray-900 bg-white`
]);

export const HeaderContainer = styled.div`
  ${tw`container flex justify-between items-center mx-auto`}
`;

export const HeaderNav = styled.nav(({ isModalOpen }: themeProps) => [
  tw`absolute inset-0 flex flex-col justify-center`,
  tw`transition-all duration-300 ease-in-out`,
  tw`md:(static flex-row justify-end items-center transition-none)`,
  css`
    z-index: 300; //TODO: Used for Docusaurus, remove when no longer needed.
    @media screen and (max-width: 768px) {
      ${!isModalOpen && css`top: -100vh; bottom: 100vh;`}
    }
  `,
  tw`dark:bg-gray-900 bg-white`
]);

export const HeaderControls = styled.menu(() => [
  tw`flex justify-center m-0 p-0`,
  css`
    button:first-child:not(:only-child) {
      ${tw`hidden md:flex`}
    }
  `
]);

export const HeaderLogo = styled.a(() => [
  css`img {
    ${tw`first:(hidden md:block) last:(md:hidden)`}
  }`,
]);

export const HeaderLink = styled.a(({ accentColor, hasModal }: themeProps) => [
  tw`block mx-0 py-3 font-medium text-sm text-center no-underline`,
  tw`sm:(text-lg py-5)`,
  tw`md:(inline-block mx-2.5 py-0 text-xs text-left)`,
  tw`transition duration-200 ease-in-out`,
  css`
    img {
      ${tw`pl-1 pb-0.5`}
    }
  `,
  accentColor && css`&:hover {
    color: ${accentColor} !important;
  }`,
  hasModal ?
    tw`dark:text-white text-black` :
    tw`dark:text-gray-300 text-gray-500`
]);

export const HeaderIcon = styled.button(({ iconType }: themeProps) => [
  tw`flex md:hidden justify-center items-center p-1.5`,
  tw`bg-transparent border-0 outline-none cursor-pointer hover:opacity-70`,
  tw`transition duration-200 ease-in-out`,
  iconType === 'toggle' && tw`transform scale-125 mt-4 md:(flex transform-none m-0)`,
  iconType === 'close' && tw`absolute top-6 right-6`,
]);

export const HeaderSide = styled.div(() => [
  tw`flex first:justify-start last:justify-end md:hidden`,
  css`min-width: 3.25rem;`
]);

// Dummy component 
// Docusaurus' Algolia SearchBar is being rendered on the websites instead of this
export const HeaderSearch = styled.button(() => [
  tw`flex items-center p-0 font-sans font-medium text-xs text-gray-500 bg-transparent border-transparent outline-none cursor-pointer`,
  tw`md:(mx-3 pl-1 pr-8 py-1 border-2 bg-gray-100 rounded-md)`,
  tw`md:dark:(bg-gray-800 text-gray-300)`,
  tw`transition duration-200 ease-in-out`,
  css`
    img { 
      ${tw`h-6 w-6 m-0 md:(h-4.5 w-4.5 mr-1)`} 
    }

    &:hover {
      img { 
        ${tw`opacity-70`} 
      }
    }

    span { 
      ${tw`hidden md:block`} 
    }
  `,
]);