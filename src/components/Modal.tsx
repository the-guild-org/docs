import React from 'react';

import {
  ModalContainer,
  ModalOverlay,
  ModalWrapper,
  ModalHeader,
  ModalContent,
  ModalClose
} from './Modal.styles';

import { IModalProps } from './types';
import { modalThemedIcons } from '../helpers/assets';
import { ThemeContext } from '../helpers/theme';

export const Modal: React.FC<IModalProps> = ({ title, children, visible, placement, onCancel }) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const icons = modalThemedIcons(isDarkTheme || false);

  return (
    <ModalContainer visible={visible}>
      <ModalOverlay visible={visible} onClick={() => onCancel()} tabIndex={-1} />
      <ModalWrapper visible={visible} placement={placement}>
        <ModalHeader>
          <h2>{title}</h2>
          <ModalClose onClick={() => onCancel()}>
            <img src={icons.close} height="24" width="24" alt="Modal close icon" />
          </ModalClose>
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};


