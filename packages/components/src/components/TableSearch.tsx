import React, { useMemo, useState } from 'react';

import { IBaseItemProps, ITableSearchProps } from '../types/components';
import { Container, Search, Title, Wrapper } from './TableSearch.styles';

import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';

import { Tag, TagsContainer } from './Tag';

export const TableSearch: React.FC<ITableSearchProps> = ({
                                                           title,
                                                           tagsFilter,
                                                           placeholder,
                                                           queryList,
                                                           children,
                                                           ...restProps
                                                         }) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.FormEvent<EventTarget>) => {
    const query = e.target as HTMLInputElement;
    setQuery(query.value);
  };

  const renderQueryPlaceholder = (
    placeholder: string | React.ReactElement,
    query: string | undefined
  ) => {
    if (!query || React.isValidElement(placeholder)) {
      return placeholder;
    }

    const subStrings = placeholder.split('{query}');
    return (
      <p>
        {subStrings[0]} <strong>{`"${query}"`}</strong> {subStrings[1]}
      </p>
    );
  };

  const items = useMemo(() => {
    let results: IBaseItemProps[] = [];
    if (query && queryList) {
      const tagsFilter = (query || '')
        .toLowerCase()
        .split(' ')
        .filter((t) => t.trim().length > 1 && t.startsWith('#'));
      const queryWithoutTags =
        tagsFilter.length > 0
          ? query.replace(/#\w\w+\s?/g, '').toLowerCase()
          : query.toLowerCase();

      results = (queryList.items as IBaseItemProps[]).filter((item: IBaseItemProps) => {
        const matchesContent = item.title
          .toLowerCase()
          .includes(queryWithoutTags);

        if (tagsFilter.length === 0) {
          return matchesContent;
        } else {
          return (
            item.tags?.some((tag) => tagsFilter.includes(`#${tag}`)) &&
            matchesContent
          );
        }
      });


      if (tagsFilter.length > 0 && tagsFilter.includes(`#all`)) {
        results = queryList.items;
      }
    }

    return results;
  }, [query]);

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        <Title {...restProps.titleProps}>{title}</Title>
        {tagsFilter && (
          <TagsContainer>
            {tagsFilter.map((tagName) => (
              <Tag onClick={() => setQuery(`#${tagName}`)} key={tagName}>
                {tagName}
              </Tag>
            ))}
          </TagsContainer>
        )}
        <Search>
          <img
            src={marketplaceAssets.search}
            alt='Search'
            height='24'
            width='24'
          />
          <input
            value={query}
            type='search'
            placeholder={placeholder}
            onChange={handleChange}
            {...restProps}
          />
        </Search>
        {children({
          items: items,
          placeholder:
            queryList ? renderQueryPlaceholder(queryList.placeholder, query) : '',
          query: query
        })}
      </Container>
    </Wrapper>
  );
};
