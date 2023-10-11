export type AlgoliaRecordSource =
  | 'Angular'
  | 'Code Generator'
  | 'Conductor'
  | 'Config'
  | 'Envelop'
  | 'ESLint'
  | 'feTS'
  | 'Hive'
  | 'Inspector'
  | 'KitQL'
  | 'Mesh'
  | 'Modules'
  | 'Scalars'
  | 'SOFA'
  | 'SSE'
  | 'Stitching'
  | 'Tools'
  | 'WhatsApp'
  | 'WS'
  | 'Yoga';

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
