'use client'
import { FormEvent, isValidElement, ReactElement, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import fuzzy from 'fuzzy';
import { IMarketplaceSearchProps } from '../types/components';
import { CloseIcon, SearchIcon } from './icons';
import { MarketplaceList } from './marketplace-list';
import { Tag, TagsContainer } from './tag';

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
}: IMarketplaceSearchProps): ReactElement => {
  const [query, setQuery] = useState('');

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  }, []);

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
    <section className={clsx('bg-white dark:bg-dark', className)}>
      <div className="container max-w-[90rem] py-12">
        <h2 className="mb-4 mt-0 text-2xl font-bold text-black md:text-3xl dark:text-gray-50">
          {title}
        </h2>
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
        <div className="flex border-0 border-b border-solid border-gray-300 pb-3 dark:border-gray-800">
          <SearchIcon className="text-gray-500 dark:text-white" />
          <input
            value={query}
            type="search"
            placeholder={placeholder}
            onChange={handleChange}
            className="ml-1.5 mt-0.5 w-full border-0 bg-white text-sm font-medium text-black outline-none dark:bg-dark dark:text-gray-50"
          />
          <button
            onClick={() => setQuery('')}
            className="text-gray-300 hover:text-gray-700 dark:hover:text-white"
          >
            <CloseIcon />
          </button>
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
