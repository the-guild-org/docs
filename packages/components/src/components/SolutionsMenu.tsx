import React from 'react';
import {
  Callout,
  Category,
  Container,
  Item,
  List,
} from './SolutionsMenu.styles';

const categories: { title: string; items: { title: string; url: string }[] }[] =
  [
    {
      title: 'Guides',
      items: [
        {
          title: 'GraphQL Error handling',
          url: 'https://www.the-guild.dev/blog/graphql-error-handling-with-fp',
        },
        {
          title: 'GraphQL Authentication',
          url: 'https://www.the-guild.dev/blog/graphql-authentication-with-envelop-and-auth0',
        },
        {
          title: 'GraphQL Caching',
          url: 'https://www.the-guild.dev/blog/graphql-response-caching-with-envelop',
        },
        {
          title: 'Client-side GraphQL typings',
          url: 'https://www.the-guild.dev/blog/typed-document-node',
        },
        {
          title: 'GraphQL over WebSockets',
          url: 'https://www.the-guild.dev/blog/graphql-over-websockets',
        },
        {
          title: 'GraphQL over SEE',
          url: 'https://www.the-guild.dev/blog/graphql-over-sse',
        },
        {
          title: 'Migrate a REST API to GraphQL',
          url: 'https://www.graphql-mesh.com/docs/getting-started/your-first-mesh-gateway',
        },
        {
          title: 'Securing your GraphQL API',
          url: 'https://www.envelop.dev/docs/guides/securing-your-graphql-api',
        },
        {
          title: 'Monitor your GraphQL API',
          url: 'https://www.envelop.dev/docs/guides/monitoring-and-tracing',
        },
      ],
    },
    {
      title: 'GraphQL at scale',
      items: [
        {
          title: 'Schema Stitching',
          url: 'https://www.the-guild.dev/blog/a-new-year-for-schema-stitching',
        },
        {
          title: 'Manage your Schemas',
          url: 'https://www.the-guild.dev/blog/graphql-hive-preview',
        },
        {
          title: 'GraphQL Gateway with GraphQL Mesh',
          url: 'https://www.graphql-mesh.com/docs/introduction',
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
            {category.items.map((item) => (
              <Item
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <h4>{item.title}</h4>
                </span>
              </Item>
            ))}
          </List>
        </Category>
      ))}
      <Callout>
        <a
          href="https://www.graphql-yoga.com/tutorial/basic/00-introduction"
          target="_blank"
          rel="noreferrer"
        >
          Write your first GraphQL API →
        </a>
      </Callout>
    </Container>
  );
};
