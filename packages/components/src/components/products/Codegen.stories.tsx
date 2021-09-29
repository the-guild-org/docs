import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'Products/Codegen',
    argTypes: {
        page: {
            table: {
                disable: true,
            },
            control: false,
        }
    }
} as Meta;

const Template: Story = ({ page }) => {
    const pages = {
        '/': (
            <>
            </>
        ),
        '/marketplace': (
            <></>
        )
    };

    return (
        <></>
    );
};

export const Home = Template.bind({});
Home.args = {
    page: '/'
};

export const Marketplace = Template.bind({});
Marketplace.args = {
    page: '/marketplace',
};
