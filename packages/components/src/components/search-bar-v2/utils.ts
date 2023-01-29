import { AutocompleteSource } from '@algolia/autocomplete-js';
import { AlgoliaSearchItem } from '../../types/algolia';

export function debouncePromise<I, O>(
  fn: (args: I[]) => O,
  time: number,
): (args: I[]) => Promise<O> {
  let timerId: number | undefined;

  return function debounced(args: I[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise(resolve => {
      timerId = setTimeout(() => resolve(fn(args)), time) as unknown as number;
    });
  };
}

export const debounced = debouncePromise(
  // @ts-expect-error todo: fix Type 'AlgoliaSearchItem' does not satisfy the constraint 'BaseItem'.
  (items: AutocompleteSource<AlgoliaSearchItem>[]) => items,
  300,
);
