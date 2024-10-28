import { isValidElement, ReactElement, useMemo, useState } from 'react';
import fuzzy from 'fuzzy';
import { Tabs } from 'nextra/components';
import { cn } from '../cn';
import { IMarketplaceListProps, IMarketplaceSearchProps } from '../types/components';
import { Heading } from './heading';
import { CloseIcon, SearchIcon } from './icons';
import { MarketplaceList } from './marketplace-list';
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
    <section className={cn(styles.marketplace, colorScheme, 'bg-[--bg]', className)}>
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
            primaryList={primaryList}
            secondaryList={secondaryList}
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
          className="ml-2 w-full border-0 bg-transparent py-2 font-medium text-[--fg] outline-none placeholder:text-[--fg-60] [&::-webkit-search-cancel-button]:[display:none]"
        />
        <button
          onClick={() => onChange('')}
          className="hive-focus flex size-6 items-center justify-center rounded-sm"
        >
          <CloseIcon className="size-5 text-[--fg-80]" />
        </button>
      </div>
    </div>
  );
}

function MarketplaceSearchTabs({
  primaryList,
  secondaryList,
  colorScheme,
  className,
}: {
  primaryList: IMarketplaceListProps;
  secondaryList: IMarketplaceListProps | undefined;
  colorScheme: 'green' | 'neutral';
  className?: string;
}) {
  return (
    <div className={cn(styles.tabs, className)}>
      <Tabs items={[primaryList.title, secondaryList?.title].filter(x => x != null)}>
        <Tabs.Tab tabIndex={-1}>
          <MarketplaceList {...primaryList} title={undefined} colorScheme={colorScheme} />
        </Tabs.Tab>
        {secondaryList && (
          <Tabs.Tab tabIndex={-1}>
            <MarketplaceList {...secondaryList} title={undefined} colorScheme={colorScheme} />
          </Tabs.Tab>
        )}
      </Tabs>
    </div>
  );
}
