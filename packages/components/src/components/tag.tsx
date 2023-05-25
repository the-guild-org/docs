import { ReactElement, ReactNode } from 'react';

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
      className={`mr-2 mb-2 inline cursor-pointer rounded-md border-0 ${
        selected ? 'bg-gray-400 text-gray-700' : 'bg-gray-200 text-gray-500'
      } px-2 py-1 text-xs text-gray-500 outline-none`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TagsContainer = ({ children }: { children: ReactNode }): ReactElement => {
  return <div className="flex flex-wrap py-2">{children}</div>;
};
