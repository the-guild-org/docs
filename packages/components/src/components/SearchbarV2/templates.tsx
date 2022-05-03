import React from 'react';
import { SourceTemplates } from '@algolia/autocomplete-js';
import { AlgoliaSearchItem } from '../../types/algolia';

export const templates: SourceTemplates<AlgoliaSearchItem> = {
  item({ item: hit, components }) {
    return (
      <a href={hit.url} className="aa-ItemLink">
        <div className="aa-ItemContent">
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.Highlight hit={hit} attribute="title" />
            </div>
            <div className="aa-ItemContentSubtitle">
              {hit.hierarchy.slice(1).join(' > ')}
            </div>
          </div>
        </div>
      </a>
    );
  },
  header({ source }) {
    return (
      <div className="aa-SourceHeader">
        <div className="aa-SourceHeaderTitle">{source.sourceId}</div>
      </div>
    );
  },
};
