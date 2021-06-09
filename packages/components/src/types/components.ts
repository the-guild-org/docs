import React from 'react';

interface ILink {
  title: string;
  href: string;
  children?: string | React.ReactElement;
  rel?: string;
  target?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler;
}

interface IImage {
  alt: string;
  src: string;
}

interface IVideo {
  src: string;
  placeholder: string;
}

export interface IButtonProps {
  href: string;
  title: string;
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
    title: string;
    description: string;
    image: IImage;
    onClick?: React.MouseEventHandler;
  };
  activeLink: string;
  links: ILink[];
  cta: ILink;
}

export interface IHeaderModalProps {
  title: string;
  modalOpen: boolean;
  onCancelModal: (state?: boolean) => void;
}

export interface IFooterProps {
  sameSite?: boolean;
}

export interface IModalProps {
  title: string;
  description?: string | ILink;
  image?: IImage;
  visible: boolean;
  placement: 'top' | 'center' | 'bottom';
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
  title?: string;
  items: {
    title: string;
    description: string;
    image: IImage;
  }[];
}
export interface IInfoListProps {
  title?: string;
  items: {
    title: string;
    description: string;
    link?: ILink;
  }[];
}
export interface IHeroVideoProps {
  title: string;
  description: string;
  flipped?: boolean;
  link?: ILink;
  video: IVideo;
}
export interface IHeroIllustrationProps {
  title: string;
  description: string;
  flipped?: boolean;
  link?: ILink;
  image: IImage;
}
export interface IHeroGradientProps {
  title: string;
  description: string;
  colors?: string[];
  version?: string;
  link?: ILink;
  image?: IImage;
}

export interface IHeroMarketplaceProps {
  title: string;
  description: string;
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
  description: string;
  modal: {
    header: {
      image: IImage;
      description: string | ILink;
    };
    content: string;
  };
  update: string;
  image: IImage;
  link?: ILink;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
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
  title: string;
  placeholder: string;
  primaryList: IMarketplaceListProps;
  secondaryList: IMarketplaceListProps;
  queryList: IMarketplaceListProps;
}
