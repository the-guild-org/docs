import React, { useState, useMemo } from 'react';

import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';

import { TableItems } from "./Table";
import {TableSearch} from './TableSearch';
import {MarketplaceList} from './MarketplaceList';

import { IExampleListSearchProps } from '../types/components';

import { Header, Examples, Examples2 } from './ExampleList.styles';
import { Wrapper, Container } from './TableSearch.styles';
import { TablePagination } from './Table.styles';

import ReactPaginate from 'react-paginate';

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
// can i use MarketplaceList component here?
const Table = ({ tableItems, icon }) => (
  <tbody>
    {tableItems.map((item) => {
      return (
        <>
          {typeof item === 'string' && 
            <TableHeader
            image={''}
            text={item}
          />}
          {item.title && <TableItems
            icon={icon}
            items={[item]}
          />}
        </>
      )
    })}
  </tbody>
);

const flattenObj = (obj, keyToFlatten = '') => {
  const objCopy = Object.assign({}, obj);
  objCopy[keyToFlatten] = Object.values(obj[keyToFlatten]).flat();
  return objCopy;
};

const arrify = (items) => {
  let list = [];
  Object.keys(items).forEach((key) =>
    list.push(key, ...items[key]));
  return list;
};

// use marketplacesearch props?
export const ExampleList: React.FC<IExampleListSearchProps> = ({ title, tagsFilter, searchPlaceholder, queryList, list, pagination, tablePlaceholder, ...restProps }) => {
  const { isDarkTheme } = useThemeContext();
  const [currentPage, setCurrentPage] = useState(0);
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  const listToRender = flattenObj(queryList, 'items').items; // better
  const pageSize = pagination * 2 || 16;
  const pageCount = listToRender ? Math.ceil(listToRender.length / pageSize): 1;

  const pages = useMemo(() => {
    const itemsCopy = [...arrify(list)];
    const pagesData = [];

    while (itemsCopy.length) {
      pagesData.push(itemsCopy.splice(0, pageSize));
    }
    return pagesData;
  }, [arrify(list)])

  return (
    <Wrapper>
        <Container>
            <TableSearch
              title={title}
              tagsFilter={tagsFilter}
              placeholder={searchPlaceholder}
              queryList={flattenObj(queryList, 'items')}
              {...restProps.search}
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
                  <>
                    <Examples2>
                      <Table
                        tableItems={pages[currentPage].slice(0, pagination)}
                        icon={marketplaceAssets.caret}
                      />
                      <Table
                        tableItems={pages[currentPage].slice(pagination)}
                        icon={marketplaceAssets.caret}
                      />
                    </Examples2>
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
        </Container>
    </Wrapper> 
  );
};


