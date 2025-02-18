import { UnionToIntersection } from './types/utility';

/**
 * Next.js page props type.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 * @see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#good-to-know
 */
export interface NextPageProps<
  TParams extends string = never,
  TSearchParams extends string = never,
> {
  params: Promise<
    UnionToIntersection<
      {
        [K in TParams]: {
          [F in K extends `...${infer U}` ? U : K]: K extends `...${string}` ? string[] : string;
        };
      }[TParams]
    >
  >;
  searchParams: Promise<{ [K in TSearchParams]?: string | string[] }>;
}
