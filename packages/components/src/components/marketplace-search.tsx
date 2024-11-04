import { isValidElement, ReactElement, useMemo, useState } from 'react';
import fuzzy from 'fuzzy';
import { Tabs } from 'nextra/components';
import { cn } from '../cn';
import { IMarketplaceListProps, IMarketplaceSearchProps } from '../types/components';
import { Heading } from './heading';
import { CloseIcon, SearchIcon } from './icons';
import { MarketplaceList } from './marketplace-list';
import { Tag, TagsContainer } from './tag';
import './marketplace-search.css';

/**
 * @see ./marketplace-search.css
 * can't be a CSS Module because of https://github.com/egoist/tsup/issues/536
 * we're using it to style nextra/components Tabs to match the designs
 */
const classNames = {
  marketplace: 'MarketplaceSearch',
  tabs: 'MarketplaceSearchTabs',
};

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
  colorScheme = 'neutral',
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
    <section className={cn(classNames.marketplace, colorScheme, 'bg-[--bg]', className)}>
      <div className="container max-w-[90rem] py-12">
        <Heading as="h1" className="mb-4 text-[32px] text-[--fg]" size="sm">
          {title}
        </Heading>
        {tagsFilter && (
          <TagsContainer focusgroup="horizontal">
            {tagsFilter.map((tagName, i) => (
              <Tag
                key={tagName}
                selected={query.includes(`#${tagName}`)}
                onClick={() => handleTagClick(tagName)}
                tabIndex={i === 0 ? 0 : -1}
              >
                {tagName}
              </Tag>
            ))}
          </TagsContainer>
        )}
        <MarketplaceSearchInput
          onChange={setQuery}
          value={query}
          placeholder={placeholder}
          className="mt-4"
        />

        {items && queryList ? (
          <MarketplaceList
            title={queryList.title}
            items={items}
            placeholder={renderQueryPlaceholder(queryList.placeholder, query)}
            pagination={queryList.pagination}
            colorScheme={colorScheme}
          />
        ) : (
          <MarketplaceSearchTabs
            tabs={[primaryList, secondaryList]}
            colorScheme={colorScheme}
            className="mt-8"
          />
        )}
      </div>
    </section>
  );
};

function MarketplaceSearchInput({
  onChange,
  value,
  placeholder,
  className,
}: {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className="border-b border-[--fg-60]">
      <div className={cn('hive-focus-within flex items-center rounded px-2', className)}>
        <SearchIcon className="text-[--fg-80]" />
        <input
          value={value}
          type="search"
          placeholder={placeholder}
          onChange={event => onChange(event.currentTarget.value)}
          className="ml-2 w-full border-0 bg-transparent py-2 font-medium text-[--fg] outline-none placeholder:text-[--fg-60] [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          onClick={() => onChange('')}
          // A builtin clear-button can't be tabbed to. A keyboard user can cmd+A and delete.
          tabIndex={-1}
          className="flex size-6 items-center justify-center rounded-sm"
        >
          <CloseIcon className="size-5 text-[--fg-80]" />
        </button>
      </div>
    </div>
  );
}

function MarketplaceSearchTabs({
  tabs: lists,
  colorScheme,
  className,
}: {
  tabs: (IMarketplaceListProps | undefined)[];
  colorScheme: 'green' | 'neutral';
  className?: string;
}) {
  const items = lists.filter(
    (list): list is IMarketplaceListProps & { title: string } => list?.title != null,
  );

  return (
    <div className={cn(classNames.tabs, className)}>
      <Tabs items={items.map(list => list.title)}>
        {items.map((list, i) => (
          <Tabs.Tab tabIndex={-1} key={i}>
            <MarketplaceList
              {...list}
              // title is part of the `list` and we clear it here, as it's already rendered in a tab
              title={undefined}
              colorScheme={colorScheme}
            />
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
}
