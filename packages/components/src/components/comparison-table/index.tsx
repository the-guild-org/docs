import { ComponentProps, FC } from 'react';
import { cn } from '@theguild/components';

const Table: FC<ComponentProps<'table'>> = ({ className, ...props }) => {
  return (
    <table
      className={cn(
        'x:block x:overflow-x-auto overflow-x-auto rounded-2xl border border-green-200 nextra-scrollbar',
        className,
      )}
      {...props}
    />
  );
};

const TableRow: FC<ComponentProps<'tr'> & { highlight?: boolean }> = ({
  highlight,
  className,
  ...props
}) => {
  return <tr className={cn(highlight && 'bg-green-100', className)} {...props} />;
};

const cellStyle = cn(
  'border border-green-200 p-4 first:border-l-0 last:border-r-0',
  '[tbody_&]:border-b-0 [thead_&]:border-t-0',
  'first:sticky',
  'first:left-0',
  'max-sm:first:drop-shadow-2xl',
  'first:bg-[rgb(var(--nextra-bg))]',
);

const TableHeader: FC<ComponentProps<'th'>> = ({ className, ...props }) => {
  return <th className={cn(cellStyle, 'font-medium', className)} {...props} />;
};

const TableCell: FC<ComponentProps<'td'>> = ({ className, ...props }) => {
  return <td className={cn(cellStyle, className)} {...props} />;
};

export const ComparisonTable = Object.assign(Table, {
  Row: TableRow,
  Header: TableHeader,
  Cell: TableCell,
});
