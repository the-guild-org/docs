import { FC } from 'react';
import type { IBannerProps } from '../types/components';
import clsx from 'clsx';

export const Banner: FC<IBannerProps> = ({
  children,
  animation,
  color = '#e7e7e7',
  bgColor = 'linear-gradient(-45deg, #5f6184, #a7a8d7, #5f6184, #a7a8d7)',
  ...restProps
}) => {
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
      {...restProps}
    >
      {children}
    </div>
  );
};
