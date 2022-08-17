import { ComponentProps, ReactNode, ReactElement, FormEvent, MouseEventHandler } from 'react';
import { ReactPlayerProps } from 'react-player';
import { ImageProps as IImage } from 'next/future/image';
import { LinkProps } from 'next/link';

interface IVideo {
  src: string;
  placeholder: string;
}

export type ILink = Omit<LinkProps, 'href'> &
  Pick<ComponentProps<'a'>, 'target' | 'rel' | 'title' | 'className' | 'style'> & {
    href: string;
    children: ReactNode;
  };

export interface IHeaderLink {
  label: string;
  title: string;
  href: string;
  menu?: ReactNode;
  onClick?: () => void;
}

export interface IHeaderProps {
  className?: string;
  accentColor: string;
  activeLink?: string;
  themeSwitch?: boolean;
  transformLinks?: (links: IHeaderLink[]) => IHeaderLink[];
  searchBarProps?: Partial<ISearchBarProps>;
  disableSearch?: boolean;
}

export interface ISubheaderProps {
  className?: string;
  product: {
    title: string | ReactNode;
    description: string | ReactNode;
    image: IImage;
    onClick?: MouseEventHandler;
  };
  activeLink: string;
  links: ILink[];
  cta: ILink;
}

export interface IFooterProps {
  className?: string;
  sameSite?: boolean;
  logo?: ILink;
}

export interface IFooterExtendedProps {
  className?: string;
  sameSite?: boolean;
  resources?: ILink[];
  onNewsletterSubmit?: (e: FormEvent, value: string) => void;
  logo?: ILink;
}

export interface IModalProps {
  className?: string;
  children: ReactNode;
  title: string | ReactNode;
  description?: string | ILink;
  image?: IImage;
  visible: boolean;
  placement: 'top' | 'center' | 'bottom';
  onCancel: (state?: boolean) => void;
}

export interface ISearchBarProps {
  version?: 'v1' | 'v2';
  algolia?: {
    appId: string;
    searchApiKey: string;
    indexName: string;
  };
  accentColor: string;
  title: string;
  placeholder: string;
  isFull?: boolean;
  onHandleModal?: (state: boolean) => void;
  className?: string;
}

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
}

export interface IMarketplaceItemsProps {
  items: IMarketplaceItemProps[];
}

export interface IMarketplaceListProps {
  className?: string;
  title?: string;
  placeholder: string | ReactElement;
  pagination: number;
  items: IMarketplaceItemProps[];
}

export interface IMarketplaceSearchProps {
  className?: string;
  title: string | ReactNode;
  placeholder: string;
  primaryList: IMarketplaceListProps;
  secondaryList?: IMarketplaceListProps;
  queryList?: IMarketplaceListProps;
  tagsFilter?: string[] | ReadonlyArray<string>;
}

export interface ISchemaPageProps {
  schemaName: string;
  tags?: string[];
  editorData: Omit<IEditorProps, 'icon'>[];
}

export interface IEditorProps {
  children: ReactNode;
  title?: string;
  frameworks?: string[];
  schema?: string;
  image?: string;
  operations?: string;
}
