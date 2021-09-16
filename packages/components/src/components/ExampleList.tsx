import React, { useState } from 'react';

import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';

// import Table from "./Table";
import {TableSearch} from './TableSearch';
import {MarketplaceList} from './MarketplaceList';

import { IExampleListSearchProps } from '../types/components';

import { Header, Examples } from './ExampleList.styles';
import { Wrapper, Container } from './TableSearch.styles';

const TableHeader = ({ image, text }: { image: string, text: string}) => (
  <Header>
    <td>
      <img src={image} alt='logo' />
      <p>{text}</p>
    </td>
    <td></td>
    <td></td>
  </Header>
)

const flattenObj = (obj, keyToFlatten) => {
  const objCopy = Object.assign({}, obj);
  objCopy[keyToFlatten] = Object.values(obj[keyToFlatten]).flat();
  return objCopy;
};

// use marketplacesearch props
export const ExampleList: React.FC<IExampleListSearchProps> = ({ title, tagsFilter, placeholder, queryList, primaryList, ...restProps }) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  
  return (
    <Wrapper>
        <Container>
            <TableSearch
      title={title}
      tagsFilter={tagsFilter}
      placeholder={placeholder}
      queryList={flattenObj(queryList, 'items')}
      {...restProps}
    >
      {({ items, placeholder, query }) => (
        <>
          {items && queryList ? (
            <Examples>
                <MarketplaceList 
                title={queryList.title}
                tableHeader={<TableHeader
                    image={''}
                    text={query}
                />}
                items={items}
                placeholder={placeholder}
                pagination={queryList.pagination}
                {...restProps.queryListProps}
                />
            </Examples>
          ) : (
          <Examples>
            {
              Object.keys(primaryList.items).map((key) => {
                return (
                  <MarketplaceList
                    key={key}
                    tableHeader={<TableHeader
                        image={''}
                        text={key}
                    />}
                    items={primaryList.items[key]}
                    placeholder={placeholder}
                    pagination={queryList.pagination}
                    icon={marketplaceAssets.caret}
                  />
                )
              })
            }
          </Examples>)}
        </>
      )}
    </TableSearch>
        </Container>
    </Wrapper> 
  );
};
