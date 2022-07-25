import { AnchorHTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps): ReactElement => {
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
        hover:shadow-lg
        focus:bg-cyan-500
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
