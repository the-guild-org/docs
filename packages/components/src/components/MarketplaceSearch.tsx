import React, { useEffect, useState } from 'react';

import { MarketplaceList } from './MarketplaceList';
import { dummyMarketplaceList } from '../helpers/dummy';

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
}) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  const [items, setItems] = useState<Array<IMarketplaceItemProps> | null>(null);
  const [query, setQuery] = useState<string>();

  const handleChange = (e: React.FormEvent<EventTarget>) => {
    const query = e.target as HTMLInputElement;
    setQuery(query.value);
  };

  useEffect(() => {
    let results = null;
    if (query) {
      results = dummyMarketplaceList.items.filter((item) =>
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
              title="Query results"
              placeholder={
                <p>
                  No results for <strong>{`"${query}"`}</strong>.
                </p>
              }
              pagination={6}
              items={items}
            />
          </Results>
        ) : (
          <Results>
            <MarketplaceList
              title="Trending & Last Update"
              placeholder="No products available..."
              pagination={5}
              items={dummyMarketplaceList.items.slice(0, 7)}
            />
            <MarketplaceList
              title="New Release"
              placeholder="No products available..."
              pagination={5}
              items={[]}
            />
          </Results>
        )}
      </Container>
    </Wrapper>
  );
};
