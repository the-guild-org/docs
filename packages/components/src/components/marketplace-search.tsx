import { useMemo, useState, isValidElement, useCallback, ReactElement, FormEvent } from 'react';
import clsx from 'clsx';
import { IMarketplaceSearchProps } from '../types/components';
import { MarketplaceList } from './marketplace-list';
import { Tag, TagsContainer } from './tag';
import { SearchIcon } from './icons';
import fuzzy from 'fuzzy';

const renderQueryPlaceholder = (placeholder: string | ReactElement, query: string) => {
  if (!query || isValidElement(placeholder)) {
    return placeholder;
  }
  const subStrings = placeholder.split('{query}');
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
}: IMarketplaceSearchProps): ReactElement => {
  const [query, setQuery] = useState('');

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  }, []);

  const items = useMemo(() => {
    let results = null;
    if (query && queryList) {
      return (results = queryList.items.filter(
        e =>
          fuzzy
            .filter(
              // Removes all special characters from the query string for better fuzzy matching
              query.replace(/[^\w\s]/gi, ''),
              // Mapping the queryList items into a list of strings including the titles
              queryList.items.map(e => e.title),
            )
            .map(e => e.original)
            // Filtering only the items that have been selected by the fuzzy matcher
            .includes(e.title),
        {},
      ));
    }
    return results;
  }, [query, queryList]);

  return (
    <section className={clsx('bg-white dark:bg-[#111]', className)}>
      <div className="container max-w-[90rem] py-12">
        <h2 className="mt-0 mb-4 text-2xl font-bold text-black dark:text-gray-50 md:text-3xl">
          {title}
        </h2>
        {tagsFilter && (
          <TagsContainer>
            {tagsFilter.map(tagName => (
              <Tag key={tagName} onClick={() => setQuery(`#${tagName}`)}>
                {tagName}
              </Tag>
            ))}
          </TagsContainer>
        )}
        <div className="flex border-0 border-b border-solid border-gray-300 pb-3 dark:border-gray-800">
          <SearchIcon className="text-gray-500 dark:text-white" />
          <input
            value={query}
            type="search"
            placeholder={placeholder}
            onChange={handleChange}
            className="ml-1.5 mt-0.5 w-full border-0 bg-white text-sm font-medium text-black outline-none dark:bg-[#111] dark:text-gray-50"
          />
        </div>

        <div className="flex flex-wrap gap-10 py-6 lg:flex-nowrap">
          {items && queryList ? (
            <MarketplaceList
              title={queryList.title}
              items={items}
              placeholder={renderQueryPlaceholder(queryList.placeholder, query)}
              pagination={queryList.pagination}
            />
          ) : (
            <>
              <MarketplaceList {...primaryList} />
              {secondaryList && <MarketplaceList {...secondaryList} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
