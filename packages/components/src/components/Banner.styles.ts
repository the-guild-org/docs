import tw, { css, styled, theme } from 'twin.macro';
import type { IBannerProps } from '../types/components';

export const Wrapper = styled.div<IBannerProps>(
  ({ color, bgColor, animation }) => [
    tw`w-full sticky top-0 text-center py-4 px-6`,
    css`
      color: ${color || theme`colors.grayscale-line`};
      background: ${bgColor ||
      'linear-gradient(-45deg, #5f6184, #a7a8d7, #5f6184, #a7a8d7)'};
      background-size: 400% 200%;
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
