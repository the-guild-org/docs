import React, { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { Modal } from './Modal';

import {
  Container,
  Placeholder,
  Title,
  Table,
  TableBody,
  TableHeader,
  TablePagination,
  Wrapper,
} from './MarketplaceList.styles';

import {
  IMarketplaceListProps,
  IMarketplaceItemProps,
} from '../types/components';
import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';
import TableItems from './TableItems';

export const MarketplaceList: React.FC<IMarketplaceListProps> = ({
  title,
  placeholder,
  items,
  pagination,
  ...restProps
}) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItem, setCurrentItem] = useState<IMarketplaceItemProps>();

  const pageSize = pagination || 5;
  const pageCount = items ? Math.ceil(items.length / pageSize) : 1;

  const handleModal = (state: boolean) => {
    toggleLockBodyScroll(state);
    setModalOpen(state);
  };

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
                  setCurrentItem={setCurrentItem}
                  handleModal={handleModal}
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

            {currentItem && (
              <Modal
                {...currentItem.modal.header}
                title={currentItem.title}
                placement="bottom-wide"
                visible={modalOpen}
                onCancel={() => handleModal(false)}
              >
                {typeof currentItem.modal.content === 'string'
                  ? currentItem.modal.content
                  : typeof currentItem.modal.content === 'function'
                  ? currentItem.modal.content()
                  : currentItem.modal.content || null}
              </Modal>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};
