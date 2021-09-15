import React, { useState } from 'react';

import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';

import Table from "./Table";
import TableSearch from './TableSearch';
import {MarketplaceList} from './MarketplaceList';

import { ISearchProps } from '../types/components';

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

const ExampleList: React.FC<ISearchProps> = ({ title, tagsFilter, placeholder, queryList, ...restProps }) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  
  return (
    <TableSearch title={title} tagsFilter={tagsFilter} placeholder={placeholder} queryList={queryList} {...restProps}>
      {({ items, placeholder }) => (
          console.log('items ---', items, 'qL-', queryList),
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
              items && items.map((item) => {
                return (
                  <Table
                    key={item.header.text}
                    tableHeader={<TableHeader
                      image={item.header.image}
                      text={item.header.text}
                    />}
                    items={item.list}
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

export default ExampleList;
