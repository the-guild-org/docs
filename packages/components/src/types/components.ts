import React, { ComponentProps, ReactNode } from 'react';
import { ReactPlayerProps } from 'react-player';
import { ImageProps } from 'next/future/image';
import { LinkProps } from 'next/link';

interface IVideo {
  src: string;
  placeholder: string;
}

export type ILink = LinkProps;

export interface IHeaderLink {
  label: string;
  title: string;
  href: string;
  menu?: ReactNode;
  onClick?: () => void;
}

export interface IHeaderProps {
  accentColor: string;
  activeLink?: string;
  themeSwitch?: boolean;
  transformLinks?: (links: IHeaderLink[]) => IHeaderLink[];
  wrapperProps?: React.ComponentProps<'header'>;
  containerProps?: React.ComponentProps<'div'>;
  logoProps?: ILink;
  navigationProps?: React.ComponentProps<'nav'>;
  linkProps?: ILink;
  searchBarProps?: Partial<ISearchBarProps>;
  disableSearch?: boolean;
  themeButtonProps?: React.ComponentProps<'button'>;
  navOpenButtonProps?: React.ComponentProps<'button'>;
  headerModalProps?: IHeaderModalRestProps;
}

export interface ISubheaderProps {
  product: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    image: ImageProps;
    onClick?: React.MouseEventHandler;
  };
  activeLink: string;
  links: ILink[];
  cta: ILink;

  wrapperProps?: React.ComponentProps<'header'>;
  containerProps?: React.ComponentProps<'div'>;
  logoProps?: ILink;
  navigationProps?: React.ComponentProps<'nav'>;
  linkProps?: ILink;
  ctaProps?: ILink;
  navOpenButtonProps?: React.ComponentProps<'button'>;
}

interface IHeaderModalRestProps {
  titleProps?: React.ComponentProps<'h4'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: ILink;
  imageProps?: ImageProps;
  categoryTitleProps?: React.ComponentProps<'h3'>;
  modalProps?: IModalRestProps;
}

export interface IFooterProps {
  sameSite?: boolean;
  wrapperProps?: React.ComponentProps<'footer'>;
  containerProps?: React.ComponentProps<'div'>;
  linkProps?: ILink;
  logoProps?: ILink;
  copyrightProps?: React.ComponentProps<'p'>;
}

export interface IFooterExtendedProps {
  sameSite?: boolean;
  resources?: ILink[];
  onNewsletterSubmit?: (e: React.FormEvent, value: string) => void;
  wrapperProps?: React.ComponentProps<'footer'>;
  containerProps?: React.ComponentProps<'div'>;
  linkProps?: ILink;
  logoProps?: ILink;
  titleProps?: React.ComponentProps<'p'>;
  descriptionProps?: React.ComponentProps<'p'>;
  copyrightProps?: React.ComponentProps<'p'>;
  newsletterProps?: React.ComponentProps<'form'>;
}

interface IModalRestProps {
  wrapperProps?: React.ComponentProps<'div'>;
  containerProps?: React.ComponentProps<'div'>;
  overlayProps?: React.ComponentProps<'div'>;
  bodyProps?: React.ComponentProps<'div'>;
  headerTitleProps?: React.ComponentProps<'h2'>;
  headerDescriptionProps?: React.ComponentProps<'p'>;
  headerLinkProps?: React.ComponentProps<'a'>;
  headerImageProps?: React.ComponentProps<'img'>;
}

export interface IModalProps extends IModalRestProps {
  children: ReactNode;
  title: string | ReactNode;
  description?: string | ILink;
  image?: ImageProps;
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
  title?: string;
  description?: string;
  items: {
    title: string;
    description: string;
    image: ImageProps;
    linkProps?: ILink;
  }[];

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: ILink;
  itemTitleProps?: React.ComponentProps<'h3'>;
  itemDescriptionProps?: React.ComponentProps<'p'>;
  itemImageProps?: React.ComponentProps<'img'>;
}

export interface IInfoListProps {
  title?: string | React.ReactNode;
  items: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    link?: ILink;
  }[];

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  itemTitleProps?: React.ComponentProps<'h3'>;
  itemDescriptionProps?: React.ComponentProps<'p'>;
  itemLinkProps?: ILink;
}

export interface IHeroVideoProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  flipped?: boolean;
  link?: ILink;
  video: IVideo;

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: ILink;
  videoProps?: ReactPlayerProps;
}

export interface IHeroIllustrationProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  flipped?: boolean;
  link?: ILink;
  image: ImageProps;

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: ILink;
}

export interface IHeroGradientProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  colors?: string[];
  version?: string | React.ReactNode;
  link?: ComponentProps<'a'> | ComponentProps<'a'>[];
  image?: ImageProps;
  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  gradientProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h1'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: ILink;
  versionProps?: React.ComponentProps<'span'>;
}

export interface IHeroMarketplaceProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  link: ILink;

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: ILink;
  imageProps?: ImageProps;
}

export interface IMarketplaceItemProps {
  title: string;
  description: string | React.ReactNode;
  tags?: string[];
  modal?: {
    header: {
      image?: ImageProps;
      description?: string | ILink;
    };
    content: string | (() => React.ReactNode) | React.ReactNode;
  };
  update: string;
  image?: ImageProps;
  link?: ILink;
}

interface IMarketplaceItemRestProps {
  imageProps?: React.ComponentProps<'img'>;
  titleProps?: React.ComponentProps<'h3'>;
  descriptionProps?: React.ComponentProps<'p'>;
  dateProps?: React.ComponentProps<'td'>;
  linkProps?: ILink;
}

export interface IMarketplaceItemsProps extends IMarketplaceItemRestProps {
  items: IMarketplaceItemProps[];
}

export interface IMarketplaceListProps {
  title?: string;
  placeholder: string | React.ReactElement;
  pagination: number;
  items: IMarketplaceItemProps[];
  wrapperProps?: React.ComponentProps<'section'>;
  titleProps?: React.ComponentProps<'h2'>;
  placeholderProps?: React.ComponentProps<'div'>;
  itemProps?: IMarketplaceItemRestProps;
}

export interface IMarketplaceSearchProps {
  title: string | React.ReactNode;
  placeholder: string;
  primaryList: IMarketplaceListProps;
  secondaryList?: IMarketplaceListProps;
  queryList?: IMarketplaceListProps;
  tagsFilter?: string[] | ReadonlyArray<string>;
  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  searchProps?: React.ComponentProps<'input'>;
  queryListProps?: IMarketplaceItemRestProps;
  primaryListProps?: IMarketplaceItemRestProps;
  secondaryListProps?: IMarketplaceItemRestProps;
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
