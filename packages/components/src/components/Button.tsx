import { AnchorHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

export const Button: FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'primary' | 'secondary';
  }
> = ({ children, className, variant = 'primary', ...props }) => {
  return (
    <a
      className={clsx(
        `
        flex-none
        rounded-md
        p-3
        text-center
        text-xs
        font-medium
        no-underline
        transition
        focus:bg-cyan-500
        hover:shadow-lg
        md:px-5
      `,
        variant === 'primary'
          ? 'bg-cyan-400 text-white hover:shadow-cyan-400/40'
          : 'bg-white text-black hover:shadow-white/40',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
