import { ReactElement } from 'react';
import { format } from 'date-fns';
import { IChangelogListProps } from '../types/components';

function ProductUpdateItem(props: IChangelogListProps) {
  return (
    <div className="relative mx-auto flex pb-5 pt-[10px] sm:items-center md:w-2/3">
      <div className="absolute inset-0 flex h-full w-3 items-center justify-center">
        <div className="pointer-events-none h-full w-[2px] bg-gray-100" />
      </div>
      <div className="relative z-10 mt-10 inline-flex h-3 w-3 flex-shrink-0 items-end justify-end rounded-full bg-gray-200 text-white sm:mt-0" />
      <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
        {props.icon ? (
          <div className="relative z-10 inline-flex items-center justify-center">{props.icon}</div>
        ) : null}
        <div className="mt-6  flex-grow sm:mt-0 sm:pl-6">
          <time
            className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            dateTime={props.date}
          >
            {format(new Date(props.date), 'do MMMM yyyy')}
          </time>
          <h2 className="title-font mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            <a className="cursor-pointer hover:underline" href={props.route}>
              {props.title}
            </a>
          </h2>
          <p className="mb-4 mt-1 max-w-[600px] text-base font-normal leading-6 text-gray-500 dark:text-gray-400">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export const ProductUpdates = (props: { changelogs: IChangelogListProps[] }): ReactElement => {
  return (
    <div>
      <div className="container mx-auto flex flex-wrap px-5 py-24">
        {props.changelogs.map((changelog, index) => (
          <ProductUpdateItem key={index} {...changelog} />
        ))}
      </div>
    </div>
  );
};
