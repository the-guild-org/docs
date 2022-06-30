import { FC } from 'react';

export const Tag: FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick }) => {
  return (
    <button
      className="mr-2 mb-2 inline cursor-pointer rounded-md border-0 bg-gray-200 px-2 py-1 text-xs text-gray-500 outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TagsContainer: FC = ({ children }) => {
  return <div className="flex flex-wrap py-2">{children}</div>;
};
