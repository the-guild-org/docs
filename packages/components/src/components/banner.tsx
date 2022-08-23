import { CSSProperties, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export type BannerProps = {
  children?: string | ReactNode;
  color?: CSSProperties['color'];
  bgColor?: CSSProperties['color'];
  animation?: CSSProperties['animation'];
};

export const Banner = ({
  children,
  animation,
  color = '#e7e7e7',
  bgColor = 'linear-gradient(-45deg, #5f6184, #a7a8d7, #5f6184, #a7a8d7)',
}: BannerProps): ReactElement => {
  return (
    <div
      className={clsx(
        'sticky top-0 w-full py-4 px-6 text-center [background:var(--bgColor)] [color:var(--color)]',
        animation || 'animate-gradient'
      )}
      style={{
        '--color': color,
        '--bgColor': bgColor,
        // couldn't set with tailwindcss
        backgroundSize: '400% 200%',
      }}
    >
      {children}
    </div>
  );
};
