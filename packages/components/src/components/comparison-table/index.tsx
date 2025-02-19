import { ComponentProps, FC } from 'react';
import { cn } from '@theguild/components';

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLTableElement> {
  scheme?: 'green' | 'neutral';
}
const Table = ({ className, scheme = 'green', ...props }: ComparisonTableProps) => {
  return (
    <table
      className={cn(
        'x:block x:overflow-x-auto nextra-scrollbar overflow-x-auto rounded-2xl border border-[--border]',
        scheme === 'green' &&
          '[--border:theme(colors.green.200)] [--highlight-bg:theme(colors.green.100)]',
        scheme === 'neutral' &&
          '[--border:theme(colors.beige.400)] [--highlight-bg:theme(colors.beige.100)] dark:[--border:theme(colors.neutral.800)]',
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
  return (
    <tr
      className={cn(
        'bg-[--highlight,var(--highlight-bg)] [--highlight:0]',
        highlight && '[--highlight:initial]',
        className,
      )}
      {...props}
    />
  );
};

const cellStyle = cn(
  'border border-[--border] p-4 first:sticky first:left-0 first:border-l-0 first:bg-[--highlight,var(--highlight-bg)] last:border-r-0 max-sm:first:drop-shadow-2xl [tbody_&]:border-b-0 [thead_&]:border-t-0',
);

const TableHeader: FC<ComponentProps<'th'>> = ({ className, ...props }) => {
  return <th className={cn(cellStyle, 'font-medium', className)} {...props} />;
};

const TableCell: FC<ComponentProps<'td'>> = ({ className, ...props }) => {
  return <td className={cn(cellStyle, className)} {...props} />;
};

/**
 * It's exported under the name `ComparisonTable`
 * because we also reexport `Table` from nextra.
 */
export const ComparisonTable = Object.assign(Table, {
  Row: TableRow,
  Header: TableHeader,
  Cell: TableCell,
});
