import { ComponentProps, ReactNode, ReactElement, FormEvent, MouseEventHandler } from 'react';
import { ReactPlayerProps } from 'react-player';
import { ImageProps as IImage } from 'next/future/image';
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
  wrapperProps?: ComponentProps<'header'>;
  containerProps?: ComponentProps<'div'>;
  logoProps?: ILink;
  navigationProps?: ComponentProps<'nav'>;
  linkProps?: ILink;
  searchBarProps?: Partial<ISearchBarProps>;
  disableSearch?: boolean;
  themeButtonProps?: ComponentProps<'button'>;
  navOpenButtonProps?: ComponentProps<'button'>;
  headerModalProps?: IHeaderModalRestProps;
}

export interface ISubheaderProps {
  product: {
    title: string | ReactNode;
    description: string | ReactNode;
    image: IImage;
    onClick?: MouseEventHandler;
  };
  activeLink: string;
  links: ILink[];
  cta: ILink;

  wrapperProps?: ComponentProps<'header'>;
  containerProps?: ComponentProps<'div'>;
  logoProps?: ILink;
  navigationProps?: ComponentProps<'nav'>;
  linkProps?: ILink;
  ctaProps?: ILink;
  navOpenButtonProps?: ComponentProps<'button'>;
}

interface IHeaderModalRestProps {
  titleProps?: ComponentProps<'h4'>;
  descriptionProps?: ComponentProps<'p'>;
  linkProps?: ILink;
  imageProps?: IImage;
  categoryTitleProps?: ComponentProps<'h3'>;
  modalProps?: IModalRestProps;
}

export interface IFooterProps {
  sameSite?: boolean;
  wrapperProps?: ComponentProps<'footer'>;
  containerProps?: ComponentProps<'div'>;
  linkProps?: ILink;
  logoProps?: ILink;
  copyrightProps?: ComponentProps<'p'>;
}

export interface IFooterExtendedProps {
  sameSite?: boolean;
  resources?: ILink[];
  onNewsletterSubmit?: (e: FormEvent, value: string) => void;
  wrapperProps?: ComponentProps<'footer'>;
  containerProps?: ComponentProps<'div'>;
  linkProps?: ILink;
  logoProps?: ILink;
  titleProps?: ComponentProps<'p'>;
  descriptionProps?: ComponentProps<'p'>;
  copyrightProps?: ComponentProps<'p'>;
  newsletterProps?: ComponentProps<'form'>;
}

interface IModalRestProps {
  wrapperProps?: ComponentProps<'div'>;
  containerProps?: ComponentProps<'div'>;
  overlayProps?: ComponentProps<'div'>;
  bodyProps?: ComponentProps<'div'>;
  headerTitleProps?: ComponentProps<'h2'>;
  headerDescriptionProps?: ComponentProps<'p'>;
  headerLinkProps?: ILink;
}

export interface IModalProps extends IModalRestProps {
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
  title?: string;
  description?: string;
  items: {
    title: string;
    description: string;
    image: IImage;
    linkProps?: ILink;
  }[];

  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'h2'>;
  descriptionProps?: ComponentProps<'p'>;
  linkProps?: ILink;
  itemTitleProps?: ComponentProps<'h3'>;
  itemDescriptionProps?: ComponentProps<'p'>;
}

export interface IInfoListProps {
  title?: string | ReactNode;
  items: {
    title: string | ReactNode;
    description: string | ReactNode;
    link?: ILink;
  }[];

  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'h2'>;
  itemTitleProps?: ComponentProps<'h3'>;
  itemDescriptionProps?: ComponentProps<'p'>;
  itemLinkProps?: ILink;
}

export interface IHeroVideoProps {
  title: string | ReactNode;
  description: string | ReactNode;
  flipped?: boolean;
  link?: ILink;
  video: IVideo;

  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'h2'>;
  descriptionProps?: ComponentProps<'p'>;
  linkProps?: ILink;
  videoProps?: ReactPlayerProps;
}

export interface IHeroIllustrationProps {
  title: string | ReactNode;
  description: string | ReactNode;
  flipped?: boolean;
  link?: ILink;
  image: IImage;

  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'h2'>;
  descriptionProps?: ComponentProps<'p'>;
  linkProps?: ILink;
}

export interface IHeroGradientProps {
  title: string | ReactNode;
  description: string | ReactNode;
  colors?: string[];
  version?: string | ReactNode;
  link?: ILink | ILink[];
  image?: IImage;
  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  gradientProps?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'h1'>;
  descriptionProps?: ComponentProps<'p'>;
  linkProps?: ILink;
  versionProps?: ComponentProps<'span'>;
}

export interface IHeroMarketplaceProps {
  title: string | ReactNode;
  description: string | ReactNode;
  link: ILink;

  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'h2'>;
  descriptionProps?: ComponentProps<'p'>;
  linkProps?: ILink;
  imageProps?: IImage;
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
  image?: IImage;
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
  placeholder: string | ReactElement;
  pagination: number;
  items: IMarketplaceItemProps[];
  wrapperProps?: ComponentProps<'section'>;
  titleProps?: ComponentProps<'h2'>;
  placeholderProps?: ComponentProps<'div'>;
  itemProps?: IMarketplaceItemRestProps;
}

export interface IMarketplaceSearchProps {
  title: string | ReactNode;
  placeholder: string;
  primaryList: IMarketplaceListProps;
  secondaryList?: IMarketplaceListProps;
  queryList?: IMarketplaceListProps;
  tagsFilter?: string[] | ReadonlyArray<string>;
  wrapperProps?: ComponentProps<'section'>;
  containerProps?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'h2'>;
  searchProps?: ComponentProps<'input'>;
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
