import React, { useEffect, useState } from 'react';

import { MarketplaceList } from './MarketplaceList';

import {
  Container,
  Results,
  Search,
  Title,
  Wrapper,
} from './MarketplaceSearch.styles';

import {
  IMarketplaceSearchProps,
  IMarketplaceItemProps,
} from '../types/components';
import { marketplaceThemedAssets } from '../helpers/assets';
import { ThemeContext } from '../helpers/theme';

export const MarketplaceSearch: React.FC<IMarketplaceSearchProps> = ({
  title,
  placeholder,
  primaryList,
  secondaryList,
  queryList,
}) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  const [items, setItems] = useState<Array<IMarketplaceItemProps> | null>(null);
  const [query, setQuery] = useState<string>();

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

  useEffect(() => {
    let results = null;
    if (query) {
      results = queryList.items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setItems(results);
  }, [query]);

  return (
    <Wrapper>
      <Container>
        <Title>{title}</Title>
        <Search>
          <img
            src={marketplaceAssets.search}
            alt="Search"
            height="24"
            width="24"
          />
          <input
            type="search"
            placeholder={placeholder}
            onChange={handleChange}
          />
        </Search>

        {items ? (
          <Results>
            <MarketplaceList
              title={queryList.title}
              items={items}
              placeholder={renderQueryPlaceholder(queryList.placeholder, query)}
              pagination={queryList.pagination}
            />
          </Results>
        ) : (
          <Results>
            <MarketplaceList {...primaryList} />
            <MarketplaceList {...secondaryList} />
          </Results>
        )}
      </Container>
    </Wrapper>
  );
};
