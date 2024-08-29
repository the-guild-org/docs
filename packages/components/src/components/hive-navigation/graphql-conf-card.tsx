import type { StaticImageData } from 'next/image';
import { Anchor } from '../anchor';
import { ArrowIcon } from '../icons';
import { Image } from '../image';
import { NavigationMenuLink } from './navigation-menu';

export function GraphQLConfCard({ image }: { image: StaticImageData }) {
  return (
    <NavigationMenuLink href="https://graphql.org/conf/2024/">
      <Image className="rounded-lg" alt="" {...image} />
      <strong className="mt-6 text-xl font-medium leading-7 text-green-1000">
        GraphQLConf 2024
      </strong>
      <p className="font-mdeium mt-4 text-sm leading-5 text-green-800">
        September 10-12 | San Fransico CA
      </p>
      <p className="mt-2 text-sm font-normal leading-5 text-green-800">
        The official GraphQL conference hosted by GraphQL Foundation.
      </p>
      <Anchor
        href="https://app.graphql-hive.com/"
        className="-my-2 ml-2 flex items-center gap-2 rounded-lg p-2 font-medium text-green-800 transition-colors hover:text-green-1000"
      >
        <span>Meet us at GraphQLConf 2024</span> <ArrowIcon />
      </Anchor>
    </NavigationMenuLink>
  );
}
