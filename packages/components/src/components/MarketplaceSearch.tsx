import React from 'react';

import { MarketplaceList } from './MarketplaceList';

import { Results } from './MarketplaceSearch.styles';

import { IMarketplaceSearchProps } from '../types/components';
import { TableSearch } from './TableSearch';

export const MarketplaceSearch: React.FC<IMarketplaceSearchProps> =
  ({
     title,
     tagsFilter,
     placeholder,
     primaryList,
     secondaryList,
     queryList,
     ...restProps
   }) => {
    return (
      <TableSearch title={title}
                   tagsFilter={tagsFilter}
                   placeholder={placeholder}
                   queryList={queryList}
                   {...restProps}>
        {({ items, placeholder }) => (
          <>
            {items && queryList ? (
              <Results>
                <MarketplaceList
                  title={queryList.title}
                  items={items}
                  placeholder={placeholder}
                  pagination={queryList.pagination}
                  {...restProps.queryListProps}
                />
              </Results>
            ) : (
              <Results>
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
              </Results>
            )}
          </>
        )}
      </TableSearch>
    );
  };
