import { ReactElement, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { cn } from '../cn';
import { IMarketplaceItemProps, IMarketplaceListProps } from '../types/components';
import { Anchor } from './anchor';
import { Heading } from './heading';
import { Image } from './image';
import { Tag, TagsContainer } from './tag';
import styles from './marketplace-search.module.css';

const formatDate = (value: string): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(value);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const numberFormat = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

export const MarketplaceList = ({
  title,
  placeholder,
  items,
  pagination,
  className,
  colorScheme = 'black',
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
    <section
      className={cn(
        styles.marketplace,
        colorScheme,
        'w-full dark:bg-neutral-900 [&.green]:bg-green-1000',
        className,
      )}
    >
      {title && (
        <Heading
          as="h2"
          size="sm"
          className="mb-6 mt-4 text-2xl/8 font-medium text-[--fg,theme(colors.neutral.900)] dark:text-white"
        >
          {title}
        </Heading>
      )}
      {pages[currentPage]?.length ? (
        <>
          <ul className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {pages[currentPage].map(item => {
              return (
                <li key={item.title} className="*:h-full">
                  <MarketplaceListItem item={item} />
                </li>
              );
            })}
          </ul>
          {pageCount > 1 && (
            <ReactPaginate
              pageCount={pageCount}
              forcePage={currentPage}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={page => setCurrentPage(page.selected)}
              containerClassName="flex justify-center gap-2 mt-6"
              previousClassName="hidden"
              nextClassName="hidden"
              breakLinkClassName="text-[--fg-80] [.green_&]:text-green-200"
              pageLinkClassName="text-sm font-medium rounded-lg [.green_&]:text-green-200 [.green_&]:border-green-700 border border-neutral-600 dark:text-neutral-200 size-[28px] flex justify-center items-center select-none"
              activeLinkClassName="text-[--bg] dark:!text-[--bg] bg-[--fg] [.green_&]:bg-green-300 [.green_&]:text-green-800"
            />
          )}
        </>
      ) : (
        <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-300">
          {placeholder}
        </div>
      )}
    </section>
  );
};

export function MarketplaceListItem({ item }: { item: IMarketplaceItemProps }) {
  return (
    <Anchor
      {...item.link}
      className={cn(
        '@container @lg:gap-6 flex flex-row gap-4 rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-800 [.green_&]:bg-green-900',
        item.link.className,
      )}
    >
      <div
        className={cn(
          '@2xl:size-[92px] @lg:size-16 size-16 shrink-0 rounded-lg bg-[--bg] [.green_&]:[background:linear-gradient(135deg,_#68A8B6_0%,_#3B736A_100%)]',
        )}
      >
        <Image
          {...item.image}
          width="92"
          height="92"
          className="aspect-square rounded-lg object-contain"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="@lg:text-2xl m-0 line-clamp-2 font-medium text-[--fg]">{item.title}</h3>
        <div className="@lg:text-base mb-2 line-clamp-3 text-sm text-[--fg-80]">
          {item.description}
        </div>
        {item.tags && item.tags.length > 0 && (
          <TagsContainer className="mt-auto">
            {item.tags.map(tagName => (
              <Tag key={tagName}>{tagName}</Tag>
            ))}
          </TagsContainer>
        )}
        <div className="@lg:text-sm flex flex-wrap gap-x-4 text-xs text-[--fg-80]">
          <span>
            Updated <time dateTime={item.update}>{formatDate(item.update)}</time>
          </span>
          {item.weeklyNPMDownloads && (
            <span className="@sm:block hidden">
              {numberFormat.format(item.weeklyNPMDownloads)} weekly downloads
            </span>
          )}
        </div>
      </div>
    </Anchor>
  );
}
