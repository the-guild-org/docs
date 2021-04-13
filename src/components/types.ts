import React from "react";

export interface IHeaderProps {
  accentColor: string
  sameSite: boolean
  themeSwitch?: boolean
  searchComponent?: React.ReactElement

  // SB Only
  sbTheme?:boolean
}

export interface IHeaderModalProps {
  modalOpen: boolean
  toggleModal: (state: boolean) => void

  // SB Only
  sbTheme?:boolean
}