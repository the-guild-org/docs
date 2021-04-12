import { ReactElement } from "react";

export interface IHeaderProps {
  accentColor: string
  sameSite: boolean
  themeSwitch?: boolean
  searchComponent?: ReactElement
  // SB Only
  sbTheme?:boolean
}

export interface IHeaderModalProps {
  modalOpen: boolean
  toggleModal: Function
  // SB Only
  sbTheme?:boolean
}