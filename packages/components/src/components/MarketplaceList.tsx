import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { Modal } from './Modal';

import {
  Container,
  Placeholder,
  Title,
  Table,
  TableBody,
  TableHeader,
  TableItem,
  TableItemInfo,
  TablePagination,
  Wrapper,
} from './MarketplaceList.styles';

import {
  IMarketplaceListProps,
  IMarketplaceItemsProps,
  IMarketplaceItemProps,
} from '../types/components';
import { ThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';

const TableItems: React.FC<IMarketplaceItemsProps> = ({
  icon,
  items,
  handleModal,
  setCurrentItem,
}) => {
  const formateDate = (value: string) => {
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
    return `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
  };

  return (
    <>
      {items &&
        items.map((item) => (
          <TableItem key={item.title}>
            <td>{item.image ? <img {...item.image} /> : null}</td>
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
                >
                  <span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </span>
                </a>
              </TableItemInfo>
            </td>
            <td>{formateDate(item.update)}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  handleModal(true);
                  setCurrentItem(item);
                }}
              >
                <img src={icon} alt=">" />
              </button>
            </td>
          </TableItem>
        ))}
    </>
  );
};

export const MarketplaceList: React.FC<IMarketplaceListProps> = ({
  title,
  placeholder,
  items,
  pagination,
}) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);

  const [modalOpen, setModalOpen] = useState(false);
  const [pages, setPages] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItem, setCurrentItem] = useState<IMarketplaceItemProps>();

  const pageSize = pagination || 5;
  const pageCount = items ? Math.ceil(items.length / pageSize) : 1;

  const handleModal = (state: boolean) => {
    toggleLockBodyScroll(state);
    setModalOpen(state);
  };

  useEffect(() => {
    const itemsCopy = JSON.parse(JSON.stringify(items));
    const pagesData = [];

    while (itemsCopy.length) {
      pagesData.push(itemsCopy.splice(0, pageSize));
    }

    setPages(pagesData);
  }, [items]);

  return (
    <Wrapper>
      <Container>
        {title && <Title>{title}</Title>}
        {!pages[currentPage] || !pages[currentPage].length ? (
          <Placeholder>{placeholder}</Placeholder>
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
                  setCurrentItem={setCurrentItem}
                  handleModal={handleModal}
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

            {currentItem && (
              <Modal
                {...currentItem.modal.header}
                title={currentItem.title}
                placement="bottom"
                visible={modalOpen}
                onCancel={() => handleModal(false)}
              >
                {currentItem.modal.content}
              </Modal>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};
