import { Dispatch, ReactElement, ReactNode, SetStateAction, useCallback } from 'react';
import clsx from 'clsx';
import { CloseIcon } from './icons';

export const Nav = ({
  children,
  isOpen,
  setOpen,
  className,
  ...props
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  children: ReactNode;
}): ReactElement => {
  const handleOpen = useCallback(() => {
    setOpen((prev: boolean) => !prev);
  }, [setOpen]);

  return (
    <nav
      className={clsx(
        ` 
        fixed
        inset-0
        z-[49]
        flex
        flex-col
        justify-center
        bg-white
        transition-all
        duration-300
        dark:bg-gray-900
        md:static
        md:flex-row
        md:items-center
        md:justify-end
        md:transition-none`,
        !isOpen && '-top-full bottom-full',
        className
      )}
      {...props}
    >
      <button
        onClick={handleOpen}
        className="
          absolute
          top-6
          right-6
          rounded-lg
          bg-gray-200
          p-1.5
          text-gray-500
          outline-none
          transition
          hover:opacity-70
          dark:bg-gray-700
          dark:text-white
          md:hidden
        "
      >
        <CloseIcon />
      </button>

      {children}
    </nav>
  );
};
