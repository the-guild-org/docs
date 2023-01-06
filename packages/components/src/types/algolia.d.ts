import { BaseItem } from '@algolia/autocomplete-core';
import { AlgoliaRecord } from '@theguild/algolia';

// "hack" for `@algolia/autocomplete-core` that need an algolia record to extend `BaseItem`..
declare interface AlgoliaSearchItem extends BaseItem, AlgoliaRecord {
  url: string;
  type: string;
  hierarchy: string[];
  toc: { title: string }[];
  source: string;
  domain: string;
}

declare module '@algolia/autocomplete-core' {
  export interface AutocompleteContext {
    preview: AlgoliaSearchItem;
  }
}
