import { Story, Meta } from '@storybook/react/types-6-0';
import { IBannerProps } from '../types/components';
import { Banner } from './Banner';

export default {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    bgColor: {
      name: 'Background color',
      description: 'Used as the background for the banner.',
      control: {
        type: 'color',
      },
    },
    color: {
      name: 'Text color',
      description: 'Used as color for the text.',
      control: {
        type: 'color',
      },
    },
  },
} as Meta;

const Template: Story<IBannerProps> = args => <Banner {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <b>Important:</b> This documentation covers GraphQL Config v3. For the 2.x doc, check: graphql-config.com/legacy.
    </>
  ),
};
