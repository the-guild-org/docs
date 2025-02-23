import { ComponentProps, ReactElement, ReactNode } from 'react';
import { ImageProps as IImage } from 'next/image';
import { LinkProps } from 'next/link';
import { ReactPlayerProps } from 'react-player';

interface IVideo {
  src: string;
  placeholder: string;
}

export type ILink = LinkProps &
  Pick<ComponentProps<'a'>, 'target' | 'rel' | 'title' | 'className' | 'style'> & {
    children: ReactNode;
    newWindow?: boolean;
  };

export interface IFeatureListProps {
  className?: string;
  title?: string;
  description?: string;
  items: {
    title: string;
    description: string;
    image: IImage;
    link?: ILink;
  }[];
  link?: ILink;
}

export interface IInfoListProps {
  className?: string;
  title?: string | ReactNode;
  items: {
    title: string | ReactNode;
    description: string | ReactNode;
    link?: ILink;
  }[];
}

export interface IHeroVideoProps {
  className?: string;
  title: string | ReactNode;
  description: string | ReactNode;
  flipped?: boolean;
  link?: ILink;
  video: IVideo;
  videoProps?: ReactPlayerProps;
}

export interface IHeroIllustrationProps {
  className?: string;
  title: string | ReactNode;
  description: string | ReactNode;
  flipped?: boolean;
  link?: ILink;
  image: IImage;
}

export interface IHeroGradientProps {
  className?: string;
  title: string | ReactNode;
  description: string | ReactNode;
  colors?: string[];
  version?: string | ReactNode;
  link?: ILink | ILink[];
  image?: IImage;
}

export interface IHeroMarketplaceProps {
  className?: string;
  title: string | ReactNode;
  description: string | ReactNode;
  link: ILink;
  image?: IImage;
}

export interface IMarketplaceItemProps {
  title: string;
  description: string | ReactNode;
  tags?: string[];
  modal?: {
    header: {
      image?: IImage;
      description?: string | ILink;
    };
    content: string | (() => ReactNode) | ReactNode;
  };
  update: string;
  image: IImage;
  link: Omit<ILink, 'children'>;
  weeklyNPMDownloads?: number;
}

export interface IMarketplaceItemsProps {
  items: IMarketplaceItemProps[];
}

export interface IMarketplaceListProps {
  className?: string;
  title?: string;
  colorScheme?: 'green' | 'neutral';
  placeholder: string | ReactElement;
  pagination: number;
  items: IMarketplaceItemProps[];
}

export interface IMarketplaceSearchProps {
  className?: string;
  title: string | ReactNode;
  placeholder: string;
  colorScheme?: 'green' | 'neutral';
  primaryList: IMarketplaceListProps;
  secondaryList?: IMarketplaceListProps;
  queryList?: IMarketplaceListProps;
  tagsFilter?: string[] | ReadonlyArray<string>;
}

export interface ISchemaPageProps {
  schemaName: string;
  tags?: string[];
  editorData: Omit<IEditorProps, 'icon' | 'children'>[];
}

export interface IEditorProps {
  children: ReactNode;
  title: string;
  frameworks?: string[];
  schema?: string;
  image?: string;
  operations?: string;
}
