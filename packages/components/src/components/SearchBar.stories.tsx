import { Story, Meta } from '@storybook/react/types-6-0';
import { ISearchBarProps } from '../types/components';
import { SearchBar } from './SearchBar';

export default {
  title: 'Components/Search Bar',
  component: SearchBar,
  argTypes: {
    accentColor: {
      name: 'Accent Color',
      description: 'Used in the hover effect on the navigation.',
      control: {
        type: 'color',
      },
    },
    placeholder: {
      name: 'Input Placeholder',
      description: "Property displayed in component's input",
    },
    title: {
      name: 'Modal Title',
      description: "Property displayed in component's modal header",
    },
    isFull: {
      name: 'Full Width',
    },
    onHandleModal: {
      table: {
        disable: true,
      },
      control: false,
    },
  },
} as Meta;

const Template: Story<ISearchBarProps> = args => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  accentColor: '#03a6a6',
  title: 'Search the docs',
  placeholder: 'Search...',
  isFull: true,
  onHandleModal: (state: boolean) => alert(`The modal state is: ${state}`),
};
