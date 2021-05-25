export interface IHeaderProps {
  accentColor: string;
  activeLink: string;
  sameSite?: boolean;
  themeSwitch?: boolean;
}

export interface IHeaderModalProps {
  title: string;
  modalOpen: boolean;
  onCancelModal: (state?: boolean) => void;
}

export interface IModalProps {
  title: string;
  visible: boolean;
  placement: 'top' | 'center' | 'bottom';
  onCancel: (state?: boolean) => void;
}

export interface ISearchBarProps {
  accentColor: string;
  title: string;
  placeholder: string;
}
