import { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export const Tag = ({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={clsx(
        'mb-2 mr-2 inline cursor-pointer rounded-md border-0 px-2 py-1 text-xs text-gray-500 outline-none',
        selected ? 'bg-gray-400 text-gray-700' : 'bg-gray-200 text-gray-500',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TagsContainer = ({ children }: { children: ReactNode }): ReactElement => {
  return <div className="flex flex-wrap py-2">{children}</div>;
};
