import React from 'react';
import ReactPaginate from 'react-paginate';

import { Table, TableBody, TableHeader, TableItem, TableItemImage, TableItemInfo, TableItemDate, TableItemButton, TablePagination } from "./Table.styles";

import { IMarketplaceItemsProps } from '../types/components'; 
import { Tag, TagsContainer } from "./Tag";

const TableItems: React.FC<IMarketplaceItemsProps> = ({
  icon,
  items,
  handleModal,
  setCurrentItem,
  ...restProps
}) => {
  const formatDate = (value: string) => {
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
    return `${
        months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`
  };

  return (
    <>
      {items &&
        items.map((item) => (
          <TableItem key={item.title}>
            {item.image && (
              <td id="td-image">
                <TableItemImage {...item.image} {...restProps.imageProps} />
              </td>
            )}
            <td>
              <TableItemInfo>
                <a
                  {...(item.link
                    ? item.link
                    : {
                        onClick: () => {
                          setCurrentItem && setCurrentItem(item);
                          handleModal && handleModal(true);
                        },
                      })}
                  {...restProps.linkProps}
                >
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
            {item.update && (
              <td id="td-date">
                <TableItemDate {...restProps.dateProps}>
                  {formatDate(item.update)}
                </TableItemDate>
              </td>
            )}
            <td id="td-icon-button">
              <TableItemButton
                type="button"
                onClick={() => {
                  setCurrentItem && setCurrentItem(item);
                  handleModal && handleModal(true);
                }}
              >
                <img src={icon} alt=">" />
              </TableItemButton>
            </td>
          </TableItem>
        ))
      }
    </>
  );
};

const DefaultTable: React.FC<any> = ({ tableHeader, items, icon, setCurrentItem, handleModal, pageCount, setCurrentPage, ...restProps}) => {
  return (
    <>
      <Table>
        <TableHeader>{tableHeader}</TableHeader>
        <TableBody>
          <TableItems items={items} icon={icon} setCurrentItem={setCurrentItem} handleModal={handleModal} {...restProps} />
        </TableBody>
      </Table>

      {pageCount > 1 && (
        <TablePagination>
          <ReactPaginate
            {...{
              pageCount: pageCount,
              pageRangeDisplayed: 3,
              marginPagesDisplayed: 1,
              onPageChange: setCurrentPage,
            }}
          />
        </TablePagination>
      )}
    </>
  )
}

export default DefaultTable;
