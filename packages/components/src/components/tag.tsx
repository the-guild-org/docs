import { ReactElement, ReactNode } from 'react';
import { cn } from '../cn';

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
      tabIndex={onClick ? 0 : -1}
      className={cn(
        'hive-focus inline cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-medium outline-none',
        selected
          ? 'bg-neutral-700 text-white [.green_&]:bg-green-600'
          : 'bg-neutral-900/5 text-neutral-800 dark:bg-neutral-200/10 dark:text-neutral-200 [.green_&]:bg-green-700 [.green_&]:text-green-200',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TagsContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement => {
  return <div className={cn('flex flex-wrap gap-2 py-2', className)}>{children}</div>;
};
