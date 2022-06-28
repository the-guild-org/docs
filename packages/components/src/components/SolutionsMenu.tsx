import React from 'react';
import { Callout, Category, Container, Item, List } from './SolutionsMenu.styles';

const categories: {
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

export const SolutionsMenu: React.FC = () => {
  return (
    <Container>
      {categories.map((category, index) => (
        <Category key={index}>
          <h3>{category.title}</h3>
          <List>
            {category.items.map(item => (
              <Item key={item.title} href={item.url} target="_blank" rel="noreferrer">
                <span>
                  <h4>{item.title}</h4>
                </span>
              </Item>
            ))}
          </List>
        </Category>
      ))}
      <Callout>
        <a href="https://graphql-yoga.com/tutorial/basic/00-introduction" target="_blank" rel="noreferrer">
          Write your first GraphQL API →
        </a>
      </Callout>
    </Container>
  );
};
