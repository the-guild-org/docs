import { StaticImageData } from 'next/image';
import { ArrowIcon } from '../icons';
import { Image } from '../image';
import { NavigationMenuLink } from './navigation-menu';

export interface GraphQLConfCardProps {
  image: StaticImageData;
  href?: string;
  title?: string;
  details?: string;
  description?: string;
  callToAction?: string;
}
export function GraphQLConfCard({
  image,
  href = 'https://youtube.com/playlist?list=PL43V96KpNj7MKvDbnyOUrRv0k1gCODtjW&si=nOiETn8J21mYA9pm',
  title = 'GraphQLConf 2025',
  details = 'September 08-10 | Amsterdam, NL',
  description = 'The official GraphQL conference hosted by GraphQL Foundation.',
  callToAction = 'Watch The Guild at GraphQLConf 2025',
}: GraphQLConfCardProps) {
  return (
    <NavigationMenuLink href={href} className="group w-[358px]">
      <Image alt="" src={image} width={358} height={200} />
      <strong className="mt-6 block text-xl font-medium leading-7 text-green-1000 dark:text-neutral-100">
        {title}
      </strong>
      <p className="mt-4 text-sm font-medium leading-5 text-green-800 dark:text-neutral-200">
        {details}
      </p>
      <p className="mt-2 text-sm font-normal leading-5 text-green-800 dark:text-neutral-200">
        {description}
      </p>
      <span className="mt-6 flex items-center gap-2 rounded-lg font-medium text-green-800 transition-colors group-hover:text-green-1000 dark:text-neutral-200 dark:group-hover:text-neutral-100">
        {callToAction}
        <ArrowIcon />
      </span>
    </NavigationMenuLink>
  );
}
