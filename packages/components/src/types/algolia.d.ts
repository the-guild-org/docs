import '@algolia/autocomplete-core';
import { BaseItem } from '@algolia/autocomplete-core';
import { AlgoliaRecord } from '@guild-docs/algolia';

// "hack" for `@algolia/autocomplete-core` that need a algolia record to extend `BaseItem`..
declare interface AlgoliaSearchItem extends BaseItem, AlgoliaRecord {}

declare module '@algolia/autocomplete-core' {
  export interface AutocompleteContext {
    preview: AlgoliaSearchItem;
  }
}
