import { Meta, Story } from '@storybook/react';
import { dummyChangelogList } from '../helpers/dummy';
import { ProductUpdates, ChangelogType } from './changelog-list';
import React from 'react';

export default {
    title: 'Components/Changelog/List',
    component: ProductUpdates,
    argTypes: {}
} as Meta;

const Template: Story<ChangelogType> = args => <div>
    <ProductUpdates {...args} />
</div>

export const Default = Template.bind({});
Default.args = {
    changelogs: dummyChangelogList
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    changelogs: dummyChangelogList.map((item, index) => {
        return {
            ...item,
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        }
    })
}

export const WithAndWithoutIcons = Template.bind({});
WithAndWithoutIcons.args = {
    changelogs: dummyChangelogList.map((item, index) => {
        return {
            ...item,
            icon: index % 2 === 0 ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                : null
        }
    })
}


