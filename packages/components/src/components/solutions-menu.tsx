import { ReactElement } from 'react';

const CATEGORIES: {
  title: string;
  items: { title: string; url: `https://${string}` }[];
}[] = [
  {
    title: 'Guides',
    items: [
      {
        title: 'GraphQL error handling',
        url: 'https://the-guild.dev/blog/graphql-error-handling-with-fp',
      },
      {
        title: 'GraphQL authentication',
        url: 'https://the-guild.dev/blog/graphql-authentication-with-envelop-and-auth0',
      },
      {
        title: 'GraphQL caching',
        url: 'https://the-guild.dev/blog/graphql-response-caching-with-envelop',
      },
      {
        title: 'Client-side GraphQL typings',
        url: 'https://the-guild.dev/blog/typed-document-node',
      },
      {
        title: 'GraphQL over WebSockets',
        url: 'https://the-guild.dev/blog/graphql-over-websockets',
      },
      {
        title: 'GraphQL over SSE',
        url: 'https://the-guild.dev/blog/graphql-over-sse',
      },
      {
        title: 'Migrate a REST API to GraphQL',
        url: 'https://graphql-mesh.com/docs/getting-started/your-first-mesh-gateway',
      },
      {
        title: 'Securing your GraphQL API',
        url: 'https://envelop.dev/docs/guides/securing-your-graphql-api',
      },
      {
        title: 'Monitor your GraphQL API',
        url: 'https://envelop.dev/docs/guides/monitoring-and-tracing',
      },
    ],
  },
  {
    title: 'GraphQL at scale',
    items: [
      {
        title: 'Schema Stitching',
        url: 'https://the-guild.dev/blog/a-new-year-for-schema-stitching',
      },
      {
        title: 'Manage your schemas',
        url: 'https://the-guild.dev/blog/graphql-hive-preview',
      },
      {
        title: 'GraphQL Gateway with GraphQL Mesh',
        url: 'https://graphql-mesh.com/docs/introduction',
      },
    ],
  },
];

export const SolutionsMenu = (): ReactElement => {
  return (
    <div
      className="w-[600px] rounded-lg bg-white p-5 dark:bg-gray-800"
      style={{
        boxShadow: 'hsl(206 22% 7% / 35%) 0 10px 38px -10px, hsl(206 22% 7% / 20%) 0 10px 20px -15px',
      }}
    >
      {CATEGORIES.map(category => (
        <div key={category.title} className="mb-6 last:mb-0">
          <h3 className="mt-1 mb-5 w-full text-base font-normal text-black dark:text-gray-400">{category.title}</h3>
          <div className="flex flex-wrap">
            {category.items.map(item => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  p-2
                  !no-underline
                  opacity-60
                  outline-none
                  hover:bg-gray-100
                  hover:opacity-100
                  dark:hover:bg-gray-700
                  md:w-1/2
                "
              >
                <h4 className="m-0 text-xs text-black dark:text-gray-300">{item.title}</h4>
              </a>
            ))}
          </div>
        </div>
      ))}
      <div className="text-right">
        <a
          href="https://graphql-yoga.com/tutorial/basic/00-introduction"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-black dark:text-white"
        >
          Write your first GraphQL API →
        </a>
      </div>
    </div>
  );
};
