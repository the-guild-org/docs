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
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>
  // SB Only
  sbTheme?:boolean
}