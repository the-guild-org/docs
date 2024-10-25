import { Fragment, isValidElement, ReactElement, useMemo, useState } from 'react';
import fuzzy from 'fuzzy';
import { cn } from '../cn';
import { IMarketplaceSearchProps } from '../types/components';
import { Heading } from './heading';
import { CloseIcon, SearchIcon } from './icons';
import { MarketplaceList, MarketplaceListItem } from './marketplace-list';
import { Tag, TagsContainer } from './tag';
import styles from './marketplace-search.module.css';

const renderQueryPlaceholder = (placeholder: string | ReactElement, query: string) => {
  if (!query || isValidElement(placeholder)) {
    return placeholder;
  }
  const subStrings = (placeholder as string).split('{query}');
  return (
    <>
      {subStrings[0]} <strong>"{query}"</strong> {subStrings[1]}
    </>
  );
};

export const MarketplaceSearch = ({
  title,
  tagsFilter,
  placeholder,
  primaryList,
  secondaryList,
  queryList,
  className,
  colorScheme = 'green',
}: IMarketplaceSearchProps): ReactElement => {
  const [query, setQuery] = useState('');

  const handleTagClick = (tagName: string) => {
    if (query.includes(`#${tagName}`)) {
      setQuery(query.replace(`#${tagName}`, '').trim());
    } else {
      setQuery(prev => `${prev} #${tagName}`);
    }
  };

  const items = useMemo(() => {
    if (query && queryList) {
      const tags = query
        .split(/\s+/)
        .filter(e => e.startsWith('#'))
        .map(e => e.replace('#', ''));
      // Filter by tags
      let filteredItems = queryList.items;
      if (tags.length > 0) {
        filteredItems = queryList.items.filter(item => tags.every(e => item.tags?.includes(e)));
      }
      const matchedResults = fuzzy
        .filter(
          // Removes tags and all special characters from the query string for better fuzzy matching
          // query
          query
            .replace(/#\w+/gi, '')
            .replace(/[^\w\s]/gi, '')
            .trim(),
          // Mapping the queryList items into a list of strings including the titles
          filteredItems.map(e => e.title),
        )
        .map(e => e.original.toLowerCase());

      return queryList.items.filter(e => matchedResults.includes(e.title.toLowerCase()));
    }
  }, [query, queryList]);

  return (
    <article className={cn(styles.marketplace, colorScheme, 'bg-[--bg]', className)}>
      <div className="container max-w-[90rem] py-12">
        <Heading as="h1" className="mb-4 text-[32px] text-[--text]" size="sm">
          {title}
        </Heading>
        {tagsFilter && (
          <TagsContainer>
            {tagsFilter.map(tagName => (
              <Tag
                key={tagName}
                selected={query.includes(`#${tagName}`)}
                onClick={() => handleTagClick(tagName)}
              >
                {tagName}
              </Tag>
            ))}
          </TagsContainer>
        )}
        <MarketplaceSearchInput onChange={setQuery} value={query} placeholder={placeholder} />

        {items && queryList ? (
          <MarketplaceList
            title={queryList.title}
            items={items}
            placeholder={renderQueryPlaceholder(queryList.placeholder, query)}
            pagination={queryList.pagination}
            colorScheme={colorScheme}
          />
        ) : (
          // instead of two lists, we'll have tabs and a grid
          <div className="grid grid-flow-row-dense grid-cols-2 gap-y-6 [grid-auto-rows:minmax(0px,auto)] xl:gap-x-24 [&>:nth-child(-n+3)]:[grid-column:1]">
            <MarketplaceList as={Fragment} {...primaryList} colorScheme={colorScheme}>
              {({ page }) => (
                <ul
                  className="grid grid-rows-subgrid"
                  style={{
                    gridRow: `span ${page.length}`,
                  }}
                >
                  {page.map(item => (
                    <li key={item.title} className="*:h-full">
                      <MarketplaceListItem item={item} />
                    </li>
                  ))}
                </ul>
              )}
            </MarketplaceList>
            {secondaryList && (
              <MarketplaceList as={Fragment} {...secondaryList} colorScheme={colorScheme}>
                {({ page }) => (
                  <ul
                    className="grid grid-rows-subgrid"
                    style={{
                      gridRow: `span ${page.length}`,
                    }}
                  >
                    {page.map(item => (
                      <li key={item.title} className="*:h-full">
                        <MarketplaceListItem item={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </MarketplaceList>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

function MarketplaceSearchInput({
  onChange,
  value,
  placeholder,
}: {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
}) {
  return (
    <div className="flex border-0 border-b border-solid border-b-[--border] pb-3">
      <SearchIcon className="text-[--text-80]" />
      <input
        value={value}
        type="search"
        placeholder={placeholder}
        onChange={event => onChange(event.currentTarget.value)}
        className="ml-1.5 mt-0.5 w-full border-0 bg-transparent pb-2 font-medium outline-none placeholder:text-[--text-60]"
      />
      <button
        onClick={() => onChange('')}
        className="hive-focus flex size-6 items-center justify-center"
      >
        <CloseIcon className="size-5 text-[--text-80]" />
      </button>
    </div>
  );
}
