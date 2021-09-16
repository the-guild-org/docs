import React, { useState } from 'react';

import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';

import Table from "./Table";
import TableSearch from './TableSearch';
import {MarketplaceList} from './MarketplaceList';

import { IExampleListSearchProps } from '../types/components';

import { Examples } from './ExampleList.styles';

const TableHeader = ({ image, text }: { image: string, text: string}) => (
  <tr>
    <td>
      <img src={image} alt='logo' />
      <p>{text}</p>
    </td>
    <td></td>
    <td></td>
  </tr>
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
    <TableSearch
      title={title}
      tagsFilter={tagsFilter}
      placeholder={placeholder}
      queryList={flattenObj(queryList, 'items')}
      {...restProps}
    >
      {({ items, placeholder }) => (
        <>
          {items && queryList ? (
            <MarketplaceList 
              title={queryList.title}
              items={items}
              placeholder={placeholder}
              pagination={queryList.pagination}
              {...restProps.queryListProps}
            />
          ) : (
          <Examples>
            {
              Object.keys(primaryList.items).map((key) => {
                return (
                  <Table
                    key={key}
                    tableHeader={<TableHeader
                      image={''}
                      text={key}
                    />}
                    items={primaryList.items[key]}
                    icon={marketplaceAssets.caret}
                  />
                )
              })
            }
          </Examples>)}
        </>
      )}
    </TableSearch>   
  );
};
