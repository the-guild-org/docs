import React, { FC, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import {
  Container,
  Placeholder,
  Title,
  Table,
  TableBody,
  TableHeader,
  TableItem,
  TableItemButton,
  TableItemDate,
  TableItemImage,
  TableItemInfo,
  TablePagination,
  Wrapper,
} from './MarketplaceList.styles';

import {
  IMarketplaceListProps,
  IMarketplaceItemsProps,
} from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import { Tag, TagsContainer } from './Tag';

const formatDate = (value: string): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(value);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const TableItems: FC<IMarketplaceItemsProps> = ({
  icon,
  items = [],
  ...restProps
}) => {
  return (
    <>
      {items.map((item) => (
        <TableItem key={item.title}>
          <td>
            {item.image && (
              <TableItemImage {...item.image} {...restProps.imageProps} />
            )}
          </td>
          <td>
            <TableItemInfo>
              <a {...item.link} {...restProps.linkProps}>
                <span>
                  <h3 {...restProps.titleProps}>{item.title}</h3>
                  <p {...restProps.descriptionProps}>{item.description}</p>
                  {item.tags && item.tags.length > 0 ? (
                    <TagsContainer>
                      {item.tags.map((tagName) => (
                        <Tag key={tagName}>{tagName}</Tag>
                      ))}
                    </TagsContainer>
                  ) : null}
                </span>
              </a>
            </TableItemInfo>
          </td>
          <td>
            <TableItemDate {...restProps.dateProps}>
              {formatDate(item.update)}
            </TableItemDate>
          </td>
          <td>
            <TableItemButton {...item.link} {...restProps.linkProps}>
              <img src={icon} alt=">" />
            </TableItemButton>
          </td>
        </TableItem>
      ))}
    </>
  );
};

export const MarketplaceList: FC<IMarketplaceListProps> = ({
  title,
  placeholder,
  items,
  pagination,
  ...restProps
}) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);

  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = pagination || 5;
  const pageCount = items ? Math.ceil(items.length / pageSize) : 1;

  const pages = useMemo(() => {
    const itemsCopy = [...items];
    const pagesData = [];

    while (itemsCopy.length) {
      pagesData.push(itemsCopy.splice(0, pageSize));
    }

    return pagesData;
  }, [items]);

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        {title && <Title {...restProps.titleProps}>{title}</Title>}
        {!pages[currentPage] || !pages[currentPage].length ? (
          <Placeholder {...restProps.placeholderProps}>
            {placeholder}
          </Placeholder>
        ) : (
          <>
            <Table>
              <TableHeader>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Last Update</th>
                  <th></th>
                </tr>
              </TableHeader>
              <TableBody>
                <TableItems
                  items={pages[currentPage]}
                  icon={marketplaceAssets.caret}
                  {...restProps.itemProps}
                />
              </TableBody>
            </Table>

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
      </Container>
    </Wrapper>
  );
};
