import { Story, Meta } from '@storybook/react/types-6-0';
import { IFeatureListProps } from '../types/components';
import { dummyFeatureList } from '../helpers/dummy';
import { FeatureList } from './feature-list';

export default {
  title: 'Components/Lists/Features',
  component: FeatureList,
  argTypes: {
    title: {
      name: 'Title',
    },
    items: {
      name: 'Features',
    },
  },
} as Meta;

const Template: Story<IFeatureListProps> = args => <FeatureList {...args} />;

export const Default = Template.bind({});

Default.args = dummyFeatureList;

export const WithTitleDescription = Template.bind({});

WithTitleDescription.args = {
  ...dummyFeatureList,
  titleDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
