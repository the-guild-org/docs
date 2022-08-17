import { ReactElement, useEffect, useMemo, useState } from 'react';
import NextImage from 'next/future/image';
import ReactPaginatePackage from 'react-paginate';
import { IMarketplaceListProps, IMarketplaceItemsProps } from '../types/components';
import { Tag, TagsContainer } from './tag';
import { CaretSlimIcon } from './icons';
import { getDefault } from '../helpers/utils';
import clsx from 'clsx';

const ReactPaginate = getDefault(ReactPaginatePackage);

const formatDate = (value: string): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(value);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const TableBody = ({ items = [] }: IMarketplaceItemsProps): ReactElement => (
  <tbody>
    {items.map(item => (
      <tr
        className="border-0 border-b border-solid border-gray-300 text-xs font-medium text-gray-500 last:border-0 dark:border-gray-800 dark:text-gray-400"
        key={item.title}
      >
        <td className="w-14 py-4 pr-2 align-top md:w-20">{item.image && <NextImage {...item.image} />}</td>
        <td className="py-4 px-2">
          <a
            {...item.link}
            className={clsx(
              'text-gray-500 no-underline transition duration-150 ease-in-out hover:opacity-75 dark:text-gray-400',
              item.link.className
            )}
          >
            <h3 className="m-0 text-base font-bold text-black line-clamp-2 dark:text-white md:text-lg">{item.title}</h3>
            <div className="line-clamp-3 [&>p]:!m-0">{item.description}</div>
            {item.tags && item.tags.length > 0 && (
              <TagsContainer>
                {item.tags.map(tagName => (
                  <Tag key={tagName}>{tagName}</Tag>
                ))}
              </TagsContainer>
            )}
          </a>
        </td>
        <td className="hidden py-4 px-2 md:table-cell">{formatDate(item.update)}</td>
        <td className="py-4 pl-2">
          <a
            {...item.link}
            className={clsx(
              `
              inline-block
              rounded-lg
              bg-gray-200
              p-1.5
              text-gray-800
              transition
              hover:invert
              dark:bg-gray-700
              dark:text-white
              md:p-2.5`,
              item.link.className
            )}
          >
            <CaretSlimIcon className="h-5 w-5 -rotate-90" />
          </a>
        </td>
      </tr>
    ))}
  </tbody>
);

export const MarketplaceList = ({
  title,
  placeholder,
  items,
  pagination,
  className,
}: IMarketplaceListProps): ReactElement => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = pagination || 5;
  const pageCount = items ? Math.ceil(items.length / pageSize) : 1;

  useEffect(() => {
    // items change when search query is changed, so we need to reset currentPage to 0
    setCurrentPage(0);
  }, [items]);

  const pages = useMemo(() => {
    const itemsCopy = [...items];
    const pagesData = [];

    while (itemsCopy.length > 0) {
      pagesData.push(itemsCopy.splice(0, pageSize));
    }

    return pagesData;
  }, [items, pageSize]);

  return (
    <section className={clsx('w-full bg-white dark:bg-[#111]', className)}>
      {title && <h2 className="mt-0 mb-4 text-xl font-bold text-black dark:text-gray-50 md:text-2xl">{title}</h2>}
      {!pages[currentPage] || !pages[currentPage].length ? (
        <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-300">
          {placeholder}
        </div>
      ) : (
        <>
          <table
            className="
              w-full
              border-collapse
              [&_th]:!border-0
              [&_td]:!border-0
              [&_tr]:!bg-transparent
            "
          >
            <thead className="whitespace-nowrap px-2 text-left text-xs font-semibold uppercase text-gray-300 dark:text-gray-600">
              <tr className="border-0">
                <th className="px-2" />
                <th className="px-2">Name</th>
                <th className="hidden px-2 md:table-cell">Last Update</th>
                <th className="px-2" />
              </tr>
            </thead>
            <TableBody items={pages[currentPage]} />
          </table>

          {pageCount > 1 && (
            <ReactPaginate
              pageCount={pageCount}
              // control selected page
              forcePage={currentPage}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={page => setCurrentPage(page.selected)}
              containerClassName="flex justify-center gap-x-2"
              previousClassName="hidden"
              nextClassName="hidden"
              pageLinkClassName="
                text-sm
                bg-gray-200
                dark:text-gray-300
                dark:bg-gray-700
                rounded-lg
                select-none
                hover:opacity-70
                transition
                px-3.5
                py-2
              "
              activeLinkClassName="invert"
            />
          )}
        </>
      )}
    </section>
  );
};
