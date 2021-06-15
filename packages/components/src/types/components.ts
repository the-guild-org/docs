import React from 'react';

type IImage = React.ImgHTMLAttributes<unknown>;

interface IVideo {
  src: string;
  placeholder: string;
}

export interface ILink {
  title: string;
  href: string;
  children?: string | React.ReactNode;
  rel?: string;
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
  sameSite?: boolean;
  themeSwitch?: boolean;
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
}

export interface IHeaderModalProps {
  title: string | React.ReactNode;
  modalOpen: boolean;
  onCancelModal: (state?: boolean) => void;
}

export interface IFooterProps {
  sameSite?: boolean;
}

export interface IFooterExtendedProps {
  sameSite?: boolean;
  resources?: ILink[];
  onNewsletterSubmit?: (e: React.FormEvent, value: string) => void;
}

export interface IModalProps {
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
  items: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    image: IImage;
  }[];
}
export interface IInfoListProps {
  title?: string | React.ReactNode;
  items: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    link?: ILink;
  }[];
}
export interface IHeroVideoProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  flipped?: boolean;
  link?: ILink;
  video: IVideo;
}
export interface IHeroIllustrationProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  flipped?: boolean;
  link?: ILink;
  image: IImage;
}
export interface IHeroGradientProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  colors?: string[];
  version?: string | React.ReactNode;
  link?: ILink;
  image?: IImage;
}

export interface IHeroMarketplaceProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  link: ILink;
}

export interface ICardsColorfulProps {
  cards: {
    title: string;
    description: string;
    category: string;
    color: string;
    link: ILink;
  }[];
}

export interface IMarketplaceItemProps {
  title: string;
  description: string | React.ReactNode;
  modal: {
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

export interface IMarketplaceItemsProps {
  icon: string;
  items: IMarketplaceItemProps[];
  setCurrentItem: (state: IMarketplaceItemProps) => void;
  handleModal: (state: boolean) => void;
}

export interface IMarketplaceListProps {
  title?: string;
  placeholder: string | React.ReactElement;
  pagination: number;
  items: IMarketplaceItemProps[];
}

export interface IMarketplaceSearchProps {
  title: string | React.ReactNode;
  placeholder: string;
  primaryList: IMarketplaceListProps;
  secondaryList?: IMarketplaceListProps;
  queryList?: IMarketplaceListProps;
}

export interface INewsletterProps {
  onNewsletterSubmit: (e: React.FormEvent, value: string) => void;
}
