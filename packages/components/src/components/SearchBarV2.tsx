import { ISearchBarProps } from '../types/components';
import {
  autocomplete,
  AutocompleteApi,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
// @ts-expect-error typings
import { render } from 'react-dom';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import algoliaSearch from 'algoliasearch/lite';
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
      return;
    }

    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const searchApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;
    const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

    if (!appId || !searchApiKey || !indexName) {
      console.error('Algolia environments variables missing');
      return;
    }

    insightsClient('init', { appId, apiKey: searchApiKey });

    const searchClient = algoliaSearch(appId, searchApiKey);
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
              <NoResultsContainer>No results for "{query}"</NoResultsContainer>
            </Fragment>,
            root
          );
        }
      },
      render({ children, state, Fragment, components }, root) {
        render(
          <Fragment>
            <Container>
              <ResultsContainer>{children}</ResultsContainer>
              <SidePreview
                accentColor={accentColor}
                item={state.context.preview}
                components={components}
              />
            </Container>
            <SearchBy
              href="https://algolia.com"
              target="_blank"
              rel="noreferrer"
            >
              Search by&nbsp;
              <AlgoliaLogo />
            </SearchBy>
          </Fragment>,
          root
        );
      },
      openOnFocus: true,
      getSources({ query }) {
        if (!query) {
          return [];
        }
        return debounced([
          {
            sourceId: 'algoliaIndex',
            getItems: () =>
              getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query,
                    params: {
                      hitsPerPage: 20,
                    },
                  },
                ],
              }),
            onActive({ item, setContext }) {
              setContext({ preview: item });
            },
            getItemUrl: ({ item }) => item.url,
            templates,
          },
        ]);
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

        const sourcesPerSite = itemsSources.reduce<Record<string, any>>(
          (acc, sourceId) => {
            if (!acc[sourceId]) {
              acc[sourceId] = {
                ...algoliaIndex,
                sourceId,
                getItems: () =>
                  items.filter((item) => item.source === sourceId),
                templates,
              };
            }
            return acc;
          },
          {}
        );

        return Object.values({ ...sourcesPerSite, ...restSources });
      },
    });
    search.current = s;

    return () => {
      s.destroy();
    };
  }, [accentColor, placeholder]);

  // listen for CTRL+K
  useEffect(() => {
    const onKeyTrigger = () => {
      if (search.current) {
        const isOpen = !document.querySelector('.aa-DetachedOverlay');
        search.current.setIsOpen(isOpen);
      }
    };

    const unsubscribe = tinykeys(window, {
      '$mod+K': onKeyTrigger,
    });

    return () => {
      unsubscribe();
    };
  }, [search]);

  return <div ref={containerRef} />;
};
