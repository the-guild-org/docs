import {
  ComponentPropsWithoutRef,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

export const MarketplaceList = ({
  title,
  placeholder,
  items,
  pagination,
  className,
  as = 'section',
  children,
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

  const Root = as;

  return (
    <Root
      className={cn(
        styles.marketplace,
        colorScheme,
        'w-full bg-neutral-900 [.green_&]:bg-green-1000',
        className,
      )}
    >
      {title && (
        <Heading as="h2" size="sm" className="mt-4 text-2xl/8 font-medium text-white">
          {title}
        </Heading>
      )}
      {pages[currentPage]?.length ? (
        <>
          {children ? (
            children({ page: pages[currentPage] })
          ) : (
            <ul className={cn('space-y-6')}>
              {pages[currentPage].map(item => {
                return (
                  <li key={item.title}>
                    <MarketplaceListItem item={item} />
                  </li>
                );
              })}
            </ul>
          )}
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
              pageLinkClassName="text-sm bg-gray-200 dark:text-gray-300 dark:bg-gray-700 rounded-lg select-none hover:opacity-70 transition px-3.5 py-2"
              activeLinkClassName="invert"
            />
          )}
        </>
      ) : (
        <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-300">
          {placeholder}
        </div>
      )}
    </Root>
  );
};

export function MarketplaceListItem({ item }: { item: IMarketplaceItemProps }) {
  return (
    <Anchor
      {...item.link}
      className={cn(
        'flex flex-row gap-6 rounded-2xl bg-neutral-800 p-6 [.green_&]:bg-green-900',
        item.link.className,
      )}
    >
      <div
        className={cn(
          'size-16 shrink-0 rounded-lg bg-[--bg] md:size-16 lg:size-[92px] [.green_&]:[background:linear-gradient(135deg,_#68A8B6_0%,_#3B736A_100%)]',
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
        <h3 className="m-0 line-clamp-2 font-medium text-white lg:text-2xl">{item.title}</h3>
        <div className="mb-2 line-clamp-3 text-sm text-white/80 lg:text-base">
          {item.description}
        </div>
        {item.tags && item.tags.length > 0 && (
          <TagsContainer className="mt-auto">
            {item.tags.map(tagName => (
              <Tag key={tagName}>{tagName}</Tag>
            ))}
          </TagsContainer>
        )}
        <span className="text-xs text-white/80">
          Updated <time dateTime={item.update}>{formatDate(item.update)}</time>
        </span>
      </div>
    </Anchor>
  );
}
