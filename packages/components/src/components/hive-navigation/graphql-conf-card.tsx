import { StaticImageData } from 'next/image';
import { ArrowIcon } from '../icons';
import { Image } from '../image';
import { NavigationMenuLink } from './navigation-menu';

export interface GraphQLConfCardProps {
  image: StaticImageData;
}
export function GraphQLConfCard({ image }: GraphQLConfCardProps) {
  return (
    <NavigationMenuLink
      href="https://www.youtube.com/playlist?list=PL43V96KpNj7OMvmfL0WFKP6LpoboM8Hde"
      className="group w-[358px]"
    >
      <Image alt="" {...image} width={358} height={200} />
      <strong className="mt-6 block text-xl font-medium leading-7 text-green-1000 dark:text-neutral-100">
        GraphQLConf 2024
      </strong>
      <p className="mt-4 text-sm font-medium leading-5 text-green-800 dark:text-neutral-200">
        September 10-12 | San Francisco CA
      </p>
      <p className="mt-2 text-sm font-normal leading-5 text-green-800 dark:text-neutral-200">
        The official GraphQL conference hosted by GraphQL Foundation.
      </p>
      <span className="mt-4 flex items-center gap-2 rounded-lg font-medium text-green-800 transition-colors group-hover:text-green-1000 dark:text-neutral-200 dark:group-hover:text-neutral-100">
        Watch The Guild at GraphQLConf 2024<ArrowIcon />
      </span>
    </NavigationMenuLink>
  );
}
