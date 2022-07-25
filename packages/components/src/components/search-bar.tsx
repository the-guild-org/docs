import { ChangeEvent, useEffect, useState, useRef, useCallback, createElement, ReactElement, ReactNode } from 'react';
import algoliaSearch from 'algoliasearch/lite';
import { InstantSearch, connectHits, connectSearchBox, connectStateResults } from 'react-instantsearch-dom';
import { Hit, SearchBoxProvided, StateResultsProvided } from 'react-instantsearch-core';
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';
import { Modal } from './modal';
import { ISearchBarProps } from '../types/components';
import { toggleLockBodyScroll } from '../helpers/modals';
import { algoliaConfig } from '../configs';
import { CloseIcon, HamburgerIcon, HashTagIcon, PageIcon, SearchIcon } from './icons';
import { SearchBarV2 } from './search-bar-v2';

const algoliaClient = algoliaSearch(algoliaConfig.appID, algoliaConfig.apiKey, {
  hosts: algoliaConfig.hosts,
});

interface ResultDoc {
  hierarchy: {
    [level: string]: string | null;
  };
  anchor?: string;
  content?: string;
  url: string;
  type: string;
}

const searchClient: Pick<typeof algoliaClient, 'search'> = {
  search(requests) {
    // In case of empty queries
    if (!requests.length || requests.every(req => req.params?.query?.length === 0)) {
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

function getPropertyByPath(obj: any, path: string) {
  const parts = path.split('.');

  return parts.reduce((current, key) => current && current[key], obj);
}

const Snippet = ({
  hit,
  attribute,
  tagName = 'span',
}: {
  hit: Hit<ResultDoc>;
  attribute: string;
  tagName?: string;
}): ReactElement => {
  let html = getPropertyByPath(hit, `_snippetResult.${attribute}.value`) || getPropertyByPath(hit, attribute);
  if (html) {
    // some query results contains `.css-` selectors, so we strips them out
    html = html.replace(/\s+\.css-.*/, '');
  }

  return createElement(tagName, {
    dangerouslySetInnerHTML: { __html: html },
    className: tagName === 'span' ? 'dark:text-gray-300 text-gray-700' : 'text-xs text-gray-400',
  });
};

const SearchBox = ({
  currentRefinement,
  refine,
  accentColor,
  placeholder,
  isModalOpen,
}: SearchBoxProvided & {
  accentColor: string;
  placeholder: string;
  isModalOpen: boolean;
}): ReactElement => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(currentRefinement);

  const debouncedRefine = useDebouncedCallback((value: string) => {
    refine(value);
  }, 500);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setQuery(value);
      debouncedRefine(value);
    },
    [setQuery, debouncedRefine]
  );

  useEffect(() => {
    if (isModalOpen) {
      searchRef.current?.focus();
    }
  }, [isModalOpen]);

  return (
    <form
      noValidate
      action=""
      role="search"
      className="
        sticky
        -top-6
        z-10
        -m-6
        bg-white
        p-6
        shadow-sm
        dark:bg-[#111]
      "
    >
      <div
        className="
          flex
          w-full
          items-center
          gap-x-1
          rounded-lg
          border-2
          bg-gray-50
          p-2.5
          text-lg
          text-gray-500
          [border-color:var(--accentColor)]
          dark:bg-gray-800
          dark:text-gray-300
        "
        style={{ '--accentColor': accentColor }}
      >
        <SearchIcon />
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
          className="
            mx-2
            grow
            border-0
            bg-transparent
            outline-none
            placeholder:text-gray-500
            dark:placeholder:text-gray-300
          "
        />
        {currentRefinement && (
          <button
            type="button"
            onClick={() => refine('')}
            className="
              rounded-sm
              border-0
              bg-transparent
              p-0
              outline-none
              transition
              hover:opacity-70
              focus:ring
            "
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </form>
  );
};

const StateResults = ({
  searchState,
  searchResults,
  children,
}: StateResultsProvided<ResultDoc> & { children: ReactNode }): ReactElement => {
  const content = searchState && searchResults && !searchResults.nbHits && searchResults.query.length > 0 && (
    <span>
      No results for <strong>"{searchState.query}"</strong>.
    </span>
  );

  return <div className="mt-9">{content || children}</div>;
};

const Hits = ({ hits, accentColor }: { hits: Hit<any>[]; accentColor: string }): ReactElement => {
  const transformItems = (items: Hit<any>[]) => {
    const groupBy = items.reduce((acc, item) => {
      const list = acc[item.hierarchy.lvl0] || [];

      return {
        ...acc,
        [item.hierarchy.lvl0]: list.concat(item),
      };
    }, {});

    return Object.keys(groupBy).map(level => ({
      items: groupBy[level],
      level,
    }));
  };

  const transformIcon = (item: Hit<ResultDoc>) => {
    if (item.anchor) {
      return <HashTagIcon className="text-gray-500 hover:text-white dark:text-white" />;
    }
    if (item.content) {
      return <HamburgerIcon className="text-gray-500 hover:text-white dark:text-white" />;
    }
    return <PageIcon className="text-gray-500 hover:text-white dark:text-white" />;
  };

  const groupedHits = transformItems(hits);

  return (
    <>
      {groupedHits.map(hit => (
        <article key={hit.level} style={{ '--color': accentColor }}>
          <h2 className="mb-4 mt-8 text-base font-semibold [color:var(--color)]">{hit.level}</h2>
          {hit.items.map((subHit: Hit<ResultDoc>) => {
            let content;

            if (subHit.hierarchy[subHit.type] && subHit.type === 'lvl1') {
              content = (
                <>
                  <Snippet hit={subHit} attribute="hierarchy.lvl1" />
                  {subHit.content ? (
                    <Snippet tagName="p" hit={subHit} attribute="content" />
                  ) : (
                    <Snippet tagName="p" hit={subHit} attribute="hierarchy.lvl1" />
                  )}
                </>
              );
            } else if (
              subHit.hierarchy[subHit.type] &&
              ['lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'].includes(subHit.type)
            ) {
              content = (
                <>
                  <Snippet hit={subHit} attribute={`hierarchy.${subHit.type}`} />
                  <Snippet tagName="p" hit={subHit} attribute="hierarchy.lvl1" />
                </>
              );
            } else if (subHit.type === 'content') {
              content = (
                <>
                  <Snippet hit={subHit} attribute="content" />
                  <Snippet tagName="p" hit={subHit} attribute="hierarchy.lvl1" />
                </>
              );
            }

            const isSameWebsite = typeof window === 'object' && subHit.url.startsWith(window.location.origin);

            return (
              <a
                key={subHit.url}
                href={subHit.url}
                target={isSameWebsite ? '_self' : '_blank'}
                className="
                  mb-2
                  flex
                  items-center
                  gap-x-3
                  break-all
                  rounded-md
                  bg-gray-100
                  px-5
                  py-3
                  no-underline
                  outline-none
                  last:mb-0
                  hover:![background:var(--color)]
                  focus:ring
                  dark:bg-gray-800
                "
                rel="noreferrer"
              >
                {transformIcon(subHit)}
                <div>{content}</div>
              </a>
            );
          })}
        </article>
      ))}
    </>
  );
};

export const SearchBar = ({ version = 'v1', ...restProps }: ISearchBarProps): ReactElement =>
  version === 'v1' ? <SearchBarComponent {...restProps} /> : <SearchBarV2 {...restProps} />;

export const SearchBarComponent = ({
  accentColor,
  title,
  placeholder,
  isFull,
  onHandleModal,
  className,
}: ISearchBarProps): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = useCallback(
    (state: boolean) => {
      toggleLockBodyScroll(state);
      setModalOpen(state);
      onHandleModal?.(state);
    },
    [onHandleModal]
  );

  const CustomSearchBox = connectSearchBox(SearchBox);
  const CustomStateResults = connectStateResults(StateResults);
  const CustomHits = connectHits(Hits);

  return (
    <>
      <button
        className={clsx(
          `
        flex
        items-center
        border-transparent
        bg-transparent
        p-0
        text-xs
        font-medium
        text-gray-500
        outline-none
        transition
        focus:ring
        md:ml-3
        md:rounded-md
        md:border-2
        md:bg-gray-100
        md:py-1
        md:pl-1
        md:pr-8
        md:hover:[border-color:var(--accentColor)]
        md:dark:bg-gray-800
        md:dark:text-gray-300
        `,
          isFull && '!md:p-2 !m-0 w-full',
          className
        )}
        style={{ '--accentColor': accentColor }}
        onClick={() => handleModal(true)}
      >
        <SearchIcon className="h-6 w-6 md:mr-1 md:h-[18px] md:w-[18px]" />
        <span className="hidden md:block">{placeholder}</span>
      </button>

      <Modal title={title} visible={modalOpen} placement="top" onCancel={() => handleModal(false)}>
        <InstantSearch indexName={algoliaConfig.searchIndex} searchClient={searchClient} stalledSearchDelay={500}>
          <CustomSearchBox accentColor={accentColor} placeholder={placeholder} isModalOpen={modalOpen} />
          <CustomStateResults>
            <CustomHits accentColor={accentColor} />
          </CustomStateResults>
        </InstantSearch>
      </Modal>
    </>
  );
};
