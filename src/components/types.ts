import { ReactElement } from "react";

export interface HeaderProps {
  accentColor: string;
  sameSite: boolean;
  themeSwitch?: boolean;
  searchComponent?: ReactElement;
}

export interface HeaderModalProps {
  darkTheme: boolean,
  modalOpen: boolean;
  setModalOpen: Function;
}