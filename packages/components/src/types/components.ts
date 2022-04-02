import React from 'react';
import { ReactPlayerProps } from 'react-player';

type IImage = React.ImgHTMLAttributes<unknown>;

interface IVideo {
  src: string;
  placeholder: string;
}

export interface IGlobalStyle {
  includeFonts?: boolean;
  includeBase?: boolean;
}

export interface ILink {
  title: string;
  href: string;
  children?: string | React.ReactNode;
  rel?: string;
  style?: React.CSSProperties;
  target?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler;
}

export interface IButtonProps {
  href: string;
  title: string | React.ReactNode;
  variant?: string;
}

export interface IHeaderProps {
  accentColor: string;
  activeLink: string;
  themeSwitch?: boolean;

  wrapperProps?: React.ComponentProps<'header'>;
  containerProps?: React.ComponentProps<'div'>;
  logoProps?: React.ComponentProps<'a'>;
  navigationProps?: React.ComponentProps<'nav'>;
  linkProps?: React.ComponentProps<'a'>;
  searchBarProps?: React.ComponentProps<'button'>;
  themeButtonProps?: React.ComponentProps<'button'>;
  navOpenButtonProps?: React.ComponentProps<'button'>;
  navCloseButtonProps?: React.ComponentProps<'button'>;
  headerModalProps?: IHeaderModalRestProps;
}

export interface ISubheaderProps {
  product: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    image: IImage;
    onClick?: React.MouseEventHandler;
  };
  activeLink: string;
  links: ILink[];
  cta: ILink;

  wrapperProps?: React.ComponentProps<'header'>;
  containerProps?: React.ComponentProps<'div'>;
  logoProps?: React.ComponentProps<'a'>;
  navigationProps?: React.ComponentProps<'nav'>;
  linkProps?: React.ComponentProps<'a'>;
  ctaProps?: React.ComponentProps<'a'>;
  navOpenButtonProps?: React.ComponentProps<'button'>;
  navCloseButtonProps?: React.ComponentProps<'button'>;
}

interface IHeaderModalRestProps {
  titleProps?: React.ComponentProps<'h4'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: React.ComponentProps<'a'>;
  imageProps?: React.ComponentProps<'img'>;
  categoryTitleProps?: React.ComponentProps<'h3'>;
  modalProps?: IModalRestProps;
}

export interface IHeaderModalProps extends IHeaderModalRestProps {
  title: string | React.ReactNode;
  modalOpen: boolean;
  onCancelModal: (state?: boolean) => void;
}

export interface IFooterProps {
  sameSite?: boolean;

  wrapperProps?: React.ComponentProps<'footer'>;
  containerProps?: React.ComponentProps<'div'>;
  lineProps?: React.ComponentProps<'hr'>;
  linkProps?: React.ComponentProps<'a'>;
  logoProps?: React.ComponentProps<'a'>;
  copyrightProps?: React.ComponentProps<'p'>;
}

export interface IFooterExtendedProps {
  sameSite?: boolean;
  resources?: ILink[];
  onNewsletterSubmit?: (e: React.FormEvent, value: string) => void;

  wrapperProps?: React.ComponentProps<'footer'>;
  containerProps?: React.ComponentProps<'div'>;
  lineProps?: React.ComponentProps<'hr'>;
  linkProps?: React.ComponentProps<'a'>;
  logoProps?: React.ComponentProps<'a'>;
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
  title: string | React.ReactNode;
  description?: string | ILink;
  image?: IImage;
  visible: boolean;
  placement: 'top' | 'center' | 'bottom' | 'bottom-wide';
  onCancel: (state?: boolean) => void;
}

export interface ISearchBarProps {
  accentColor: string;
  title: string;
  placeholder: string;
  isFull?: boolean;
  onHandleModal?: (state: boolean) => void;
}

export interface IFeatureListProps {
  title?: string | React.ReactNode;
  titleDescription?: string | React.ReactNode;
  link?: ILink;
  items: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    image: IImage;
    link?: ILink;
  }[];

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  titleDescriptionProps?: React.ComponentProps<'p'>;
  linkProps?: React.ComponentProps<'a'>;
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
  itemLinkProps?: React.ComponentProps<'a'>;
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
  linkProps?: React.ComponentProps<'a'>;
  videoProps?: ReactPlayerProps;
}

export interface IHeroIllustrationProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  flipped?: boolean;
  link?: ILink;
  image: IImage;

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: React.ComponentProps<'a'>;
  imageProps?: React.ComponentProps<'img'>;
}

export interface IHeroGradientProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  colors?: string[];
  version?: string | React.ReactNode;
  link?: ILink | ILink[];
  image?: IImage | React.ReactElement;

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  gradientProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h1'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: React.ComponentProps<'a'>;
  versionProps?: React.ComponentProps<'span'>;
  imageProps?: React.ComponentProps<'img'>;
}

export interface IHeroMarketplaceProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  link: ILink;

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  descriptionProps?: React.ComponentProps<'p'>;
  linkProps?: React.ComponentProps<'a'>;
  imageProps?: React.ComponentProps<'img'>;
}

export interface ICardsColorfulProps {
  cards: {
    title: string;
    description: string;
    category: string;
    color: string;
    link: ILink;
  }[];

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  cardProps?: React.ComponentProps<'a'>;
  cardCategoryProps?: React.ComponentProps<'h2'>;
  cardTitleProps?: React.ComponentProps<'h3'>;
  cardDescriptionProps?: React.ComponentProps<'p'>;
}

export interface IMarketplaceItemProps {
  title: string;
  description: string | React.ReactNode;
  tags?: string[];
  modal?: {
    header: {
      image?: IImage;
      description?: string | ILink;
    };
    content: string | (() => React.ReactNode) | React.ReactNode;
  };
  update: string;
  image?: IImage;
  link?: ILink;
}

interface IMarketplaceItemRestProps {
  imageProps?: React.ComponentProps<'img'>;
  titleProps?: React.ComponentProps<'h3'>;
  descriptionProps?: React.ComponentProps<'p'>;
  dateProps?: React.ComponentProps<'span'>;
  linkProps?: React.ComponentProps<'a'>;
}

export interface IMarketplaceItemsProps extends IMarketplaceItemRestProps {
  icon: string;
  items: IMarketplaceItemProps[];
}

export interface IMarketplaceListProps {
  title?: string;
  placeholder: string | React.ReactElement;
  pagination: number;
  items: IMarketplaceItemProps[];

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
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
  tagsFilter?: string[];

  wrapperProps?: React.ComponentProps<'section'>;
  containerProps?: React.ComponentProps<'div'>;
  titleProps?: React.ComponentProps<'h2'>;
  searchProps?: React.ComponentProps<'input'>;
  queryListProps?: IMarketplaceItemRestProps;
  primaryListProps?: IMarketplaceItemRestProps;
  secondaryListProps?: IMarketplaceItemRestProps;
}

export interface INewsletterProps {
  onNewsletterSubmit: (e: React.FormEvent, value: string) => void;
}

export interface ISchemaPageProps {
  schemaName: string;
  tags?: string[];
  editorData: Omit<IEditorProps, 'icon'>[];
}

export interface IEditorProps {
  title?: string;
  frameworks?: string[];
  schema?: string;
  icon: string;
  image?: string;
  operations?: string;
}

export interface IBannerProps {
  children?: string | React.ReactNode;
  color?: React.CSSProperties['color'];
  bgColor?: React.CSSProperties['color'];
  animation?: React.CSSProperties['animation'];
}
