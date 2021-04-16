import React, { useState } from 'react';

import { Modal } from './Modal';

import {
  SearchBarButton,
  SearchBarForm,
  SearchBarResults,
  SearchBarHit,
} from './SearchBar.styles';

import { ISearchBarProps } from './types';
import { searchBarThemedIcons } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';
import { ThemeContext } from '../helpers/theme';

import algoliaSearch from 'algoliasearch/lite';

import {
  InstantSearch,
  Highlight,
  connectHits,
  connectSearchBox,
  connectStateResults,
} from 'react-instantsearch-dom';

import {
  Hit,
  SearchBoxProvided,
  StateResultsProvided,
} from 'react-instantsearch-core';

export const SearchBar: React.FC<ISearchBarProps> = ({ accentColor, title, placeholder }) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const icons = searchBarThemedIcons(isDarkTheme || false);

  const searchClient = algoliaSearch(
    'ANRJKXZTRW',
    '811d453fc7f80306044dd5cc4b87e064',
    {
      hosts: [{ url: 'the-guild.dev/api/algolia' }]
    }
  );

  const SearchBox: React.FC<SearchBoxProvided> = ({ currentRefinement, refine }) => (
    <SearchBarForm accentColor={accentColor}>
      <form noValidate action="" role="search">
        <img src={icons.search} height="24" width="24" alt="Search icon" />
        <input
          aria-autocomplete="both"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          enterKeyHint="search"
          spellCheck="false"
          placeholder={placeholder}
          maxLength={64}
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        ></input>
        {currentRefinement && (
          <button type="button" onClick={() => refine('')}>
            <img src={icons.close} height="24" width="24" alt="Clear icon" />
          </button>
        )}
      </form>
    </SearchBarForm>
  );

  const StateResults: React.FC<StateResultsProvided> = ({ searchState, searchResults, children }) => {
    let content = '';
    if (searchResults && !searchResults.nbHits) {
      content = `No results for ${<strong>{searchState.query}</strong>}`
    }

    return <SearchBarResults>{children || content}</SearchBarResults>;
  }

  const Hits: React.FC<{ hits: Hit<{}>[] }> = ({ hits }) => {
    const transformItems = (items: Hit<any>[]) => {
      const groupBy = items.reduce((acc, item) => {
        const list = acc[item.hierarchy.lvl0] || [];

        return {
          ...acc,
          [item.hierarchy.lvl0]: list.concat(item),
        };
      }, {});

      return Object.keys(groupBy).map((level) => ({
        items: groupBy[level],
        level,
      }));
    };

    const transformIcon = (item: Hit) => {
      if (item.anchor) {
        return icons.anchor;
      } else if (item.content) {
        return icons.content;
      } else {
        return icons.page;
      }
    }

    const groupedHits = transformItems(hits);

    return (
      <>{
        groupedHits.map(hit => (
          <SearchBarHit key={hit.level} accentColor={accentColor}>
            <h2>{hit.level}</h2>
            {hit.items.map((subHit: Hit) => (
              <a key={subHit.url} href={subHit.url} target="_blank" rel="noopener noreferrer">
                <img src={transformIcon(subHit)} height="26" width="26" alt="Result icon" />
                <div className="ais-content">
                  <Highlight attribute={`hierarchy.${subHit.type}`} hit={subHit} />
                  <p>{subHit.url}</p>
                </div>
              </a>
            ))}
          </SearchBarHit>
        ))
      }</>
    )
  };

  const CustomSearchBox = connectSearchBox(SearchBox);
  const CustomStateResults = connectStateResults(StateResults);
  const CustomHits = connectHits(Hits);

  const handleModal = (state: boolean) => {
    toggleLockBodyScroll(state);
    setModalOpen(state);
  }

  return (
    <>
      <SearchBarButton accentColor={accentColor} onClick={() => handleModal(true)}>
        <img src={icons.search} height="18" width="18" alt="Search icon" />
        <span>{placeholder}</span>
      </SearchBarButton>
      <Modal title={title} visible={modalOpen} placement="center" onCancel={() => handleModal(false)}>
        <InstantSearch indexName="theguild" searchClient={searchClient}>
          <CustomSearchBox />
          <CustomStateResults>
            <CustomHits />
          </CustomStateResults>
        </InstantSearch>
      </Modal>
    </>
  );
};


