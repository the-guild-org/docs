import tw, { css, styled, theme } from 'twin.macro';

interface IStyleProps {
  color?: string;
  backgroundColor?: string;
}

export const Wrapper = styled.div(({ color, backgroundColor }: IStyleProps) => [
  tw`w-full p-2 sticky top-0`,
  css`
    color: ${color || theme`colors.grayscale-line`};
    background-color: ${backgroundColor || theme`colors.grayscale-label`};
  `,
]);
