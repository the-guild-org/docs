import { format } from "date-fns";
import Link from "next/link";
import { ReactElement } from "react";
import clsx from 'clsx';


export type ChangelogType = {
    title: string;
    date: string;
    description: string;
    route: string;
};

export function ProductUpdateItem(props: ChangelogType) {
    return (
        <li className="mb-10 ml-4">
            <div className="absolute -left-1.5 mt-1.5 size-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700" />
            <time
                className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                dateTime={props.date}
            >
                {format(new Date(props.date), 'do MMMM yyyy')}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <Link href={props.route}>{props.title}</Link>
            </h3>
            <div className="mb-4 mt-1 max-w-[600px] text-base font-normal leading-6 text-gray-500 dark:text-gray-400">
                {props.description}
            </div>
        </li>
    );
}

export const ProductUpdates = (props: { changelogs: ChangelogType[] }): ReactElement => {
    return (
        <>
            <ol className="space-y-10">
                {props.changelogs.map(item => (
                    <ProductUpdateItem key={item.route} {...item} />
                ))}
            </ol>
        </>
    );
}

