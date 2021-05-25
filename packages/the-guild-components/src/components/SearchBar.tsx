import React, { useEffect, useState, useRef, useCallback } from 'react';
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

import { useDebouncedCallback } from 'use-debounce';

import { Modal } from './Modal';

import {
  SearchButton,
  SearchForm,
  SearchResults,
  SearchHit,
} from './SearchBar.styles';

import { ISearchBarProps } from '../types/components';
import { searchBarThemedIcons } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';
import { ThemeContext } from '../helpers/theme';
import { algoliaConfig } from '../configs';

const algoliaClient = algoliaSearch(algoliaConfig.appID, algoliaConfig.apiKey, {
  hosts: algoliaConfig.hosts,
});

const searchClient: Pick<typeof algoliaClient, 'search'> = {
  search(requests) {
    // In case of empty queries
    if (
      !requests.length ||
      requests.every((req) => req.params?.query?.length === 0)
    ) {
      // return an empty result
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          exhaustiveNbHits: true,
          hitsPerPage: 20,
          nbHits: 0,
          nbPages: 0,
          page: 0,
          params:
            'query=&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%5D',
          processingTimeMS: 0,
          query: '',
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};

function useIcons() {
  const { isDarkTheme } = React.useContext(ThemeContext);
  return searchBarThemedIcons(isDarkTheme || false);
}

const SearchBox: React.FC<
  SearchBoxProvided & {
    accentColor: string;
    placeholder: string;
    isModalOpen: boolean;
  }
> = ({ currentRefinement, refine, accentColor, placeholder, isModalOpen }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(currentRefinement);
  const icons = useIcons();
  const debouncedRefine = useDebouncedCallback((value: string) => {
    refine(value);
  }, 500);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      setQuery(value);
      debouncedRefine(value);
    },
    [setQuery, debouncedRefine]
  );

  useEffect(() => {
    if (isModalOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <SearchForm accentColor={accentColor}>
      <form noValidate action="" role="search">
        <img src={icons.search} height="30" width="30" alt="Search icon" />
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
          ref={searchRef}
          value={query}
          onChange={onChange}
        ></input>
        {currentRefinement && (
          <button type="button" onClick={() => refine('')}>
            <img src={icons.close} height="34" width="34" alt="Clear icon" />
          </button>
        )}
      </form>
    </SearchForm>
  );
};

const StateResults: React.FC<StateResultsProvided> = ({
  searchState,
  searchResults,
  children,
}) => {
  let content;

  if (searchState && searchResults && !searchResults.nbHits) {
    content = searchResults.query.length ? (
      <span>
        No results for <strong>&quot;{searchState.query}&quot;</strong>.
      </span>
    ) : null;
  }

  return <SearchResults>{content || children}</SearchResults>;
};

const Hits: React.FC<{ hits: Hit<any>[]; accentColor: string }> = ({
  hits,
  accentColor,
}) => {
  const icons = useIcons();

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
  };

  const groupedHits = transformItems(hits);

  return (
    <>
      {groupedHits.map((hit) => (
        <SearchHit key={hit.level} accentColor={accentColor}>
          <h2>{hit.level}</h2>
          {hit.items.map((subHit: Hit) => (
            <a
              key={subHit.url}
              href={subHit.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={transformIcon(subHit)}
                height="26"
                width="26"
                alt="Result icon"
              />
              <div className="ais-content">
                <Highlight
                  attribute={`hierarchy.${subHit.type}`}
                  hit={subHit}
                />
                <p>{subHit.url}</p>
              </div>
            </a>
          ))}
        </SearchHit>
      ))}
    </>
  );
};

export const SearchBar: React.FC<ISearchBarProps> = ({
  accentColor,
  title,
  placeholder,
  isFull,
  onHandleModal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const icons = useIcons();

  const handleModal = (state: boolean) => {
    toggleLockBodyScroll(state);
    setModalOpen(state);
    onHandleModal && onHandleModal(state);
  };

  const CustomSearchBox = connectSearchBox(SearchBox);
  const CustomStateResults = connectStateResults(StateResults);
  const CustomHits = connectHits(Hits);

  return (
    <>
      <SearchButton
        accentColor={accentColor}
        isFull={isFull || false}
        onClick={() => handleModal(true)}
      >
        <img src={icons.search} height="18" width="18" alt="Search icon" />
        <span>{placeholder}</span>
      </SearchButton>
      <Modal
        title={title}
        visible={modalOpen}
        placement="top"
        onCancel={() => handleModal(false)}
      >
        <InstantSearch
          indexName={algoliaConfig.searchIndex}
          searchClient={searchClient}
          stalledSearchDelay={500}
        >
          <CustomSearchBox
            accentColor={accentColor}
            placeholder={placeholder}
            isModalOpen={modalOpen}
          />
          <CustomStateResults>
            <CustomHits accentColor={accentColor} />
          </CustomStateResults>
        </InstantSearch>
      </Modal>
    </>
  );
};
