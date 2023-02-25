export type AlgoliaRecordSource =
  | 'Hive'
  | 'Conductor'
  | 'Yoga'
  | 'Envelop'
  | 'Inspector'
  | 'Code Generator'
  | 'Mesh'
  | 'Tools'
  | 'Modules'
  | 'ESLint'
  | 'Config'
  | 'Scalars'
  | 'Helix'
  | 'Shield'
  | 'SOFA'
  | 'Stitching'
  | 'Angular'
  | 'WhatsApp'
  | 'KitQL';

export interface AlgoliaRecord {
  objectID: string;
  hierarchy: string[];
  headings: string[];
  toc: AlgoliaSearchItemTOC[];
  title: string;
  content: string;
  source: string;
  type: string;
  url: string;
  domain: string;
}

export interface AlgoliaSearchItemTOC {
  children: AlgoliaSearchItemTOC[];
  title: string;
  anchor: string;
}
