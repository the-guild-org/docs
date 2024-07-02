import { ReactElement } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { IChangelogListProps } from '../types/components';

function ProductUpdateItem(props: IChangelogListProps) {
  return (
    <li className={clsx('mb-10 ml-4', props.className)}>
      <div className="absolute -left-1.5 mt-1.5 size-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700" />
      <time
        className="mb-1 cursor-default text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
        dateTime={props.date}
      >
        {format(new Date(props.date), 'do MMMM yyyy')}
      </time>
      <h3 className="cursor-pointer text-lg font-semibold text-gray-900 hover:underline dark:text-white">
        <a href={props.href}>{props.title}</a>
      </h3>
      <div className="mb-4 mt-1 max-w-[600px] cursor-default text-base font-normal leading-6 text-gray-500 dark:text-gray-400">
        {props.description}
      </div>
    </li>
  );
}

export const ProductUpdates = (props: { changelogs: IChangelogListProps[] }): ReactElement => {
  return (
    <div className={clsx('flex w-full flex-col items-center', props.changelogs)}>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {props.changelogs.map(item => (
          <ProductUpdateItem key={item.href} {...item} />
        ))}
      </ol>
    </div>
  );
};
