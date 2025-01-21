import { Meta, StoryObj } from '@storybook/react';
import { hiveThemeDecorator } from '../../../../../.storybook/hive-theme-decorator';
import { Hero } from './index';
import { ComponentProps } from 'react'
import { ModulesLogo } from '../../logos'
import { CallToAction } from '../call-to-action'
import { GitHubIcon } from 'nextra/icons'

export default {
  title: 'Hive/Hero',
  component: Hero,
  decorators: [hiveThemeDecorator],
  argTypes: {
    className: {
      name: 'className',
    },
    heading: {
      name: 'Heading text'
    },
    checkmarks: {
      name: 'Checkmarks text'
    },
    logo: {
      name: 'Logo'
    },
    text: {
      name: 'Hero text'
    }
  },
} satisfies Meta<ComponentProps<typeof Hero>>;

export const Default: StoryObj<ComponentProps<typeof Hero>> = {
  args: {
    heading: "Enterprise Grade Tooling for Your GraphQL Server",
    text:"GraphQL Modules is a toolset of libraries and guidelines dedicated to create reusable, maintainable, testable and extendable modules out of your GraphQL server.",
    logo: <ModulesLogo />,
    checkmarks: ['Fully open source', 'No vendor lock'],
    children: <>
      <CallToAction variant="primary-inverted" href="/docs">
        Get started
      </CallToAction>
      <CallToAction variant="secondary-inverted" href="/changelog">
        Changelog
      </CallToAction>
      <CallToAction
        variant="tertiary"
        href="https://github.com/Urigo/graphql-modules"
      >
        <GitHubIcon className="size-6" />
        GitHub
      </CallToAction>
    </>
  }
};
