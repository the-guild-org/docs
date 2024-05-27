import { format } from "date-fns";
import { ReactElement, ReactNode } from "react";


export type ChangelogType = {
    title: string;
    date: string;
    description: string;
    route: string;
    icon?: ReactNode
};

function ProductUpdateItem(props: ChangelogType) {
    return (
        <div className="flex relative pt-[10px] pb-5 sm:items-center md:w-2/3 mx-auto">
            <div className="h-full w-3 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[2px] bg-gray-100 pointer-events-none" />
            </div>
            <div className="flex-shrink-0 w-3 h-3 rounded-full mt-10 sm:mt-0 inline-flex items-end justify-end bg-gray-200 text-white relative z-10" />
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                {props.icon ?
                    <div className="inline-flex items-center justify-center relative z-10">
                        {props.icon}
                    </div> : null
                }
                <div className="flex-grow  sm:pl-6 mt-6 sm:mt-0">
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500" dateTime={props.date}>
                        {format(new Date(props.date), 'do MMMM yyyy')}
                    </time>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white title-font mb-1">
                        <a className="hover:underline cursor-pointer" href={props.route}>{props.title}</a>
                    </h2>
                    <p className="mb-4 mt-1 max-w-[600px] text-base font-normal leading-6 text-gray-500 dark:text-gray-400">{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export const ProductUpdates = (props: { changelogs: ChangelogType[] }): ReactElement => {
    return (
        <div>
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                {props.changelogs.map((changelog, index) => (
                    <ProductUpdateItem key={index} {...changelog} />
                ))}
            </div>
        </div>
    );
}

