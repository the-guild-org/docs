import React, { Fragment, useState, useMemo } from 'react';

import { useThemeContext } from '../helpers/theme';
import {
  marketplaceThemedAssets,
  marketplaceLanguages,
} from '../helpers/assets';

import { TableItems } from './Table';
import { TableSearch } from './TableSearch';
import { MarketplaceList } from './MarketplaceList';

import { IExampleListProps, IExampleListSearchProps, ISchemaTypeProps } from '../types/components';

import { Header, TableBody, Examples } from './ExampleList.styles';
import { TablePagination } from './Table.styles';

import ReactPaginate from 'react-paginate';

const TableHeader = ({ text }: { text: string }) => (
  <Header>
    <td>
      {marketplaceLanguages(text.toLowerCase())}
      <p>{text}</p>
    </td>
    <td></td>
    <td></td>
  </Header>
);

const Table = ({
  tableItems,
  icon,
}: {
  tableItems: ISchemaTypeProps[];
  icon: string;
}) => (
  <TableBody>
    {(tableItems as Array<string | ISchemaTypeProps>).map((item, index) => {
      return (
        <Fragment key={index}>
          {typeof item === 'string' ? <TableHeader text={item} /> :
          <TableItems icon={icon} items={[item]} />}
        </Fragment>
      );
    })}
  </TableBody>
);

const flattenObj = (obj: IExampleListProps, keyToFlatten: keyof IExampleListProps) => {
  const objCopy = Object.assign({}, obj);
  objCopy[keyToFlatten] = Object.values(obj[keyToFlatten]).flat();
  return objCopy;
};

const arrify = (items: IExampleListProps) => {
  const list: any = [];
  Object.keys(items).forEach((key) => list.push(key, ...items[key]));
  return list;
};

export const ExampleList: React.FC<IExampleListSearchProps> = ({
  title,
  tagsFilter,
  placeholder,
  queryList,
  list,
  pagination,
  ...restProps
}) => {
  const { isDarkTheme } = useThemeContext();
  const [currentPage, setCurrentPage] = useState(0);
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);

  const itemsList = flattenObj(queryList, 'items');
  const itemsListLength = itemsList.items.length;
  const pageSize = pagination * 2 || 16;
  const pageCount = itemsList ? Math.ceil(itemsListLength / pageSize) : 1;

  const pages = useMemo(() => {
    const itemsCopy = [...arrify(list)];
    const pagesData = [];

    while (itemsCopy.length) {
      pagesData.push(itemsCopy.splice(0, pageSize));
    }
    return pagesData;
  }, [arrify(list)]);

  return (
    <TableSearch
      title={title}
      tagsFilter={tagsFilter}
      placeholder={placeholder}
      queryList={itemsList}
      {...restProps}
    >
      {({ items, placeholder, query }) => (
        <>
          {items && queryList ? (
            <MarketplaceList
              title={queryList.title}
              tableHeader={<TableHeader text={query.replace('#', '')} />}
              items={items}
              placeholder={placeholder}
              pagination={queryList.pagination}
              {...restProps}
            />
          ) : (
            <>
              <Examples>
                <Table
                  tableItems={pages[currentPage].slice(0, pagination)}
                  icon={marketplaceAssets.caret}
                />
                <Table
                  tableItems={pages[currentPage].slice(
                    pagination,
                    pages[currentPage].length
                  )}
                  icon={marketplaceAssets.caret}
                />
              </Examples>
              {pageCount > 1 && (
                <TablePagination>
                  <ReactPaginate
                    {...{
                      pageCount: pageCount,
                      pageRangeDisplayed: 3,
                      marginPagesDisplayed: 1,
                      onPageChange: (page) => setCurrentPage(page.selected),
                    }}
                  />
                </TablePagination>
              )}
            </>
          )}
        </>
      )}
    </TableSearch>
  );
};
