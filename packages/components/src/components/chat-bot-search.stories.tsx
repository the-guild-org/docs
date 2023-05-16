import { Meta, Story } from '@storybook/react';
import { ISearchBarProps } from '../types/components';
import { SearchBar } from './search-bar';
import { ChatBotSearch } from './chat-bot-search';

export default {
  title: 'Components/Chat Bot Search',
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

const Template: Story<ISearchBarProps> = args => <ChatBotSearch {...args} version="v2" />;

export const Default = Template.bind({});
Default.args = {
  accentColor: '#03a6a6',
  title: "Ask The Guild's AI Bot",
  placeholder: 'How do I use plugins?',
  isFull: true,
  onHandleModal: (state: boolean) => alert(`The modal state is: ${state}`),
  sampleQuestion: ['How to use the search?', 'How to use the search?'],
};
