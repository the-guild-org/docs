import React, { useState } from 'react';

import { useThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';

import Table from "./Table";
import TableSearch from './TableSearch';

import { IExampleListHeader, IExampleListProps } from '../types/components';

import { Wrapper, Container, Title, Examples } from './ExampleList.styles';

const TableHeader: React.FC<IExampleListHeader> = ({ image, text }) => (
  <tr>
    <td>
      <img src={image} alt='logo' />
      <p>{text}</p>
    </td>
    <td></td>
    <td></td>
  </tr>
)

const ExampleList: React.FC<IExampleListProps> = ({ title, items, tagsFilter, placeholder, ...restProps }) => {
  const { isDarkTheme } = useThemeContext();
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);
  const [query, setQuery] = useState<string>();

  const handleChange = (e: React.FormEvent<EventTarget>) => {
    const query = e.target as HTMLInputElement;
    setQuery(query.value);
  };

  return (
    <Wrapper>
      <Container>
        <Title>{title}</Title>
        <TableSearch
          tagsFilter={tagsFilter}
          handleTagClick={setQuery}
          searchIcon={marketplaceAssets.search}
          query={query}
          placeholder={placeholder}
          handleInputChange={handleChange}
          {...restProps.searchProps}
        />
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
        </Examples>
      </Container>
    </Wrapper>
  );
};

export default ExampleList;
