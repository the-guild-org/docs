import { ReactElement, ReactNode } from 'react';
import { cn } from '../cn';

export interface TagProps extends React.ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  selected?: boolean;
}

export const Tag = ({ children, selected, onClick, ...rest }: TagProps) => {
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
      {...rest}
    >
      {children}
    </button>
  );
};

export const TagsContainer = ({
  children,
  className,
  focusgroup,
}: {
  children: ReactNode;
  className?: string;
  focusgroup?: 'horizontal';
}): ReactElement => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn('flex flex-wrap gap-2 py-2', className)}
      onKeyDown={focusgroup ? moveFocusWithLeftAndRight : undefined}
    >
      {children}
    </div>
  );
};

const moveFocusWithLeftAndRight = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (event.target instanceof HTMLElement && event.target.tagName === 'BUTTON') {
    let next: Element | null | undefined;
    switch (event.key) {
      case 'ArrowRight':
        next = event.target.nextElementSibling;
        break;
      case 'ArrowLeft':
        next = event.target.previousElementSibling;
        break;
    }
    if (next && next instanceof HTMLElement && next.tagName === 'BUTTON') {
      event.preventDefault();
      next.focus();
    }
  }
};
