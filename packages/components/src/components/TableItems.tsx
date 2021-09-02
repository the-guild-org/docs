import React from 'react';

import { TableItem, TableItemImage, TableItemInfo, TableItemDate, TableItemButton } from "./TableItems.styles";

import { IMarketplaceItemsProps } from '../types/components'; 
import { Tag, TagsContainer } from "./Tag";

const TableItems: React.FC<IMarketplaceItemsProps> = ({
  icon,
  items,
  handleModal,
  setCurrentItem,
  isDefault = true,
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
              <td>
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
                          setCurrentItem(item);
                          handleModal(true);
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
            {isDefault && (
              <td>
                <TableItemDate {...restProps.dateProps}>
                  {formatDate(item.update)}
                </TableItemDate>
              </td>
            )}
            <td>
              <TableItemButton
                type="button"
                onClick={() => {
                  handleModal(true);
                  setCurrentItem(item);
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

export default TableItems;
