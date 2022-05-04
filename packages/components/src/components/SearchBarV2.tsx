/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any */
import { ISearchBarProps } from '../types/components';
import {
  autocomplete,
  AutocompleteApi,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
// @ts-expect-error typings
import { render } from 'react-dom';
import React, {
  createElement,
  Fragment,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import algoliasearch from 'algoliasearch/lite';
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights';
import insightsClient from 'search-insights';
import tinykeys from 'tinykeys';

import { AlgoliaSearchItem } from '../types/algolia';
import { SidePreview } from './SearchbarV2/SidePreview';
import { debounced } from './SearchbarV2/utils';
import { templates } from './SearchbarV2/templates';
import {
  NoResultsContainer,
  Container,
  ResultsContainer,
  SearchBy,
} from './SearchbarV2/styles';
import { AlgoliaLogo } from './SearchbarV2/AlgoliaLogo';

export const SearchBarV2: React.FC<ISearchBarProps> = ({
  accentColor,
  placeholder = 'Search our documentations',
}) => {
  const containerRef = useRef(null);
  const search = useRef<AutocompleteApi<AlgoliaSearchItem>>();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
    const searchApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!;
    const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

    if (!appId || !searchApiKey || !indexName) {
      console.warn('Algolia environments variables missing');
      return;
    }

    insightsClient('init', { appId, apiKey: searchApiKey });

    const searchClient = algoliasearch(appId, searchApiKey);
    const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({
      insightsClient,
    });

    const s = autocomplete<AlgoliaSearchItem>({
      container: containerRef.current,
      detachedMediaQuery: '',
      defaultActiveItemId: 0,
      placeholder,
      plugins: [algoliaInsightsPlugin],
      renderer: { createElement, Fragment, render },
      renderNoResults({ Fragment, state: { query, status } }, root) {
        if (!query || status === 'loading') {
          render(<Fragment />, root);
        } else {
          render(
            <Fragment>
              <NoResultsContainer>
                No results for {`"${query}"`}
              </NoResultsContainer>
            </Fragment>,
            root
          );
        }
      },
      render({ children, state, Fragment, components }, root) {
        const { preview } = state.context;

        render(
          <Fragment>
            <Container>
              <ResultsContainer>{children}</ResultsContainer>
              <SidePreview
                accentColor={accentColor}
                item={preview}
                components={components}
              />
            </Container>
            <SearchBy
              href={`https://www.algolia.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Search by &nbsp;</span>
              <AlgoliaLogo />
            </SearchBy>
          </Fragment>,
          root
        );
      },
      openOnFocus: true,
      getSources: ({ query }) => {
        if (!query) {
          return [];
        } else {
          return debounced([
            {
              sourceId: 'algoliaIndex',
              getItems() {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName,
                      query,
                      params: {
                        hitsPerPage: 50,
                      },
                    },
                  ],
                });
              },
              onActive({ item, setContext }) {
                setContext({ preview: item });
              },
              getItemUrl({ item }) {
                return item.url;
              },
              templates,
            },
          ]);
        }
      },
      reshape({ sourcesBySourceId, sources }) {
        if (sources.length === 0) {
          return sources;
        }

        const { algoliaIndex, ...restSources } = sourcesBySourceId;

        const items = algoliaIndex.getItems();
        const itemsSources = items
          .slice()
          // put current website's section on top
          .sort((a) => (a.domain.startsWith(window.location.origin) ? 1 : -1))
          .map((item) => item.source);

        const sourcesPerSite: Record<string, any> = itemsSources.reduce(
          (acc, source) => {
            if (!acc[source]) {
              acc[source] = {
                ...algoliaIndex,
                sourceId: source,
                getItems: () => items.filter((item) => item.source === source),
                templates,
              };
            }
            return acc;
          },
          {} as Record<string, any>
        );

        return Object.values({ ...sourcesPerSite, ...restSources });
      },
    });
    search.current = s;

    return () => {
      s.destroy();
    };
  }, []);

  const onKeyTrigger = useCallback(() => {
    if (search.current) {
      search.current.setIsOpen(true);
    }
  }, [search]);

  // listen for CTRL+K
  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      '$mod+K': onKeyTrigger,
    });
    return () => {
      unsubscribe();
    };
  }, [onKeyTrigger]);

  return <div ref={containerRef} />;
};
