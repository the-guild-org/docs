import tw, { css, styled, theme } from 'twin.macro';

interface IStyleProps {
  color?: string;
  backgroundColor?: string;
  animation?: React.CSSProperties['animation'];
}

export const Wrapper = styled.div(
  ({ color, backgroundColor, animation }: IStyleProps) => [
    tw`w-full sticky top-0`,
    css`
      padding: 15px 25px;
      color: ${color || theme`colors.grayscale-line`};
      background-color: ${backgroundColor || theme`colors.grayscale-label`};
      animation: ${animation || 'gradient 15s ease infinite'};
      @keyframes gradient {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }
    `,
  ]
);
