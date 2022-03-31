import React, { useMemo, useState, isValidElement, useCallback } from 'react';
import { MarketplaceList } from './MarketplaceList';
import { IMarketplaceSearchProps } from '../types/components';
import { Tag, TagsContainer } from './Tag';
import { SearchIcon } from './Icon';

const renderQueryPlaceholder = (
  placeholder: string | React.ReactElement,
  query: string
) => {
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

export const MarketplaceSearch: React.FC<IMarketplaceSearchProps> = ({
  title,
  tagsFilter,
  placeholder,
  primaryList,
  secondaryList,
  queryList,
  ...restProps
}) => {
  const [query, setQuery] = useState('');

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  }, []);

  const items = useMemo(() => {
    let results = null;
    if (query && queryList) {
      const tagsFilter = query
        .split(' ')
        .filter((t) => t.trim().length > 1 && t.startsWith('#'));
      const queryWithoutTags =
        tagsFilter.length > 0
          ? query.replace(/#\w\w+\s?/g, '').toLowerCase()
          : query.toLowerCase();

      results = queryList.items.filter((item) => {
        const matchesContent = item.title
          .toLowerCase()
          .includes(queryWithoutTags);

        if (tagsFilter.length === 0) {
          return matchesContent;
        }
        return (
          item.tags?.some((tag) => tagsFilter.includes(`#${tag}`)) &&
          matchesContent
        );
      });
    }
    return results;
  }, [query]);

  return (
    <section
      className="bg-white font-default dark:bg-gray-900"
      {...restProps.wrapperProps}
    >
      <div className="py-12 container-max" {...restProps.containerProps}>
        <h2
          className="mt-0 mb-4 text-2xl font-bold text-black dark:text-gray-50 md:text-3xl"
          {...restProps.titleProps}
        >
          {title}
        </h2>
        {tagsFilter && (
          <TagsContainer>
            {tagsFilter.map((tagName) => (
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
            className="ml-1.5 mt-0.5 w-full border-0 bg-white text-sm font-medium text-black outline-none dark:bg-gray-900 dark:text-gray-50"
            {...restProps.searchProps}
          />
        </div>

        <div className="-mx-6 flex flex-wrap lg:flex-nowrap">
          {items && queryList ? (
            <MarketplaceList
              title={queryList.title}
              items={items}
              placeholder={renderQueryPlaceholder(queryList.placeholder, query)}
              pagination={queryList.pagination}
              {...restProps.queryListProps}
            />
          ) : (
            <>
              <MarketplaceList
                {...primaryList}
                {...restProps.primaryListProps}
              />
              {secondaryList && (
                <MarketplaceList
                  {...secondaryList}
                  {...restProps.secondaryListProps}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
